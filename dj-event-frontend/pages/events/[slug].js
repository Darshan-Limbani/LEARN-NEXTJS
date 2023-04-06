import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Event.module.css";

export default function EventPage({evt}) {
    const router = useRouter();
    console.log(evt);
    const deleteEvent = async (e) => {
        console.log("delete");
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error("something went wrong");
            } else {
                router.push("/events");
            }
        }
    };
    return (
        <Layout title="my event">
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <FaPencilAlt/>
                        Edit Event
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes/>
                        Delete Event
                    </a>
                </div>
                <span>
                {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
                    {evt.attributes.time}
            </span>
                <h1>{evt.attributes.name}</h1>
                <ToastContainer/>
                {evt.attributes.image && (
                    <div className={styles.image}>
                        <Image
                            src={evt.attributes.image.data?.attributes.url}
                            width={960}
                            height={600}
                        />
                    </div>
                )}
                <h3>Performers:</h3>
                <p>{evt.attributes.performers}</p>
                <h3>Description:</h3>
                <p>{evt.attributes.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.attributes.address}</p>

                <Link className={styles.back} href="/events">
                    {"<"} Go Back
                </Link>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({query: {slug}}) {
    const res = await fetch(
        `${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`);
    const {data: events} = await res.json();
    return {
        props: {evt: events[0]},
    };
}