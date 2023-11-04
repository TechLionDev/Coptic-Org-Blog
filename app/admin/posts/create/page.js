'use client';

import PocketBase from 'pocketbase';

let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import TextEditor from "@/components/TextEditor";
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import CHead from "@/components/CHead";
import AdminSidebar from "@/components/AdminSidebar";


export default function CreatePost() {
  let router = useRouter();
  if (process.browser) {
    if (!localStorage.getItem('pocketbase_auth')) {
      router.push('/signin');
    }
  }
  const [richTextContent, setRichTextContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminSideBarIsCollapsed, setAdminSideBarIsCollapsed] = useState(false);


  const handleRichTextChange = (content) => {
    setRichTextContent(content);
  }

  const createPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    let coverImage = e.target[0].files[0];
    let title = e.target[1].value;
    let body = richTextContent;
    let res = await pb.collection('posts').create({
      coverImage,
      title,
      body
    })
    console.log(res);
    router.push('/admin/posts/view/' + res.id);
  }

  return (
    <>
      <CHead title={'Create Post'}/>
      <div className="flex">
        <AdminSidebar
          currSlug={'/admin/posts/create'}
          isCollapsed={adminSideBarIsCollapsed}
          onCollapse={() => {
            setAdminSideBarIsCollapsed(!adminSideBarIsCollapsed);
          }}
        />
        <div className="flex w-full p-6 items-center justify-center h-fit">
          <form onSubmit={createPost} className="w-full flex flex-col">
            <div className="flex gap-3">
              <input type='file' className="w-1/2 border border-gray-300 rounded-md p-2 mb-4" accept='image/*'/>
              <input className="w-1/2 border border-gray-300 rounded-md p-2 mb-4" type="text" placeholder="Title"/>
            </div>
            <TextEditor onRichTextChange={handleRichTextChange}/>
            <button disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}