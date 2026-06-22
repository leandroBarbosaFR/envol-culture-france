import { client } from '@/lib/sanity/client';
import { homePageQuery } from '@/lib/sanity/queries';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Activities } from '@/components/activities';
import { News } from '@/components/news';
import { Contact } from '@/components/contact';

export default async function HomePage() {
  const data = await client.fetch(homePageQuery);

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
      <Contact data={data?.contact} />
    </>
  );
}
