import { ReactNode } from 'react'
import { TabBar } from '../widgets/tab-bar/TabBar'
import { 
  useTelegramTheme, 
  useTelegramViewport, 
  useTelegramMainButton, 
  useTelegramBackButton 
} from '../lib/telegram/hooks'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  // Initialize Telegram integrations
  useTelegramTheme()
  useTelegramViewport()
  useTelegramMainButton()
  useTelegramBackButton()

  return (
    <>
      <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] bg-background text-foreground">
        {children}
      </main>
      <TabBar />
    </>
  )
}