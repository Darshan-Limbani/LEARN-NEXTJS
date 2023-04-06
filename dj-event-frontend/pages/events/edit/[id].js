import Layout from "@/components/Layout";
import {API_URL} from "@/config/index";
import styles from "@/styles/Form.module.css";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import {FaImage} from "react-icons/all";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditEventPage({evt}) {
    console.log(evt);
    const [values, setValue] = useState({
        name: evt.attributes.name,
        performers: evt.attributes.performers,
        venue: evt.attributes.venue,
        address: evt.attributes.address,
        date: evt.attributes.data,
        time: evt.attributes.time,
        description: evt.attributes.description,
    });

    const [imagePreview, setImagePreview] = useState(evt.attributes.image ? evt.attributes.image.data.attributes.formats.thumbnail.url : null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");

        const hasEmptyFields = Object.values(values).some((element) => element === "");

        if (hasEmptyFields) {
            toast.error("Please fill in all fields");
        }

        const res = await fetch(`${API_URL}/api/events`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({data: values}),
        });

        if (!res.ok) {
            toast.error("something went wrong");
        } else {
            const evt = await res.json();
            router.push(`/events/${evt.data.attributes.slug}`);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValue({...values, [name]: value});
    };

    return (<Layout title="add event">
        <Link href="/events">Go Back</Link>
        <h1>Edit Event</h1>
        <ToastContainer/>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
                <div>
                    <label htmlFor="name">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="performers">Performers</label>
                    <input
                        type="text"
                        name="performers"
                        id="performers"
                        value={values.performers}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="venue">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        id="venue"
                        value={values.venue}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={moment(values.date).format('yyyy-MM-DD')}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input
                        type="text"
                        name="time"
                        id="time"
                        value={values.time}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="description">Event Description</label>
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={values.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <input type="submit" value="Add Event" className="btn"/>
        </form>

        <h2>Event Image</h2>
        {
            imagePreview ? (
                <Image src={imagePreview} alt={evt.attributes.name} height={100} width={170}/>) : (
                <div><p>No Image uploaded</p></div>

            )
        }
        <div>
            <button className={'btn-secondary'}>
                <FaImage/> Set Image
            </button>
        </div>
    </Layout>);
}


export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const {data: evt} = await res.json();

    return {
        props: {evt}
    };
}