// Import required modules and components
import { getPostsMeta } from "@/lib/posts";
import ListItem from "./ListItem";

// Asynchronous function component to display a list of posts
export default async function Posts() {
  // Fetch metadata for all posts
  const posts = await getPostsMeta();

  // If no posts are available, display a message
  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  // Render the list of posts
  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-2xl font-semibold dark:text-white/90">Blog</h2>
      <ul className="w-full list-none p-0">
        {posts.map((post) => (
          // Use the ListItem component to display each post
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
