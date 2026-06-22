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
        eyebrow={data?.activitiesEyebrow}
        title={data?.activitiesTitle}
        linkLabel={data?.activitiesLinkLabel}
        activities={data?.recentActivities}
      />
      <News
        eyebrow={data?.newsEyebrow}
        title={data?.newsTitle}
        linkLabel={data?.newsLinkLabel}
        posts={data?.recentNews}
      />
      <Contact data={data?.contact} />
    </>
  );
}
