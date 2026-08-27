import { sanityFetch } from '@/lib/sanity/live';
import { homePageQuery } from '@/lib/sanity/queries';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Activities } from '@/components/activities';
import { News } from '@/components/news';
import { GalleryStrip } from '@/components/gallery-strip';

export default async function HomePage() {
  const data = (await sanityFetch({ query: homePageQuery })).data;

  return (
    <>
      <Hero data={data?.hero} />
      <About data={data?.about} />
      <Activities
        eyebrow={data?.activitiesIntro?.eyebrow}
        title={data?.activitiesIntro?.title}
        linkLabel={data?.activitiesIntro?.linkLabel}
        activities={data?.recentActivities}
      />
      <News
        eyebrow={data?.newsIntro?.eyebrow}
        title={data?.newsIntro?.title}
        linkLabel={data?.newsIntro?.linkLabel}
        posts={data?.recentNews}
      />
      <GalleryStrip
        eyebrow={data?.galleryIntro?.eyebrow}
        title={data?.galleryIntro?.title}
        linkLabel={data?.galleryIntro?.linkLabel}
        albums={data?.galleryAlbums}
      />
    </>
  );
}
