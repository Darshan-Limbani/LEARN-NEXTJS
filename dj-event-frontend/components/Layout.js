import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Showcase from "@/components/Showcase";
import classes from '@/styles/Layout.module.css';
import Head from "next/head";
import {useRouter} from "next/router";

export default function Layout({title, keywords, description, children}) {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name={'description'} content={description}/>
                <meta name={'keywords'} content={keywords}/>
            </Head>
            <Header/>
            {router.pathname === '/' && <Showcase/>}
            <div className={classes.container}>{children}</div>
            <Footer/>
        </div>
    );
}

Layout.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and others musical events',
    keywords: 'music,dj,edm,events'
};