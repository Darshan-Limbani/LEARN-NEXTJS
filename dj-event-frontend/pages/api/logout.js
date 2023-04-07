import {API_URL} from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
    console.log('identifier, password', req.body.identifier, req.body.password);
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', cookie.serialize(
            'token', '',
            {
                httpOnly: true,
                isSecureContext: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }
        ));
        res.status(200).json({message: 'Success'});

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method ${req.method} not allowed`});
        console.log(req.body);
        res.status(200).json({});
    }
}