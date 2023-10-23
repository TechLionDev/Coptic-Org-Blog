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
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default Posts;