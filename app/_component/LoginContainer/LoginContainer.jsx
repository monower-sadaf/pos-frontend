'use client';

import { useState } from "react";


const LoginContainer = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const HandleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).catch((err) => {
            console.log(err);
        });

        console.log('login response: ',res);

        setLoading(false);

        if (res.ok) {
            const data = await res.json();
            console.log('response after ok: ',data);
        }


    }




    return (
        <section className="min-h-[80vh] flex justify-center items-center">
            <form onSubmit={HandleLogin} method="post">
                <h1>Login</h1>
                <div>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </section>
    )
};

export default LoginContainer;