import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import Link from "next/link";
import {useRouter} from "next/router";
import qs from "qs";

export default function SearchPage({events}) {

    const router = useRouter();
    return (
        <Layout>
            <Link href={'/events'}>{'<'} Go Back</Link>
            <h1>Search Results For {router.query.term}</h1>
            {events.length === 0 && <h3>No Events to show</h3>}
            {events.map(event => (
                <EventItem key={event.id} evt={event}/>
            ))}
        </Layout>
    );
}

export async function getServerSideProps({query: {term}}) {

    const query = qs.stringify({
        filters: {
            $or: [
                {name: {$contains: term}},
                {performers: {$contains: term}},
                {description: {$contains: term}},
                {venue: {$contains: term}},
            ],
        },
    });

    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
    const {data: events} = await res.json();

    // console.log("events log......", events);

    return {
        props: {events}
    };
}