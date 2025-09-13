import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { LessonPage } from '../pages/LessonPage'
import { CourseLoader } from '../pages/CourseLoader'
import { InterviewPage } from '../pages/InterviewPage'
import { HomePage } from '../pages/HomePage'
import { RouteErrorBoundary } from '../components/RouteErrorBoundary'
<<<<<<< HEAD
=======
import { LazyUIShowcase } from '../components/LazyUIShowcase'
>>>>>>> feature/design-system-foundation

// 1) ЕДИНСТВЕННЫЙ root
export const rootRoute = createRootRoute({
  component: () => (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <Outlet />
    </div>
  ),
  errorComponent: RouteErrorBoundary,
})

// 2) Index — допускается '/'
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

// 3) Все остальные БЕЗ ведущего '/'
export const courseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'course/$courseId',
  component: CourseLoader,
})

export const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'lesson',
  component: LessonPage,
})

export const lessonByIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'lesson/$lessonId',
  component: LessonPage,
})

export const interviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'interview/$interviewId/$mode',
  component: InterviewPage,
})

<<<<<<< HEAD
=======
export const uiShowcaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'ui-showcase',
  component: LazyUIShowcase,
})

>>>>>>> feature/design-system-foundation
// 4) Собери дерево ОДИН раз
export const routeTree = rootRoute.addChildren([
  indexRoute,
  courseRoute,
  lessonRoute,
  lessonByIdRoute,
  interviewRoute,
<<<<<<< HEAD
=======
  uiShowcaseRoute,
>>>>>>> feature/design-system-foundation
])