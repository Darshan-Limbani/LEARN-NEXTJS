import styles from '@/styles/EventItem.module.css';
import Image from "next/image";
import Link from "next/link";

export default function EventItem({evt}) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={evt.image ? evt.image : '/images/event-default.png'} height={100} width={170}
                       alt={evt.name}></Image>
            </div>
            <div className={styles.info}>
                <span>{evt.date} at {evt.time}</span>
                <h3>{evt.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`events/${evt.slug}`}><p className={'btn'}> Details</p></Link>

            </div>
        </div>
    );
}