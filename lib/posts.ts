// Import required modules and components
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import Video from "@/app/components/Video";
import CustomImage from "@/app/components/CustomImage";

// Define the type for the GitHub repository file tree
type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

// Function to fetch and compile a single blog post by its file name
export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  // Fetch the raw MDX content from GitHub
  const res = await fetch(
    `https://raw.githubusercontent.com/stonediggity/mdx-library/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Cache-Control": "no-cache",
      },
    }
  );

  // If the fetch fails, return undefined
  if (!res.ok) return undefined;

  // Parse the raw MDX content
  const rawMDX = await res.text();

  // If the content is not found, return undefined
  if (rawMDX === "404: Not Found") return undefined;

  // Compile the MDX content and extract frontmatter
  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  // Create a blog post object, id picked from file name (strip .mdx )
  const id = fileName.replace(/\.mdx$/, "");
  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };

  // Return the blog post object
  return blogPostObj;
}

// Function to fetch metadata for all blog posts
export async function getPostsMeta(): Promise<Meta[] | undefined> {
  // Fetch the file tree from the GitHub repository
  const res = await fetch(
    "https://api.github.com/repos/stonediggity/mdx-library/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Cache-Control": "no-cache",
      },
    }
  );

  // If the fetch fails, return undefined
  if (!res.ok) return undefined;

  // Parse the JSON response to get the file tree
  const repoFiletree: Filetree = await res.json();

  // Filter out MDX files from the file tree
  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"));

  // Initialize an array to hold post metadata
  const posts: Meta[] = [];

  // Loop through each MDX file to fetch its metadata
  for (const file of filesArray) {
    const post = await getPostByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  // Sort the posts by date and return
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
