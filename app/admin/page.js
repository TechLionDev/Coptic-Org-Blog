'use client';

import CHead from "@/components/CHead";
import {useRouter} from "next/navigation";
import {useState} from "react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminHome = () => {
  const router = useRouter();
  const [adminSideBarIsCollapsed, setAdminSideBarIsCollapsed] = useState(false);
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
      <CHead title={'Admin Home'}/>
      <div className="flex">
        <AdminSidebar
          currSlug={'/admin'}
          isCollapsed={adminSideBarIsCollapsed}
          onCollapse={() => {
            setAdminSideBarIsCollapsed(!adminSideBarIsCollapsed);
          }}
        />
        <div className="p-8">

        </div>
      </div>
    </>
  );
}

export default AdminHome;