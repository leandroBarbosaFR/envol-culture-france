import {aboutPageIntro} from './documents/aboutPageIntro'
import {aboutPageStats} from './documents/aboutPageStats'
import {aboutPageValues} from './documents/aboutPageValues'
import {activitiesPage} from './documents/activitiesPage'
import {activity} from './documents/activity'
import {actualitesPage} from './documents/actualitesPage'
import {contactPageForm} from './documents/contactPageForm'
import {galeriePage} from './documents/galeriePage'
import {galleryAlbum} from './documents/galleryAlbum'
import {cookieBanner} from './documents/cookieBanner'
import {contactPageInfo} from './documents/contactPageInfo'
import {heroSection} from './documents/heroSection'
import {legalPage} from './documents/legalPage'
import {homeAboutSection} from './documents/homeAboutSection'
import {homeActivitiesSection} from './documents/homeActivitiesSection'
import {homeContactSection} from './documents/homeContactSection'
import {homeGallerySection} from './documents/homeGallerySection'
import {homeNewsSection} from './documents/homeNewsSection'
import {newsPost} from './documents/newsPost'
import {pageSeo} from './documents/pageSeo'
import {siteFooter} from './documents/siteFooter'
import {siteContact} from './documents/siteContact'
import {siteHeader} from './documents/siteHeader'
import {tarifsHorairesPage} from './documents/tarifsHorairesPage'
import {contactChannel} from './objects/contactChannel'
import {galleryImage} from './objects/galleryImage'
import {heroSlide} from './objects/heroSlide'
import {navItem} from './objects/navItem'
import {scheduleItem} from './objects/scheduleItem'
import {socialLink} from './objects/socialLink'
import {statItem} from './objects/statItem'
import {table} from './objects/table'
import {tarifItem} from './objects/tarifItem'
import {valueItem} from './objects/valueItem'

export const schemaTypes = [
  // documents — home sections
  heroSection,
  homeAboutSection,
  homeActivitiesSection,
  homeContactSection,
  homeGallerySection,
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
  galeriePage,
  tarifsHorairesPage,

  // documents — collections
  activity,
  galleryAlbum,
  newsPost,

  // documents — global
  cookieBanner,
  legalPage,
  pageSeo,
  siteContact,
  siteFooter,
  siteHeader,

  // objects
  contactChannel,
  galleryImage,
  heroSlide,
  navItem,
  scheduleItem,
  socialLink,
  statItem,
  table,
  tarifItem,
  valueItem,
]
