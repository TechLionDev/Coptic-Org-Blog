'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Posts = () => {
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let res = await pb.collection('posts').getFullList();
            setPosts(res);
            setLoading(false);
        })();
    }, []);



    return (
        <>
            {loading ? (
                <div className="flex w-full p-6 items-center justify-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="flex flex-col gap- w-full p-6 items-center justify-center">
                    {posts.map((post, index) => (
                        <div key={index} className="flex flex-col gap-2 w-full items-center justify-center shadow-md hover:shadow-xl rounded-lg border hover:cursor-pointer text-center">
                            <Link href={`/posts/view/${post.id}`} className='w-full h-full'>
                                <p className="px-6 pt-6 text-2xl font-bold">{post.title}</p>
                                <p className="px-6 pb-6 text-lg">{post.body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().split(' ').slice(0, 15).join(' ')}...</p>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default Posts;