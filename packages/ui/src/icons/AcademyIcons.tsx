import React from 'react'
import { type IconType } from 'react-icons'

// Import icons from React Icons (Phosphor Icons)
import {
  PiGraduationCapFill,
  PiBookOpenTextFill,
  PiStudentFill,
  PiCertificateFill,
  PiPresentationChartFill,
  PiCodeFill,
  PiTerminalWindowFill,
  PiGitBranchFill,
  PiDevicesFill,
  PiCursorClickFill,
  PiTrophyFill,
  PiMedalFill,
  PiTargetFill,
  PiStarFill,
  PiCrownFill,
  PiDeviceMobileFill,
  PiAppleLogoFill,
  PiDesktopTowerFill,
  PiWatchFill,
  PiGearFill,
  PiChatCircleFill,
  PiUsersFill,
  PiMegaphoneFill,
  PiHeartFill,
  PiHandsClappingFill,
  PiChartBarFill,
  PiTrendUpFill,
  PiCalendarCheckFill,
  PiClockFill,
  PiLightningFill,
  PiLightbulbFilamentFill,
  PiRocketLaunchFill,
  PiFireFill,
  PiHouseFill,
  PiMagnifyingGlassFill,
  PiPersonFill,
  PiBellFill,
  PiBugFill,
  // Additional useful icons
  PiBookFill,
  PiTerminalFill,
  PiCodeBlockFill,
  PiGearSixFill,
  PiHouse,
  PiMagnifyingGlass,
  PiPerson,
  PiBell,
  PiBug,
  PiBook,
  PiTerminal,
  PiCodeBlock,
  PiGearSix,
  PiHeart,
  PiBellSlash,
  PiBugBeetle,
  PiGraduationCap,
  PiBookOpenText,
  PiStudent,
  PiCertificate,
  PiPresentationChart,
  PiCode,
  PiTerminalWindow,
  PiGitBranch,
  PiDevices,
  PiCursorClick,
  PiTrophy,
  PiMedal,
  PiTarget,
  PiStar,
  PiCrown,
  PiDeviceMobile,
  PiAppleLogo,
  PiDesktopTower,
  PiWatch,
  PiGear,
  PiChatCircle,
  PiUsers,
  PiMegaphone,
  PiHandsClapping,
  PiChartBar,
  PiTrendUp,
  PiCalendarCheck,
  PiClock,
  PiLightning,
  PiLightbulbFilament,
  PiRocketLaunch,
  PiFire,
} from 'react-icons/pi'

// Academy Icon Props
export interface AcademyIconProps {
  className?: string
  size?: number
}

// Education & Learning Icons
export const EducationIcons = {
  GraduationCap: PiGraduationCap,
  GraduationCapFill: PiGraduationCapFill,
  Book: PiBookOpenText,
  BookFill: PiBookOpenTextFill,
  Student: PiStudent,
  StudentFill: PiStudentFill,
  Certificate: PiCertificate,
  CertificateFill: PiCertificateFill,
  Presentation: PiPresentationChart,
  PresentationFill: PiPresentationChartFill,
  // Basic icons
  House: PiHouse,
  HouseFill: PiHouseFill,
  MagnifyingGlass: PiMagnifyingGlass,
  MagnifyingGlassFill: PiMagnifyingGlassFill,
  Person: PiPerson,
  PersonFill: PiPersonFill,
  Bell: PiBell,
  BellFill: PiBellFill,
  BellSlash: PiBellSlash,
  Heart: PiHeart,
  HeartFill: PiHeartFill,
  Gear: PiGear,
  GearFill: PiGearFill,
  GearSix: PiGearSix,
  GearSixFill: PiGearSixFill,
  // Analytics
  ChartBar: PiChartBar,
  ChartBarFill: PiChartBarFill,
}

// Developer Tools Icons
export const DeveloperIcons = {
  Code: PiCode,
  CodeFill: PiCodeFill,
  CodeBlock: PiCodeBlock,
  CodeBlockFill: PiCodeBlockFill,
  Terminal: PiTerminal,
  TerminalFill: PiTerminalFill,
  TerminalWindow: PiTerminalWindow,
  TerminalWindowFill: PiTerminalWindowFill,
  Git: PiGitBranch,
  GitFill: PiGitBranchFill,
  Devices: PiDevices,
  DevicesFill: PiDevicesFill,
  Cursor: PiCursorClick,
  CursorFill: PiCursorClickFill,
  Bug: PiBug,
  BugFill: PiBugFill,
  BugBeetle: PiBugBeetle,
}

// Achievement & Progress Icons
export const AchievementIcons = {
  Trophy: PiTrophy,
  TrophyFill: PiTrophyFill,
  Medal: PiMedal,
  MedalFill: PiMedalFill,
  Target: PiTarget,
  TargetFill: PiTargetFill,
  Star: PiStar,
  StarFill: PiStarFill,
  Crown: PiCrown,
  CrownFill: PiCrownFill,
}

// Platform Icons (iOS Ecosystem)
export const PlatformIcons = {
  iPhone: PiDeviceMobile,
  iPhoneFill: PiDeviceMobileFill,
  Apple: PiAppleLogo,
  AppleFill: PiAppleLogoFill,
  Mac: PiDesktopTower,
  MacFill: PiDesktopTowerFill,
  Watch: PiWatch,
  WatchFill: PiWatchFill,
  // Custom platform icons as functions
  Swift: ({ className, size = 24 }: AcademyIconProps) => (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M7.508 0c-.287 0-.573.102-.792.322l-5.39 5.39C.905 6.133.8 6.702.8 7.096v9.807c0 .394.105.963.526 1.384l5.39 5.39c.22.22.505.322.792.322h9.014c.287 0 .573-.102.792-.322l5.39-5.39c.421-.421.526-.99.526-1.384V7.096c0-.394-.105-.963-.526-1.384l-5.39-5.39C17.095.102 16.81 0 16.522 0H7.508zm.53 1.5h7.924c.18 0 .36.07.495.205l5.39 5.39c.265.265.41.62.41.993v7.824c0 .373-.145.728-.41.993l-5.39 5.39c-.135.135-.315.205-.495.205H8.038c-.18 0-.36-.07-.495-.205l-5.39-5.39c-.265-.265-.41-.62-.41-.993V8.088c0-.373.145-.728.41-.993l5.39-5.39c.135-.135.315-.205.495-.205z"/>
      <path d="M16.5 8.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-9 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"/>
    </svg>
  ),
  Xcode: ({ className, size = 24 }: AcademyIconProps) => (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.5c4.694 0 8.5 3.806 8.5 8.5s-3.806 8.5-8.5 8.5-8.5-3.806-8.5-8.5 3.806-8.5 8.5-8.5z"/>
      <path d="M8.5 7.5l7 4.5-7 4.5z"/>
    </svg>
  ),
  UIKit: ({ className, size = 24 }: AcademyIconProps) => (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M3 3v18h18V3H3zm1.5 1.5h15v15h-15v-15z"/>
      <rect x="6" y="6" width="3" height="3"/>
      <rect x="15" y="6" width="3" height="3"/>
      <rect x="6" y="15" width="3" height="3"/>
      <rect x="15" y="15" width="3" height="3"/>
      <rect x="10.5" y="10.5" width="3" height="3"/>
    </svg>
  ),
}

// Social & Communication Icons
export const SocialIcons = {
  Chat: PiChatCircle,
  ChatFill: PiChatCircleFill,
  Users: PiUsers,
  UsersFill: PiUsersFill,
  Megaphone: PiMegaphone,
  MegaphoneFill: PiMegaphoneFill,
  HandsClapping: PiHandsClapping,
  HandsClappingFill: PiHandsClappingFill,
}

// Analytics & Time Icons
export const AnalyticsIcons = {
  ChartBar: PiChartBar,
  ChartBarFill: PiChartBarFill,
  TrendUp: PiTrendUp,
  TrendUpFill: PiTrendUpFill,
  Calendar: PiCalendarCheck,
  CalendarFill: PiCalendarCheckFill,
  Clock: PiClock,
  ClockFill: PiClockFill,
  Lightning: PiLightning,
  LightningFill: PiLightningFill,
  LightBulb: PiLightbulbFilament,
  LightBulbFill: PiLightbulbFilamentFill,
  Rocket: PiRocketLaunch,
  RocketFill: PiRocketLaunchFill,
  Fire: PiFire,
  FireFill: PiFireFill,
}

// All icon collections are already exported above

// For backward compatibility and existing components, export commonly used icons directly
export const {
  House,
  HouseFill,
  MagnifyingGlass,
  Person,
  PersonFill,
  Bell,
  BellFill,
  Heart,
  HeartFill,
  Gear,
  GearFill,
  Book,
  BookFill,
  ChartBar,
  ChartBarFill,
} = EducationIcons

export const {
  Code,
  CodeFill,
  Terminal,
  TerminalFill,
  Bug,
  BugFill,
} = DeveloperIcons

export const {
  Trophy,
  TrophyFill,
  Star,
  StarFill,
  Crown,
  CrownFill,
} = AchievementIcons

export const {
  Lightning,
  LightningFill,
} = AnalyticsIcons

// Legacy icon names for backward compatibility
export const TrophyIcon = Trophy
export const StarIcon = Star  
export const CrownIcon = Crown
export const LightningIcon = Lightning

// Alias for StatsIcons (used by existing components)
export const StatsIcons = AnalyticsIcons