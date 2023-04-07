import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import {parseCookie} from '@/helpers/index';
import {useRouter} from "next/router";
import {toast} from "react-toastify";

export default function DashboardPage({events, token}) {

    console.log("events", events);

    const router = useRouter();
    const deleteEvent = async (id) => {
        // console.log("delete");
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error("something went wrong");
            } else {
                // router.push("/events");
                router.reload();
            }
        }
    };

    return (
        <Layout title={'User Dashboard'}>
            <h1>Dashboard</h1>
            <h3>My Events</h3>
            {
                events.map((evt) => (
                    <DashboardEvent evt={evt} key={evt.id} handleDelete={deleteEvent.bind(evt.id)}/>
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
        props: {events: events.data, token}
    };
}