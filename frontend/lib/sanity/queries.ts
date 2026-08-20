import { groq } from 'next-sanity';

// ── Site Header ──────────────────────────────────────────────────────────────
export const siteHeaderQuery = groq`
  *[_type == "siteHeader"][0] {
    siteName,
    navLinks,
    primaryButtonLabel,
    primaryButtonUrl,
    secondaryButtonLabel,
    secondaryButtonUrl,
  }
`;

// ── Site Footer ──────────────────────────────────────────────────────────────
export const siteFooterQuery = groq`
  *[_type == "siteFooter"][0] {
    siteName,
    tagline,
    navColumnTitle,
    navLinks,
    memberColumnTitle,
    memberLinks,
    contactColumnTitle,
    copyright,
    legalLabel,
    legalUrl,
    privacyLabel,
    privacyUrl,
  }
`;

// ── Coordonnées (source unique : pied de page, contact, accueil) ─────────────
export const siteContactQuery = groq`
  *[_type == "siteContact"][0] {
    organisationName,
    contactName,
    phone,
    email,
    addressLine1,
    addressLine2,
    postalCode,
    city,
    openingHours
  }
`;

// ── Pages légales (id fixe : mentionsLegales | politiqueConfidentialite) ──────
export const legalPageQuery = groq`
  *[_type == "legalPage" && _id == $id][0] {
    title,
    lastUpdated,
    showContact,
    body
  }
`;

// ── SEO Global ───────────────────────────────────────────────────────────────
export const seoGlobalQuery = groq`
  *[_type == "pageSeo" && _id == "seoGlobal"][0] {
    metaTitle,
    metaDescription,
  }
`;

// ── Home Page ────────────────────────────────────────────────────────────────
export const homePageQuery = groq`
  {
    "hero": *[_type == "heroSection"][0] {
      titleLine1,
      titleLine2,
      subtitle,
      primaryButtonLabel,
      primaryButtonUrl,
      secondaryButtonLabel,
      secondaryButtonUrl,
      slides[] {
        alt,
        caption,
        image { asset->{ url } }
      }
    },
    "about": *[_type == "homeAboutSection"][0] {
      eyebrow,
      title,
      paragraph1,
      paragraph2,
      values[] { title, body }
    },
    "activitiesIntro": *[_type == "homeActivitiesSection"][0] {
      eyebrow,
      title,
      linkLabel,
    },
    "newsIntro": *[_type == "homeNewsSection"][0] {
      eyebrow,
      title,
      linkLabel,
    },
    "contact": *[_type == "homeContactSection"][0] {
      eyebrow,
      title,
      description,
      primaryButtonLabel,
      primaryButtonUrl,
      secondaryButtonLabel,
      secondaryButtonUrl,
      socials[] { platform, href }
    },
    "siteContact": *[_type == "siteContact"][0] {
      organisationName,
      contactName,
      phone,
      email,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      openingHours
    },
    "recentNews": *[_type == "newsPost"] | order(date desc) [0...3] {
      title,
      "slug": slug.current,
      date,
      category,
      excerpt,
      image { asset->{ url } }
    },
    "recentActivities": *[_type == "activity"] | order(_createdAt asc) {
      name,
      "slug": slug.current,
      tagline,
      description,
      image { asset->{ url } }
    }
  }
`;

// ── About Page ───────────────────────────────────────────────────────────────
export const aboutPageQuery = groq`
  {
    "intro": *[_type == "aboutPageIntro"][0] {
      eyebrow,
      title,
      description,
      missionImage { asset->{ url } },
      missionTitle,
      missionParagraph1,
      missionParagraph2,
    },
    "stats": *[_type == "aboutPageStats"][0].stats[] { value, label },
    "values": *[_type == "aboutPageValues"][0] {
      valuesTitle,
      values[] { title, body }
    }
  }
`;

// ── Activities Page ──────────────────────────────────────────────────────────
export const activitiesPageQuery = groq`
  *[_type == "activitiesPage"][0] {
    eyebrow,
    title,
    description,
    "activities": *[_type == "activity"] | order(_createdAt asc) {
      name,
      "slug": slug.current,
      tagline,
      description,
      image { asset->{ url } }
    }
  }
`;

// ── Activity by Slug ─────────────────────────────────────────────────────────
export const activityBySlugQuery = groq`
  *[_type == "activity" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    tagline,
    description,
    image { asset->{ url } },
    highlights,
    scheduleItems[] {
      activity,
      day,
      time,
      duration,
      place,
      teacher
    },
    tarifItems[] {
      activity,
      weekly,
      price,
      age
    }
  }
`;

// ── All Activity Slugs (for generateStaticParams) ────────────────────────────
export const activitySlugsQuery = groq`
  *[_type == "activity"] { "slug": slug.current }
`;

// ── Actualités Page ──────────────────────────────────────────────────────────
export const actualitesPageQuery = groq`
  *[_type == "actualitesPage"][0] {
    eyebrow,
    title,
    description,
    "posts": *[_type == "newsPost"] | order(date desc) {
      title,
      "slug": slug.current,
      date,
      category,
      excerpt,
      image { asset->{ url } }
    }
  }
`;

// ── News Post by Slug ────────────────────────────────────────────────────────
export const newsPostBySlugQuery = groq`
  *[_type == "newsPost" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    date,
    category,
    excerpt,
    body,
    image { asset->{ url } },
    "otherPosts": *[_type == "newsPost" && slug.current != $slug] | order(date desc) [0...2] {
      title,
      "slug": slug.current,
      date,
      image { asset->{ url } }
    }
  }
`;

// ── All News Slugs (for generateStaticParams) ────────────────────────────────
export const newsSlugsQuery = groq`
  *[_type == "newsPost"] { "slug": slug.current }
`;

// ── Contact Page ─────────────────────────────────────────────────────────────
export const contactPageQuery = groq`
  {
    "info": *[_type == "contactPageInfo"][0] {
      eyebrow,
      title,
      description,
      coordinatesTitle
    },
    "contact": *[_type == "siteContact"][0] {
      organisationName,
      contactName,
      phone,
      email,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      openingHours
    },
    "form": *[_type == "contactPageForm"][0] {
      formTitle,
      formSubtitle
    }
  }
`;

// ── Tarifs & Horaires Page (single page, two tabs) ───────────────────────────
export const tarifsHorairesPageQuery = groq`
  *[_type == "tarifsHorairesPage"][0] {
    tarifsTabLabel,
    tarifsEyebrow,
    tarifsTitle,
    tarifsDescription,
    tarifsContent,
    horairesTabLabel,
    horairesEyebrow,
    horairesTitle,
    horairesDescription,
    horairesContent
  }
`;

// ── Horaires Page ────────────────────────────────────────────────────────────
export const horairesPageQuery = groq`
  *[_type == "activity"] | order(_createdAt asc) {
    name,
    "slug": slug.current,
    scheduleItems[] {
      activity,
      day,
      time,
      duration,
      place,
      teacher
    }
  }
`;

// ── Tarifs Page ───────────────────────────────────────────────────────────────
export const tarifsPageQuery = groq`
  *[_type == "activity"] | order(_createdAt asc) {
    name,
    "slug": slug.current,
    tarifItems[] {
      activity,
      weekly,
      price,
      age
    }
  }
`;
