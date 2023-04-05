import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from '@/styles/Event.module.css';
import Image from "next/image";
import Link from "next/link";
import {FaPencilAlt, FaTimes} from "react-icons/fa";

export default function EventPage({evt}) {
    const deleteEvent = (e) => {
        console.log(e);
    };
    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <FaPencilAlt/> Edit Event
                    </Link>
                    <a href={'#'} className={styles.delete} onClick={deleteEvent}><FaTimes/> Delete Event </a>
                </div>

                <span>
                    {new Date(evt.date).toLocaleDateString('en-us')} at {evt.time}
                </span>
                <h1>{evt.name}</h1>
                {
                    evt.image && (
                        <div className={styles.image}>
                            <Image src={evt.image.data.attributes.formats.medium.url} width={960} height={600}
                                   alt={evt.name}/>
                        </div>
                    )
                }
                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Vanue:{evt.vanue}</h3>
                <p>{evt.address}</p>

                <Link href={'/events'} className={styles.back}>
                    {'<'} Go Back
                </Link>

            </div>
        </Layout>
    );
}

export async function getStaticPaths() {

    const res = await fetch(`${API_URL}/api/events`);
    const {data: events} = await res.json();

    const paths = events.map(evt => ({
        params: {slug: evt.attributes.slug}
    }));

    return {
        paths,
        fallback: true
    };

}


export async function getStaticProps({params: {slug}}) {

    const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`);
    const {data: events} = await res.json();

    return {
        props: {
            evt: events[0].attributes
        },
        revalidate: 1
    };
}