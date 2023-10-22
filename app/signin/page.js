'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useRouter } from 'next/navigation';
const SignIn = () => {
const router = useRouter();

    if (process.browser) {
        if (localStorage.getItem('pocketbase_auth')){
            router.push('/admin');
        }
    }

    const login = async (e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        await pb.collection('users').authWithPassword(username, password);
        router.push('/admin');
    }

    return (
        <>
            <form onSubmit={login} className='w-full h-screen flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-semibold mb-4'>Sign In</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username or Email"
                    className='p-6 bg-slate-200 mb-2 rounded-lg w-1/2'
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className='p-6 bg-slate-200 mb-2 rounded-lg w-1/2'
                />
                <button className='bg-blue-500 text-white w-1/2 rounded-lg p-6 font-semibold' type="submit">
                    Sign In
                </button>
            </form>
        </>
    );
}

export default SignIn;