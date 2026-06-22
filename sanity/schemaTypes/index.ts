import {aboutPageIntro} from './documents/aboutPageIntro'
import {aboutPageStats} from './documents/aboutPageStats'
import {aboutPageValues} from './documents/aboutPageValues'
import {activitiesPage} from './documents/activitiesPage'
import {activity} from './documents/activity'
import {actualitesPage} from './documents/actualitesPage'
import {contactPageForm} from './documents/contactPageForm'
import {contactPageInfo} from './documents/contactPageInfo'
import {heroSection} from './documents/heroSection'
import {homeAboutSection} from './documents/homeAboutSection'
import {homeActivitiesSection} from './documents/homeActivitiesSection'
import {homeContactSection} from './documents/homeContactSection'
import {homeNewsSection} from './documents/homeNewsSection'
import {newsPost} from './documents/newsPost'
import {pageSeo} from './documents/pageSeo'
import {siteFooter} from './documents/siteFooter'
import {siteHeader} from './documents/siteHeader'
import {contactChannel} from './objects/contactChannel'
import {heroSlide} from './objects/heroSlide'
import {navItem} from './objects/navItem'
import {scheduleItem} from './objects/scheduleItem'
import {socialLink} from './objects/socialLink'
import {statItem} from './objects/statItem'
import {tarifItem} from './objects/tarifItem'
import {valueItem} from './objects/valueItem'

export const schemaTypes = [
  // documents — home sections
  heroSection,
  homeAboutSection,
  homeActivitiesSection,
  homeContactSection,
  homeNewsSection,

  // documents — about sections
  aboutPageIntro,
  aboutPageStats,
  aboutPageValues,

  // documents — contact sections
  contactPageInfo,
  contactPageForm,

  // documents — other pages
  activitiesPage,
  actualitesPage,

  // documents — collections
  activity,
  newsPost,

  // documents — global
  pageSeo,
  siteFooter,
  siteHeader,

  // objects
  contactChannel,
  heroSlide,
  navItem,
  scheduleItem,
  socialLink,
  statItem,
  tarifItem,
  valueItem,
]
