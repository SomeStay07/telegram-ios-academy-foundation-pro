import { useRouterState, useNavigate } from '@tanstack/react-router'
import { Calendar, User, BookOpen } from 'lucide-react'
import { NavigationTabBar } from '../../design-system/components/navigation/index'
import type { NavigationTabItem } from '../../design-system/components/navigation/index'

const tabs: NavigationTabItem[] = [
  {
    id: 'challenge',
    path: '/challenge',
    label: 'Ежедневный вызов',
    icon: Calendar,
  },
  {
    id: 'content',
    path: '/content',
    label: 'Контент',
    icon: BookOpen,
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Профиль',
    icon: User,
  },
]

export function TabBar() {
  const routerState = useRouterState()
  const navigate = useNavigate()
  const currentPath = routerState.location.pathname

  const handleTabClick = (item: NavigationTabItem) => {
    // Навигация через TanStack Router
    navigate({ to: item.path })
  }

  return (
    <NavigationTabBar
      tabs={tabs}
      currentPath={currentPath}
      variant="default"
      size="md"
      maxWidth="md"
      onTabClick={handleTabClick}
    />
  )
}