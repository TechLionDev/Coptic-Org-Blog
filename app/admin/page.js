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
            <div className="h-screen">
                
            </div>
        </>
    );
}

export default AdminHome;