import { fetchPostById } from "@/services/postService";
import Link from "next/link";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
    const { id } = await params;
    const post = await fetchPostById(Number(id));

    return (
        <div className="container mx-auto p-4 bg-white">
            <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
                На главную
            </Link>
            <h1 className="text-2xl font-bold mb-4 text-cyan-800">{post.title}</h1>
            <p className="text-gray-600">{post.body}</p>
        </div>
    );
}