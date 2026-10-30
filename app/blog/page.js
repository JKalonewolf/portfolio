import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data) ? data.filter((item) => item?.cover_image) : [];
  } catch (error) {
    console.error("Unable to load blog articles:", error.message);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <section className="min-h-[60vh] py-8">
      <div className="flex justify-center py-8">
        <h1 className="rounded-md bg-[#1a1443] px-6 py-3 text-2xl font-bold text-white">
          Articles &amp; Blogs
        </h1>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h2 className="text-lg font-semibold text-white">Articles coming soon</h2>
          <p className="mt-2 text-sm leading-7 text-gray-400">
            I&apos;m preparing practical notes and insights about business analysis,
            product analytics, FinTech and AI.
          </p>
        </div>
      )}
    </section>
  );
}
