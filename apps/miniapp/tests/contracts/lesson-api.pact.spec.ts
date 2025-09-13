#!/usr/bin/env node
import path from 'node:path';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import fetch from 'node-fetch';

const { like } = MatchersV3;

async function generatePactContract() {
  console.log('🔄 Generating Pact contract for MiniApp → LessonsAPI');
  
  const provider = new PactV3({ 
    consumer: 'MiniApp', 
    provider: 'LessonsAPI', 
    dir: path.resolve(process.cwd(), 'tests/contracts/pacts'),
    logLevel: 'info'
  });

  try {
    console.log('📋 Setting up contract for GET /api/lessons/:id');
    
    await provider.given('lesson swift-variables-constants exists')
      .uponReceiving('a request for the lesson')
      .withRequest({ 
        method: 'GET', 
        path: '/api/lessons/swift-variables-constants',
        headers: {
          'Accept': 'application/json'
        }
      })
      .willRespondWith({ 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }, 
        body: like({ 
          data: like({
            meta: like({ 
              id: 'swift-variables-constants',
              title: 'Swift Variables and Constants',
              description: like('Learn about variables and constants in Swift')
            }),
            modules: like([
              like({
                type: 'concept',
                id: like('concept-1'),
                content: like('Variables in Swift are...')
              })
            ])
          }),
          success: true,
          message: null
        })
      });

    console.log('📋 Setting up contract for POST /api/events');
    
    await provider.given('events endpoint is available')
      .uponReceiving('a request to track analytics event')
      .withRequest({ 
        method: 'POST', 
        path: '/api/events',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: like({
          event: 'lesson_started',
          props: like({
            lessonId: 'swift-variables-constants',
            userId: like('12345')
          }),
          ts: like(1703875200000)
        })
      })
      .willRespondWith({ 
        status: 202, 
        headers: { 'Content-Type': 'application/json' }, 
        body: like({ 
          status: 'ok'
        }) 
      })
      .executeTest(async (mock) => {
        console.log('🌐 Testing contracts against mock server:', mock.url);
        
        // Test GET /api/lessons/:id
        const lessonResponse = await fetch(mock.url + '/api/lessons/swift-variables-constants', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (lessonResponse.status !== 200) {
          throw new Error(`Expected status 200 for lesson endpoint, got ${lessonResponse.status}`);
        }
        
        const lessonData = await lessonResponse.json();
        console.log('✅ Lesson contract test passed:', {
          status: lessonResponse.status,
          hasData: !!lessonData.data,
          lessonId: lessonData.data?.meta?.id
        });

        // Test POST /api/events
        const eventResponse = await fetch(mock.url + '/api/events', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            event: 'lesson_started',
            props: {
              lessonId: 'swift-variables-constants',
              userId: '12345'
            },
            ts: 1703875200000
          })
        });
        
        if (eventResponse.status !== 202) {
          throw new Error(`Expected status 202 for events endpoint, got ${eventResponse.status}`);
        }
        
        const eventData = await eventResponse.json();
        console.log('✅ Events contract test passed:', {
          status: eventResponse.status,
          responseStatus: eventData.status
        });
      });

    console.log('✅ Pact contract generated successfully');
  } catch (error) {
    console.error('❌ Pact contract generation failed:', error.message);
    process.exit(1);
  }
}

// Run contract generation if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePactContract().catch(console.error);
}