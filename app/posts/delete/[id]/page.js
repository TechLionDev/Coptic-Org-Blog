'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useEffect, useState } from 'react';
import CHead from "@/components/CHead";
import { useRouter } from 'next/navigation';

const Post = ({ params }) => {
    const router = useRouter();
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


    async function deletePost(e) {
        e.preventDefault();
        let res = await pb.collection('posts').delete(params.id);
        console.log(res);
        router.push('/posts');
    }

    return (
        <>
            <CHead title={post?.title} />
            {loading ? (
                <div className="flex w-full p-6 items-center justify-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 w-full p-6 items-center justify-center">
                        <div>
                            <a href="/posts" className="text-blue-500 hover:text-blue-700 font-bold">Back to Posts</a>
                        </div>
                        <div className="w-full flex flex-col border rounded-lg p-6">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                            <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.body }}></div>
                        </div>
                    </div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="relative h-fit w-fit max-h-screen max-w-screen-lg p-6 bg-white shadow-md rounded-md overflow-auto">
                            <button
                                className="absolute top-4 right-4 text-red-500 hover:animate-spin hover:text-red-800"
                                onClick={() => router.push('/posts')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Delete Post?</h2>
                            <p className="text-gray-800">Are you sure you want to delete this post?</p>
                            <div className="mt-4 flex gap-4 justify-end">
                                <button
                                    className="border-green-500 hover:border-green-700 text-green-500 border-2 hover:text-green-700 font-bold py-1 px-2 rounded"
                                    onClick={() => router.push('/posts')}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={deletePost}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Post;