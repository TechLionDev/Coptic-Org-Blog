'use client';

import PocketBase from 'pocketbase';
let pb = new PocketBase('https://copts-org-blog.pockethost.io');
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import CHead from "@/components/CHead";

const Posts = () => {
    const router = useRouter();
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

    // JavaScript function to format the date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleString(undefined, options);
    }

    return (
        <>
            <CHead title={'Posts'} />
            {loading ? (
                <div className="flex w-full p-6 items-center justify-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className='text-blue-600 p-4 flex hover:gap-6 hover:cursor-pointer' onClick={()=>{router.push('/admin')}}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        <p>Back To Admin Dashboard</p>
                    </div>
                    <div className="flex flex-col w-full gap-8 px-1 py-2">
                        <div className="flex w-auto overflow-x-scroll">
                            <table className="overflow-x-auto divide-y divide-gray-300 md:min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Posted On
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {posts.map((post) => (
                                        <tr key={post.id}>
                                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                                {post.title}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {formatDate(post.created)}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap">
                                                <a className="hover:text-green-500 decoration-dotted underline-offset-4 hover:underline" href={`/admin/posts/view/${post.id}`}>
                                                    View
                                                </a>{" "}
                                                |{" "}
                                                <a className="hover:text-blue-500 decoration-dotted underline-offset-4 hover:underline" href={`/admin/posts/edit/${post.id}`}>
                                                    Edit
                                                </a>{" "}
                                                |{" "}
                                                <a className="hover:text-red-500 decoration-dotted underline-offset-4 hover:underline" href={`/admin/posts/delete/${post.id}`}>
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    <button onClick={()=>{router.push('/admin/posts/create')}} className="p-4 bg-blue-400 text-white font-bold hover:bg-blue-500 rounded-lg">Create New Post</button>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
export default Posts;