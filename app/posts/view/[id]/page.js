'use client';

import PocketBase from 'pocketbase';
import * as TablerIcons from '@tabler/icons-react';

let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import {useEffect, useState} from 'react';
import CHead from "@/components/CHead";
import AdminSidebar from "@/components/AdminSidebar";

const Post = ({params}) => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [adminSideBarIsCollapsed, setAdminSideBarIsCollapsed] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await pb.collection('posts').getOne(params.id);
      console.log(res);
      setPost(res);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <CHead title={post?.title}/>
      <div className="flex">
        {loading ? (
          <div className="flex w-full p-6 items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full p-6 items-center justify-start h-fit max-h-screen overflow-y-auto">
            {/* Back to /posts */}
            <a href="/posts"
               className="flex items-center justify-center gap-2 text-sky-400 hover:text-sky-600 hover:scale-110 transition-all duration-500">
              <TablerIcons.IconArrowLeft className="w-6 h-6"/>
              <p>Back to Posts</p>
            </a>
            <div className="w-full flex flex-col border rounded-lg p-6">
              <img
                src={'https://copts-org-blog.pockethost.io/api/files/posts/' + post.id + '/' + post.coverImage + '?thumb=0x100'}
                alt={post.title} className="w-full h-72 object-cover rounded-lg"/>
              <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
              <div className="mt-4" dangerouslySetInnerHTML={{__html: post.body}}></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;