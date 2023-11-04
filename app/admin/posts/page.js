'use client';

import PocketBase from 'pocketbase';
import * as TablerIcons from '@tabler/icons-react';

let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import {useEffect, useState} from 'react';
import {useRouter} from "next/navigation"
import CHead from "@/components/CHead";
import AdminSidebar from "@/components/AdminSidebar";

const Posts = () => {
  const router = useRouter();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [adminSideBarIsCollapsed, setAdminSideBarIsCollapsed] = useState(false);


  useEffect(() => {
    (async () => {
      let res = await pb.collection('posts').getFullList({
        // sort by created so that the newest created is the 1st index
        sort: 'created',
      });
      setPosts(res);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <CHead title={'Posts'}/>
      {loading ? (
        <div className="transition-all duration-500 flex">
          <AdminSidebar
            currSlug={'/admin/posts'}
            isCollapsed={adminSideBarIsCollapsed}
            onCollapse={() => {
              setAdminSideBarIsCollapsed(!adminSideBarIsCollapsed);
            }}/>
          <div className="transition-all duration-500 flex w-full p-6 items-center justify-center">
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="transition-all duration-500 flex">
            <AdminSidebar
              currSlug={'/admin/posts'}
              isCollapsed={adminSideBarIsCollapsed}
              onCollapse={() => {
                setAdminSideBarIsCollapsed(!adminSideBarIsCollapsed);
              }}/>
            <div
              className="transition-all duration-500 grid grid-cols-3 gap-4 p-4 overflow-y-auto max-h-screen h-fit w-full">
              {posts.map((post, index) => (
                <div key={index}
                     className="transition-all duration-500 bg-sky-50 shadow overflow-auto rounded-lg p-4 h-full flex-col flex gap-2">
                  <div className="flex flex-col justify-center pt-2 gap-3">
                    {post.coverImage && <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={'transition-all duration-500 rounded-lg h-28 max-h-28 min-h-28 w-full object-cover'}
                        src={'https://copts-org-blog.pockethost.io/api/files/posts/' + post.id + '/' + post.coverImage + '?thumb=0x100'}
                        alt={post.title}/>
                    </div>}
                    <p className={'transition-all duration-500 text-xl font-bold text-center w-full'}>
                      {post.title.length > 29 ? `${post.title.substring(0, 29)}...` : post.title}
                    </p>
                  </div>
                  <div className={'transition-all duration-500 flex justify-evenly items-end h-full gap-3 pt-2'}>
                    <button
                      onClick={() => {
                        router.push('/admin/posts/view/' + post.id);
                      }}
                      className={'transition-all duration-500 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg flex'}>
                      <TablerIcons.IconEye/>
                      <p>View</p>
                    </button>
                    <button
                      onClick={() => {
                        router.push('/admin/posts/edit/' + post.id);
                      }}
                      className={'transition-all duration-500 bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg flex'}>
                      <TablerIcons.IconPencil/>
                      <p>Edit</p>
                    </button>
                    <button
                      onClick={() => {
                        router.push('/admin/posts/delete/' + post.id);
                      }}
                      className={'transition-all duration-500 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex'}>
                      <TablerIcons.IconTrash/>
                      <p>Delete</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Posts;