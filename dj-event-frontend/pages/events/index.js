import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import {API_URL, PER_PAGE} from "@/config/index";


export default function EventsPage({events, pagination}) {
    // console.log("EVENT.................... ", events);
    return (<Layout>
        <h1>Upcoming Events</h1>
        {events.length === 0 && <h3>No Events to show</h3>}
        {events.map(event => (<EventItem key={event.id} evt={event}/>))}
        <Pagination page={pagination.page} total={pagination.pageCount}/>
    </Layout>);
}

export async function getServerSideProps({query: {page = 1}}) {

    const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*&pagination[pageSize]=${PER_PAGE}
    &pagination[page]=${page}`);
    const events = await res.json();

    return {
        props: {events: events.data, pagination: events.meta.pagination}
    };
}