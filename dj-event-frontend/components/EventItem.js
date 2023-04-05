import styles from '@/styles/EventItem.module.css';
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EventItem({evt}) {
    // console.log("IMAGES : ", evt.attributes.image.data.attributes.formats.thumbnail.url);
    // console.log("IMAGES : ", evt.attributes.image);
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image
                    src={evt.attributes.image ? evt.attributes.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'}
                    height={100} width={170}
                    alt={evt.attributes.name}></Image>
            </div>
            <div className={styles.info}>
                <span>{new Date(evt.attributes.date).toLocaleDateString('en-us')} at {evt.attributes.time}</span>
                <h3>{evt.attributes.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`events/${evt.attributes.slug}`}><p className={'btn'}> Details</p></Link>

            </div>
        </div>
    );
}