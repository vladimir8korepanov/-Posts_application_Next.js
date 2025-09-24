'use client'

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/postService";
import { useState } from 'react';
import Link from "next/link";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    const filteredPosts = posts?.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="text-center">Загрузка...</div>;
    if (error) return <div className="text-center text-red-500">Ошибка загрузки постов</div>;

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4">Поиск постов</h1>
            <div className="md-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по заголовку..."
                    className="border p-2 rounded w-full"
                />
            </div>
            <ul className="space-y-4">
                {filteredPosts?.map((post) => (
                    <li key={post.id} className="p-4 rounded-lg bg-white">
                        <Link href={`/post/${post.id}`}>
                            <h2 className="text-xl font-semibold text-cyan-800">{post.title}</h2>
                            <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}