'use client';

import { useRouter } from "next/navigation";

const AdminHome = () => {
    const router = useRouter();
    let user
    if (process.browser) {
        user = JSON.parse(localStorage.getItem('pocketbase_auth')).model;
    }
    return (
        <>
            <h1 className='text-4xl font-semibold'>Welcome, {user?.name}!</h1>
            <h2 className='text-2xl font-semibold'>You are logged in as an administrator.</h2>
            <button className="p-6 bg-blue-300 font-bold" onClick={() => {router.push('/posts/create')}}>
                Create Post
            </button>
        </>
    );
}

export default AdminHome;