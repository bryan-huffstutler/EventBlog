import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from 'next/head'

function HomePage(props) {

  return (
    <div>
    {/* SEO Optimization */}
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content="Find events to propel your networking." />
      </Head>
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {

  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      featuredEvents: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;