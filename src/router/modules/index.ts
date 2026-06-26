import { RouteRecordRaw } from 'vue-router'
import newsRoutes from './news.routes'
import eventsRoutes from './events.routes'
import mediaRoutes from './media.routes'
import membersRoutes from './members.routes'
import expertsRoutes from './experts.routes'
import documentsRoutes from './documents.routes'

const routeModules: RouteRecordRaw[] = [
    ...newsRoutes,
    ...eventsRoutes,
    ...mediaRoutes,
    ...membersRoutes,
    ...expertsRoutes,
    ...documentsRoutes,
]

export default routeModules
