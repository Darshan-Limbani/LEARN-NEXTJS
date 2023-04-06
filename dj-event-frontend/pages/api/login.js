import {API_URL} from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
    console.log('identifier, password', req.body.identifier, req.body.password);
    if (req.method === 'POST') {
        const {identifier, password} = req.body;
        const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        });
        const data = await strapiRes.json();

        console.log("JWT TOKEN : ", data.jwt);
        if (strapiRes.ok) {
            res.setHeader('Set-Cookie', cookie.serialize(
                'token', data.jwt,
                {
                    httpOnly: true,
                    isSecureContext: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 4 * 7,
                    sameSite: 'strict',
                    path: '/'
                }
            ));
            res.status(200).json({user: data.user});
        } else {
            console.log("data : ", data);
            res.status(data.error.status).json({
                message: data.error.message
            });
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method ${req.method} not allowed`});
        console.log(req.body);
        res.status(200).json({});
    }
}