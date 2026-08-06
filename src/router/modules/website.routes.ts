import { RouteRecordRaw } from 'vue-router'
import aboutBlogImg from '../../assets/images/hero/about-blog.jpg'
import eventsImg from '../../assets/images/hero/ATM_9764.jpg'
import workingImg from '../../assets/images/hero/SUT_8193.jpg'
import resultsImg from '../../assets/images/hero/SUT_7962.jpg'
import sessionImg from '../../assets/images/hero/ATM_9764.jpg'
import uzbekSideImg from '../../assets/images/hero/uzbek-side.jpg'
import initiativesImg from '../../assets/images/hero/initiatives.jpg'
import regionalAllianceImg from '../../assets/images/hero/regional-alliance.jpg'
import membersImg from '../../assets/images/hero/members.jpg'

// Public website (FIC) routes — rendered inside WebsiteLayout.
const websiteRoutes: RouteRecordRaw[] = [
    // ---- About the Council ----
    {
        path: '',
        name: 'home',
        component: () => import('../../views/website/home/Index.vue'),
        meta: { title: 'Home', noHero: true },
    },
    {
        path: 'fic-history',
        name: 'fic-history',
        component: () => import('../../views/website/fic-history/Index.vue'),
        meta: { title: 'FIC History', titleKey: 'nav.ficHistory', heroImage: aboutBlogImg },
    },
    {
        path: 'association',
        name: 'association',
        component: () => import('../../views/website/association/Index.vue'),
        meta: { title: 'Association', titleKey: 'nav.association', heroImage: aboutBlogImg },
    },
    {
        path: 'management',
        name: 'management',
        component: () => import('../../views/website/management/Index.vue'),
        meta: { title: 'Management', titleKey: 'nav.management', heroImage: aboutBlogImg },
    },
    {
        path: 'secretariat',
        name: 'secretariat',
        component: () => import('../../views/website/secretariat/Index.vue'),
        meta: { title: 'Secretariat', titleKey: 'nav.secretariat', heroImage: aboutBlogImg },
    },

    // ---- Council Members ----
    {
        path: 'council-members',
        name: 'council-members',
        component: () => import('../../views/website/council-members/Index.vue'),
        meta: { title: 'Council Members', titleKey: 'nav.councilMembers', descriptionKey: 'councilMembersPage.intro', heroImage: membersImg },
    },
    {
        path: 'council-members/uzbek-side',
        name: 'council-members-uzbek-side',
        component: () => import('../../views/website/council-members/uzbek-side/Index.vue'),
        meta: { title: 'Uzbek side', titleKey: 'nav.uzbekSide', descriptionKey: 'uzbekSidePage.intro', heroImage: uzbekSideImg },
    },
    {
        path: 'council-members/experts',
        name: 'council-members-experts',
        component: () => import('../../views/website/council-members/experts/Index.vue'),
        meta: { title: 'Experts', titleKey: 'nav.experts', descriptionKey: 'expertsPage.intro', heroImage: eventsImg },
    },
    {
        path: 'council-members/become-a-member',
        name: 'council-members-become',
        component: () => import('../../views/website/council-members/become-a-member/Index.vue'),
        meta: { title: 'Become a Member', titleKey: 'nav.becomeAMember', descriptionKey: 'becomeAMemberPage.intro', heroImage: membersImg },
    },

    // ---- Working Groups (single page, anchor sections) ----
    {
        path: 'working-groups',
        name: 'working-groups',
        component: () => import('../../views/website/working-groups/Index.vue'),
        meta: { title: 'Working Groups', titleKey: 'nav.workingGroups', heroImage: workingImg },
    },

    // ---- Results ----
    {
        path: 'results',
        name: 'results',
        component: () => import('../../views/website/results/Index.vue'),
        meta: { title: 'Council Results', titleKey: 'nav.councilResults', heroImage: resultsImg },
    },
    {
        path: 'results/initiatives',
        name: 'results-initiatives',
        component: () => import('../../views/website/results/initiatives/Index.vue'),
        meta: { title: 'Initiatives', titleKey: 'nav.initiatives', descriptionKey: 'resultsPage.initiativesPage.intro', heroImage: initiativesImg, heroImagePosition: 'center 72%' },
    },
    {
        path: 'results/investments',
        name: 'results-investments',
        component: () => import('../../views/website/results/investments/Index.vue'),
        meta: { title: 'Investments', titleKey: 'nav.investments', descriptionKey: 'resultsPage.investmentsPage.intro', heroImage: membersImg },
    },
    {
        path: 'results/documents',
        name: 'results-documents',
        component: () => import('../../views/website/results/documents/Index.vue'),
        meta: { title: 'Documents', titleKey: 'nav.documents', descriptionKey: 'resultsPage.documentsPage.intro', heroImage: aboutBlogImg },
    },
    {
        path: 'results/regional-alliance',
        name: 'results-regional-alliance',
        component: () => import('../../views/website/results/regional-alliance/Index.vue'),
        meta: { title: 'Regional Alliance (RAIC-CAC)', titleKey: 'resultsPage.regionalAlliance.heroShort', heroImage: regionalAllianceImg, heroImagePosition: 'center 78%' },
    },

    // ---- Events ----
    {
        path: 'events',
        name: 'events',
        component: () => import('../../views/website/events/Index.vue'),
        meta: { title: 'Calendar Plan', titleKey: 'nav.calendarPlan', heroImage: aboutBlogImg },
    },
    {
        path: 'events/plenary-sessions',
        name: 'events-plenary-sessions',
        component: () => import('../../views/website/events/plenary-sessions/Index.vue'),
        meta: { title: 'Plenary sessions', titleKey: 'nav.plenarySessions', descriptionKey: 'eventsPage.plenaryPage.intro', heroImage: eventsImg },
    },
    {
        path: 'events/plenary-sessions/:id',
        name: 'events-plenary-session-detail',
        component: () => import('../../views/website/events/plenary-sessions/Detail.vue'),
        meta: { title: 'Plenary session', titleKey: 'nav.plenarySessions', heroImage: eventsImg },
    },
    {
        path: 'events/interim-session',
        name: 'events-interim-session',
        component: () => import('../../views/website/events/interim-session/Index.vue'),
        meta: { title: 'Interim session', titleKey: 'nav.interimSession', descriptionKey: 'eventsPage.interimPage.intro', heroImage: eventsImg },
    },
    {
        path: 'events/interim-session/:id',
        name: 'events-interim-session-detail',
        component: () => import('../../views/website/events/interim-session/Detail.vue'),
        meta: { title: 'Interim session', titleKey: 'nav.interimSession', heroImage: eventsImg, noHero: true },
    },
    {
        path: 'events/working-group-session',
        name: 'events-working-group-session',
        component: () => import('../../views/website/events/working-group-session/Index.vue'),
        meta: { title: 'Working group session', titleKey: 'nav.workingGroupSession', descriptionKey: 'eventsPage.wgSessionPage.intro', heroImage: eventsImg },
    },
    {
        path: 'events/meetings',
        name: 'events-meetings',
        component: () => import('../../views/website/events/meetings/Index.vue'),
        meta: { title: 'Meetings', titleKey: 'nav.meetings', descriptionKey: 'eventsPage.meetingsPage.intro', heroImage: eventsImg },
    },
    {
        path: 'events/meetings/:id',
        name: 'events-meetings-detail',
        component: () => import('../../views/website/events/meetings/Detail.vue'),
        meta: { title: 'Meeting', noHero: true },
    },
    {
        path: 'events/weekly-results',
        name: 'events-weekly-results',
        component: () => import('../../views/website/events/weekly-results/Index.vue'),
        meta: { title: 'Weekly results', titleKey: 'nav.weeklyResults', descriptionKey: 'eventsPage.weeklyPage.intro', heroImage: eventsImg },
    },
    {
        path: 'events/weekly-results/:id',
        name: 'events-weekly-results-detail',
        component: () => import('../../views/website/events/weekly-results/Detail.vue'),
        meta: { title: 'Weekly result', noHero: true },
    },

    // ---- Media ----
    {
        path: 'media',
        name: 'media',
        component: () => import('../../views/website/media/Index.vue'),
        meta: { title: 'News', descriptionKey: 'mediaPage.newsIntro', noHero: true },
    },
    {
        path: 'media/analytics',
        name: 'media-analytics',
        component: () => import('../../views/website/media/analytics/Index.vue'),
        meta: { title: 'Analytics and Articles', descriptionKey: 'mediaPage.analyticsPage.intro', noHero: true },
    },
    {
        path: 'media/analytics/:id',
        name: 'media-analytics-detail',
        component: () => import('../../views/website/media/analytics/Detail.vue'),
        meta: { title: 'Article', noHero: true },
    },
    {
        path: 'media/special-projects',
        name: 'media-special-projects',
        component: () => import('../../views/website/media/special-projects/Index.vue'),
        meta: { title: 'Special Projects', descriptionKey: 'mediaPage.specialProjectsPage.intro', noHero: true },
    },
    {
        path: 'media/blitz-interview',
        name: 'media-blitz-interview',
        component: () => import('../../views/website/media/blitz-interview/Index.vue'),
        meta: { title: 'Blitz interview', descriptionKey: 'mediaPage.blitzPage.intro', noHero: true },
    },
    {
        path: 'media/reports',
        name: 'media-reports',
        component: () => import('../../views/website/media/reports/Index.vue'),
        meta: { title: 'Reports', descriptionKey: 'mediaPage.reportsPage.intro', noHero: true },
    },

    // ---- Contact ----
    {
        path: 'contact',
        name: 'contact',
        component: () => import('../../views/website/contact/Index.vue'),
        meta: { title: 'Contact us', titleKey: 'nav.contact', noHero: true },
    },
]

export default websiteRoutes
