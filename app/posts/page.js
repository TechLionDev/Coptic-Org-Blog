'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CHead from "@/components/CHead";

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
            <CHead title={'Posts'} />
            {loading ? (
                <div className="flex w-full p-6 items-center justify-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-3 w-full p-6 ">
                    {posts.map((post, index) => (
                        <div key={index} className="flex w-full items-center justify-center shadow-md hover:shadow-xl rounded-lg border hover:cursor-pointer text-center px-6">
                            <Link href={`/posts/view/${post.id}`} className='flex flex-grow items-center justify-center'>
                                <div class="flex flex-col">
                                    <p className="px-6 pt-6 text-2xl font-bold">{post.title}</p>
                                    <p className="px-6 pb-6 text-lg">{post.body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().split(' ').slice(0, 15).join(' ')}...</p>
                                </div>
                            </Link>
                            <Link href={`/posts/edit/${post.id}`} className='flex flex-shrink'>
                                <div class="flex flex-col p-2">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="hover:text-green-400">
                                        <path d="M12 20h9"></path>
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                    </svg>
                                </div>
                            </Link>
                            <Link href={`/posts/delete/${post.id}`} className='flex flex-shrink'>
                                <div class="flex flex-col p-2">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="hover:text-red-400">
                                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default Posts;