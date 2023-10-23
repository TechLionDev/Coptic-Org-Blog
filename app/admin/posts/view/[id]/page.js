'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useEffect, useState } from 'react';
import CHead from "@/components/CHead";

const Post = ({ params }) => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);

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
            <CHead title={post?.title} />
            {loading ? (
                <div className="flex w-full p-6 items-center justify-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full p-6 items-center justify-center">
                    <div>
                        <a href="/admin/posts" className="text-blue-500 hover:text-blue-700 font-bold">Back to Posts</a>
                    </div>
                    <div className="w-full flex flex-col border rounded-lg p-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.body }}></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Post;