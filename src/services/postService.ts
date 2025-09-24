import api from "@/lib/api";

export interface Post {
    id: number;
    title: string;
    body: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
    const responce = await api.get('/posts');
    return responce.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
    const responce = await api.get(`posts/${id}`);
    return responce.data;
};