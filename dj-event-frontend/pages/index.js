import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import Link from "next/link";

export default function HomePage({events}) {
    // console.log("EVENTS ... ", events);
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No Events to show</h3>}
            {events.map(event => (<EventItem key={event.id} evt={event}/>))}
            {events.length > 0 && (<Link href={'/events'} className={'btn-secondary'}>
                View All Events
            </Link>)}
        </Layout>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`);
    const {data: events} = await res.json();

    return {
        props: {events}, revalidate: 1
    };
}