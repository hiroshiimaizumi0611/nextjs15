// components/PostList.tsx
import { auth } from "@clerk/nextjs/server";
import { fetchPosts } from "@/lib/postDataFetcher";
import Post from "./Post";

export default async function PostList() {
  const { userId } = auth();
  if (!userId) { return }

  const posts = await fetchPosts(userId)

  return (
    <div className="space-y-4">
      {posts
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No posts found!"}
    </div>
  );
}