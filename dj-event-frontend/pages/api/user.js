import {API_URL} from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
    console.log('identifier, password', req.body.identifier, req.body.password);
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            res.status(403).json({message: 'Not Authorized'});
        }

        const {token} = cookie.parse(req.headers.cookie);
        const strapiRes = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = await strapiRes.json();
        if (strapiRes.ok) {
            res.status(200).json({user});
        } else {
            res.status(403).json({message: 'User forbidden'});
        }

    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({message: `Method ${req.method} not allowed`});
        console.log(req.body);
        res.status(200).json({});
    }
}