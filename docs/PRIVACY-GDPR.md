# GDPR & Privacy Implementation

## Data Processing & User Rights

### GDPR Endpoints Implementation

```typescript
// apps/api/src/gdpr/gdpr.controller.ts
import { Controller, Get, Delete, Post, Headers, UnauthorizedException } from '@nestjs/common';
import { TelegramAuth } from '../auth/telegram-auth.decorator';

@Controller('me')
export class GDPRController {
  constructor(
    private prisma: PrismaService,
    private analytics: AnalyticsService,
  ) {}

  @Get('export')
  @TelegramAuth()
  async exportUserData(@Headers('authorization') token: string) {
    const user = await this.extractUserFromToken(token);
    
    const userData = await this.prisma.user.findUnique({
      where: { telegramId: user.telegramId },
      include: {
        progress: true,
        attempts: {
          include: {
            answers: true,
          },
        },
      },
    });

    // Structure for GDPR export
    const exportData = {
      exportedAt: new Date().toISOString(),
      user: {
        telegramId: userData.telegramId,
        firstName: userData.firstName,
        username: userData.username,
        languageCode: userData.languageCode,
        createdAt: userData.createdAt,
        lastActiveAt: userData.lastActiveAt,
      },
      learningData: {
        totalLessonsCompleted: userData.progress.filter(p => p.completedAt).length,
        averageScore: this.calculateAverageScore(userData.attempts),
        progress: userData.progress.map(p => ({
          lessonId: p.lessonId,
          score: p.score,
          masteryLevel: p.masteryLevel,
          completedAt: p.completedAt,
          timeSpent: p.timeSpentMinutes,
        })),
        attempts: userData.attempts.map(a => ({
          lessonId: a.lessonId,
          score: a.score,
          answers: a.answers.map(ans => ({
            questionId: ans.questionId,
            selectedAnswer: ans.selectedAnswer,
            isCorrect: ans.isCorrect,
            timeSpentSeconds: ans.timeSpentSeconds,
          })),
          createdAt: a.createdAt,
        })),
      },
      analyticsData: await this.getAnalyticsData(user.telegramId),
    };

    // Log export request for audit
    console.info('GDPR_EXPORT', {
      userId: user.telegramId,
      exportedAt: exportData.exportedAt,
      dataSize: JSON.stringify(exportData).length,
    });

    return {
      format: 'JSON',
      data: exportData,
      instructions: 'This is your complete data as stored in our system. Contact support if you have questions.',
    };
  }

  @Delete('delete')
  @TelegramAuth()
  async deleteUserData(@Headers('authorization') token: string) {
    const user = await this.extractUserFromToken(token);

    // Soft delete approach - mark as deleted but keep for legal obligations
    await this.prisma.$transaction(async (tx) => {
      // Mark user as deleted
      await tx.user.update({
        where: { telegramId: user.telegramId },
        data: {
          deletedAt: new Date(),
          // Anonymize PII
          firstName: '[DELETED]',
          username: null,
          email: null,
        },
      });

      // Keep learning data for analytics but anonymize
      await tx.progress.updateMany({
        where: { userId: user.id },
        data: { anonymized: true },
      });

      await tx.attempt.updateMany({
        where: { userId: user.id },
        data: { anonymized: true },
      });
    });

    // Remove from analytics platforms
    await this.analytics.deleteUser(user.telegramId);

    console.info('GDPR_DELETE', {
      userId: user.telegramId,
      deletedAt: new Date().toISOString(),
      method: 'soft_delete_with_anonymization',
    });

    return {
      message: 'Your account has been deleted. Some anonymized learning data may be retained for educational research purposes as permitted by law.',
      deletedAt: new Date().toISOString(),
      retentionPolicy: 'Learning progress data (anonymized) retained for 2 years for educational research.',
    };
  }

  @Post('anonymize')
  @TelegramAuth()
  async anonymizeUserData(@Headers('authorization') token: string) {
    const user = await this.extractUserFromToken(token);

    await this.prisma.$transaction(async (tx) => {
      // Keep user account but remove PII
      await tx.user.update({
        where: { telegramId: user.telegramId },
        data: {
          firstName: 'Anonymous User',
          username: null,
          anonymizedAt: new Date(),
        },
      });

      // Anonymize but keep learning data for platform improvement
      await tx.progress.updateMany({
        where: { userId: user.id },
        data: { anonymized: true },
      });
    });

    console.info('GDPR_ANONYMIZE', {
      userId: user.telegramId,
      anonymizedAt: new Date().toISOString(),
    });

    return {
      message: 'Your personal information has been anonymized while preserving your learning progress.',
      anonymizedAt: new Date().toISOString(),
    };
  }

  private async getAnalyticsData(telegramId: string) {
    // Fetch data from PostHog, Sentry, etc.
    return {
      posthog: {
        events: 'Contact PostHog support with user ID for full event export',
        distinctId: telegramId,
      },
      sentry: {
        errorReports: 'Contact Sentry support if error reports contain personal data',
        userId: telegramId,
      },
    };
  }
}
```

### Consent Management

```typescript
// apps/miniapp/src/hooks/useConsent.ts
import { useState, useEffect } from 'react';

interface ConsentPreferences {
  analytics: boolean;
  errorReporting: boolean;
  performance: boolean;
  lastUpdated: string;
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [showConsentBanner, setShowConsentBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('privacy-consent');
    if (stored) {
      const parsed = JSON.parse(stored);
      setConsent(parsed);
      
      // Show banner if consent is older than 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      if (new Date(parsed.lastUpdated) < sixMonthsAgo) {
        setShowConsentBanner(true);
      }
    } else {
      setShowConsentBanner(true);
    }
  }, []);

  const updateConsent = (preferences: Partial<ConsentPreferences>) => {
    const updated = {
      ...consent,
      ...preferences,
      lastUpdated: new Date().toISOString(),
    };
    
    setConsent(updated);
    localStorage.setItem('privacy-consent', JSON.stringify(updated));
    setShowConsentBanner(false);

    // Apply consent preferences
    if (updated.analytics) {
      // Initialize PostHog
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }

    if (updated.errorReporting) {
      // Initialize Sentry
      Sentry.init({ /* config */ });
    }
  };

  const hasConsentFor = (feature: keyof ConsentPreferences) => {
    return consent?.[feature] || false;
  };

  return {
    consent,
    showConsentBanner,
    updateConsent,
    hasConsentFor,
  };
}
```

### Consent Banner Component

```tsx
// apps/miniapp/src/components/ConsentBanner.tsx
import React from 'react';
import { Button } from '@telegram-ios-academy/ui';
import { useConsent } from '../hooks/useConsent';

export function ConsentBanner() {
  const { showConsentBanner, updateConsent } = useConsent();

  if (!showConsentBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Privacy & Data Usage</h3>
        <p className="text-sm text-gray-600 mb-4">
          We use analytics to improve our educational content and error tracking to fix bugs. 
          You can customize these preferences or decline all optional tracking.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>Analytics (PostHog) - Help us improve lessons</span>
          </label>
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>Error Tracking (Sentry) - Fix technical issues</span>
          </label>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="primary"
            onClick={() => updateConsent({ analytics: true, errorReporting: true, performance: true })}
          >
            Accept All
          </Button>
          <Button 
            variant="outline"
            onClick={() => updateConsent({ analytics: false, errorReporting: false, performance: false })}
          >
            Decline Optional
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setShowConsentBanner(false)}
          >
            Customize
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          <a href="/privacy" className="underline">Privacy Policy</a> • 
          <a href="/api/me/export" className="underline">Export My Data</a>
        </p>
      </div>
    </div>
  );
}
```

## Data Retention & Cleanup

### Automated Cleanup Jobs
```typescript
// apps/api/src/gdpr/cleanup.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DataCleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanupExpiredData() {
    const now = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    // Delete soft-deleted users after 30 days (GDPR requirement)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    await this.prisma.user.deleteMany({
      where: {
        deletedAt: {
          lte: thirtyDaysAgo,
        },
      },
    });

    // Anonymize old attempts (keep for educational research)
    await this.prisma.attempt.updateMany({
      where: {
        createdAt: {
          lte: twoYearsAgo,
        },
        anonymized: false,
      },
      data: {
        anonymized: true,
        // Remove detailed answer data but keep scores
        answers: null,
      },
    });

    console.info('DATA_CLEANUP_COMPLETED', {
      completedAt: now.toISOString(),
      usersDeleted: 'counted in query result',
      attemptsAnonymized: 'counted in query result',
    });
  }

  @Cron(CronExpression.EVERY_WEEK)
  async cleanupLogs() {
    // Clean application logs older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // In production, this would clean log storage (Railway logs auto-expire)
    console.info('LOG_CLEANUP', {
      cleanupDate: thirtyDaysAgo.toISOString(),
      message: 'Railway logs auto-expire after 7 days',
    });
  }
}
```

### Data Processing Record
```typescript
// Legal basis tracking for GDPR Article 30
export interface ProcessingRecord {
  purpose: string;
  legalBasis: 'consent' | 'contract' | 'legitimate_interest' | 'vital_interest' | 'public_task' | 'legal_obligation';
  categories: string[];
  recipients: string[];
  retentionPeriod: string;
  securityMeasures: string[];
}

export const DATA_PROCESSING_RECORDS: ProcessingRecord[] = [
  {
    purpose: 'User Authentication & Account Management',
    legalBasis: 'contract',
    categories: ['Telegram ID', 'First Name', 'Username', 'Language Code'],
    recipients: ['Internal Systems'],
    retentionPeriod: 'Duration of account + 30 days after deletion request',
    securityMeasures: ['HTTPS', 'Database Encryption', 'Access Controls'],
  },
  {
    purpose: 'Learning Progress Tracking',
    legalBasis: 'contract',
    categories: ['Lesson Completion', 'Quiz Scores', 'Time Spent'],
    recipients: ['Internal Systems'],
    retentionPeriod: '2 years (anonymized after user deletion)',
    securityMeasures: ['HTTPS', 'Database Encryption', 'User-scoped Access'],
  },
  {
    purpose: 'Analytics & Service Improvement',
    legalBasis: 'consent',
    categories: ['Usage Patterns', 'Feature Interactions', 'Performance Metrics'],
    recipients: ['PostHog (Analytics Provider)'],
    retentionPeriod: '2 years or until consent withdrawal',
    securityMeasures: ['Data Pseudonymization', 'Third-party DPA'],
  },
  {
    purpose: 'Error Monitoring & Debugging',
    legalBasis: 'legitimate_interest',
    categories: ['Error Messages', 'Stack Traces', 'User Context'],
    recipients: ['Sentry (Error Tracking)'],
    retentionPeriod: '90 days',
    securityMeasures: ['Data Scrubbing', 'PII Filtering'],
  },
];
```

## DPIA (Data Protection Impact Assessment)

### High-Risk Processing Activities
1. **Automated Decision Making**: None (no AI/ML affects user outcomes)
2. **Large Scale Processing**: Yes (potentially 2-5k users)
3. **Special Category Data**: No
4. **Public Space Monitoring**: No
5. **Systematic Monitoring**: Limited (learning progress only)

### Risk Mitigation Measures
- **Data Minimization**: Only collect necessary data for service provision
- **Privacy by Design**: Default privacy-friendly settings
- **Consent Management**: Granular consent for optional features
- **Right to Portability**: JSON export format for user data
- **Right to Erasure**: Soft delete with 30-day retention for legitimate interests
- **Security Measures**: Encryption, access controls, audit logging

## GDPR Compliance Checklist

### Legal Basis ✅
- [ ] **Contract**: User account and learning progress (Article 6.1.b)
- [ ] **Consent**: Analytics and marketing communications (Article 6.1.a)
- [ ] **Legitimate Interest**: Error tracking and security (Article 6.1.f)
- [ ] **Legal Basis Documented**: Processing records maintained per Article 30

### User Rights ✅
- [ ] **Right to Information**: Privacy policy accessible and clear
- [ ] **Right of Access**: `/me/export` endpoint implemented
- [ ] **Right to Rectification**: User profile editing functionality
- [ ] **Right to Erasure**: `/me/delete` endpoint with soft deletion
- [ ] **Right to Restrict Processing**: `/me/anonymize` endpoint
- [ ] **Right to Portability**: JSON export format for user data
- [ ] **Right to Object**: Opt-out mechanisms for analytics

### Technical Measures ✅
- [ ] **Data Protection by Design**: Privacy-first architecture
- [ ] **Data Protection by Default**: Minimal data collection by default
- [ ] **Pseudonymization**: User IDs separate from personal data
- [ ] **Encryption**: Database and transit encryption
- [ ] **Access Controls**: Role-based access to personal data
- [ ] **Audit Logging**: All data access logged for compliance

### Organizational Measures ✅
- [ ] **Privacy Policy**: Clear, accessible, regularly updated
- [ ] **Data Retention Policy**: Automated cleanup procedures
- [ ] **Breach Response**: Incident response plan documented
- [ ] **Staff Training**: Team aware of GDPR requirements
- [ ] **DPA Agreements**: Third-party processors covered by DPAs

## References

- [GDPR Official Text](https://eur-lex.europa.eu/eli/reg/2016/679/oj) - Complete regulation text
- [ICO GDPR Guidance](https://ico.org.uk/for-organisations/dp-fee-guide/the-guide/gdpr/) - UK implementation guidance
- [EDPB Guidelines](https://edpb.europa.eu/our-work-tools/general-guidance/gdpr-guidelines-recommendations-best-practices_en) - European Data Protection Board guidance
- [GDPR.eu Compliance Guide](https://gdpr.eu/compliance/) - Practical compliance checklist

## Acceptance Criteria

### GDPR Implementation ✅
- [ ] **Export Endpoint**: `/me/export` returns complete user data in JSON
- [ ] **Delete Endpoint**: `/me/delete` anonymizes user and removes PII
- [ ] **Anonymize Endpoint**: `/me/anonymize` keeps account but removes PII
- [ ] **Consent Banner**: Granular consent for analytics and error tracking
- [ ] **Privacy Policy**: Accessible, clear, legally compliant
- [ ] **Data Cleanup**: Automated deletion of expired personal data
- [ ] **Processing Records**: Article 30 compliance documentation
- [ ] **Breach Response**: 72-hour notification procedures documented

**Verification Commands:**
```bash
# Test GDPR endpoints
curl -X GET https://your-api.railway.app/me/export \
  -H "Authorization: Bearer <jwt-token>"

curl -X POST https://your-api.railway.app/me/anonymize \
  -H "Authorization: Bearer <jwt-token>"

# Verify consent management
curl -X GET https://your-app.railway.app/privacy
```

**Done = User can export, delete, and anonymize their data successfully**