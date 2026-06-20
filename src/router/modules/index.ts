import { RouteRecordRaw } from 'vue-router'
import newsRoutes from './news.routes'
import eventsRoutes from './events.routes'
import mediaRoutes from './media.routes'
import membersRoutes from './members.routes'
import coursesRoutes from './courses.routes'

const routeModules: RouteRecordRaw[] = [
    ...newsRoutes,
    ...eventsRoutes,
    ...mediaRoutes,
    ...membersRoutes,
    ...coursesRoutes,
]

export default routeModules
