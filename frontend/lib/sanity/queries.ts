import { groq } from 'next-sanity';

// ── Site Settings ────────────────────────────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    seoTitle,
    seoDescription,
    header {
      siteName,
      navLinks,
      primaryButtonLabel,
      primaryButtonUrl,
      secondaryButtonLabel,
      secondaryButtonUrl,
    },
    footer {
      siteName,
      tagline,
      navColumnTitle,
      navLinks,
      memberColumnTitle,
      memberLinks,
      copyright,
      legalLabel,
      legalUrl,
      privacyLabel,
      privacyUrl,
    }
  }
`;

// ── Home Page ────────────────────────────────────────────────────────────────
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero {
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
    about {
      eyebrow,
      title,
      paragraph1,
      paragraph2,
      values[] { title, body }
    },
    activitiesEyebrow,
    activitiesTitle,
    activitiesLinkLabel,
    newsEyebrow,
    newsTitle,
    newsLinkLabel,
    contact {
      eyebrow,
      title,
      description,
      primaryButtonLabel,
      primaryButtonUrl,
      secondaryButtonLabel,
      secondaryButtonUrl,
      channels[] { label, value, href },
      socials[] { platform, href }
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
  *[_type == "aboutPage"][0] {
    eyebrow,
    title,
    description,
    missionImage { asset->{ url } },
    missionTitle,
    missionParagraph1,
    missionParagraph2,
    stats[] { value, label },
    valuesTitle,
    values[] { title, body }
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
  *[_type == "contactPage"][0] {
    eyebrow,
    title,
    description,
    coordinatesTitle,
    channels[] { label, value, href },
    formTitle,
    formSubtitle
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
