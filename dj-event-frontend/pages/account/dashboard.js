import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import {parseCookie} from '@/helpers/index';
import styles from '@/styles/Dashboard.module.css';

export default function DashboardPage({events}) {
    console.log("events", events);
    return (
        <Layout title={'User Dashboard'}>
            <h1>Dashboard</h1>
            <h3>My Events</h3>
            {
                events.map((evt) => (
                    <DashboardEvent evt={evt} key={evt.id}/>
                ))
            }
        </Layout>
    );
}


export async function getServerSideProps({req}) {
    const {token} = parseCookie(req);

    const res = await fetch(`${API_URL}/api/events`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const events = await res.json();

    console.log(token);
    console.log(events);
    return {
        props: {events: events.data}
    };
}