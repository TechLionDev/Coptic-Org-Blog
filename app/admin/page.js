'use client';

import CHead from "@/components/CHead";
import { useRouter } from "next/navigation";

const AdminHome = () => {
    const router = useRouter();
    let user
    if (process.browser) {
        if (localStorage.getItem('pocketbase_auth')) {
            user = JSON.parse(localStorage.getItem('pocketbase_auth')).model;
        } else {
            router.push('/signin');
        }
    }
    return (
        <>
            <CHead title={'Admin Home'} />
            <div className="h-screen p-8">
                <div className="grid grid-cols-3 gap-4">
                    <button onClick={()=>{router.push('/admin/posts/create')}} className="p-4 bg-blue-400 text-white font-bold hover:bg-blue-500 rounded-lg">Create New Post</button>
                    <button onClick={()=>{router.push('/admin/posts/')}} className="p-4 bg-blue-400 text-white font-bold hover:bg-blue-500 rounded-lg">View All Posts</button>
                </div>
            </div>
        </>
    );
}

export default AdminHome;