import {useRouter} from "next/router";

export default function HomePage() {
    const router = useRouter();
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => router.push('/about')}>About</button>
        </div>
    );
}