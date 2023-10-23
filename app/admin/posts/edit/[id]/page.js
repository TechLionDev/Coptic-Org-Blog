'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useEffect, useState } from 'react';
import CHead from "@/components/CHead";
import TextEditor from "@/components/TextEditor";
import { useRouter } from 'next/navigation';

const Post = ({ params }) => {
    const [post, setPost] = useState();
    let router = useRouter();
    if (process.browser) {
        if (!localStorage.getItem('pocketbase_auth')) {
            router.push('/signin');
        }
    }
    const [richTextContent, setRichTextContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRichTextChange = (content) => {
        setRichTextContent(content);
    }

    useEffect(() => {
        (async () => {
            let res = await pb.collection('posts').getOne(params.id);
            console.log(res);
            setPost(res);
            setLoading(false);
            setTitle(res.title);
            setRichTextContent(res.body);
        })();
    }, []);


    const updatePost = async (e) => {
        e.preventDefault();
        setLoading(true);
        let title = e.target[0].value;
        let body = richTextContent;
        let res = await pb.collection('posts').update(params.id, { title, body })
        console.log(res);
        router.push('/admin/posts/view/' + res.id);
    }


    return (
        <>
            <CHead title={'Editing ' + post?.title} />
            {loading ? (
                <div className="flex w-full p-6 items-center justify-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full p-6 items-center justify-center">
                    <div>
                        <a href="/admin/posts" className="text-blue-500 hover:text-blue-700 font-bold">Back to Posts</a>
                    </div>
                    <form onSubmit={updatePost} className="w-full flex flex-col">
                        <input className="w-full border border-gray-300 rounded-md p-2 mb-4" type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        <TextEditor onRichTextChange={handleRichTextChange} initialHTML={post?.body} />
                        <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Post;