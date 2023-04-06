import {API_URL} from "@/config/index";
import {useState} from "react";
import styles from '@/styles/Form.module.css';

export default function ImageUpload({evtId, imageUploaded}) {
    console.log("ID...............", evtId);
    const [image, setImage] = useState(null);

    function handleFileChange(e) {
        setImage(e.target.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'api::event.event');
        formData.append('refId', evtId);
        formData.append('field', 'image');

        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            imageUploaded();
        }
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type={"file"} onChange={handleFileChange}/>
                </div>
                <input type={"submit"} value={"Upload"} className={'btn'}/>
            </form>
        </div>
    );
}