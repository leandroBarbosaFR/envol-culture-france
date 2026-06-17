import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero {
      title,
      subtitle,
      ctaLabel,
      ctaUrl,
      backgroundImage
    },
    about {
      title,
      description,
      image
    },
    seo {
      title,
      description
    }
  }
`;
