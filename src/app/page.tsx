'use client'

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/postService";
import Link from "next/link";

export default function Home() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div className="text-center">Загрузка...</div>;
  if (error) return <div className="text-center text-red-500">Ошибка загрузки постов</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Посты</h1>
      <ul className="space-y-4">
        {posts?.map((post) => (
          <li key={post.id} className="bg-white border p-4 rounded-lg">
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