// Import required modules and components
import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

//note that you can select different styles here (look in the node package)
import "highlight.js/styles/github-dark.css";

// Time in seconds to revalidate the static page (SSG better performance!)
export const revalidate = 86400;

// Define the type for component props
type Props = {
  params: {
    postId: string;
  };
};

// Function to generate static params for each post
export async function generateStaticParams() {
  // Fetch metadata for all posts
  const posts = await getPostsMeta(); //deduped!

  // If no posts are available, return an empty array
  if (!posts) return [];

  // Map posts to an array of params objects
  return posts.map((post) => ({
    postId: post.id,
  }));
}

// Function to generate metadata for a specific post
export async function generateMetadata({ params: { postId } }: Props) {
  // Fetch the post by its ID
  const post = await getPostByName(`${postId}.mdx`); //deduped!

  // If the post is not found, return a default title
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  // Return the post's title as metadata
  // The metadata is contained in the post title
  return {
    title: post.meta.title,
  };
}

// Asynchronous function component to display a single post
export default async function Post({ params: { postId } }: Props) {
  // Fetch the post by its ID
  const post = await getPostByName(`${postId}.mdx`); //deduped!

  // If the post is not found, trigger a "not found" page
  if (!post) notFound();

  // Destructure metadata and content from the post
  const { meta, content } = post;

  // Format the publication date
  const pubDate = getFormattedDate(meta.date);

  // Generate tag links
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  // Render the post content and metadata
  return (
    <>
      {/* <h2 className="text-lg mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p> */}
      <article className="mt-10">{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
}
