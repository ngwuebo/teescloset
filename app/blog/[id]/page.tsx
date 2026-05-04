import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import MainStoreHeader from "@/components/MainStoreHeader";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const blogPosts = [
  {
    id: 1,
    slug: "replica-goyard-bag-craftsmanship",
    title: "Replica Goyard Bag — The Craftsmanship Behind 1:1 Goyard Superclone Bags",
    excerpt: "All replica bags — the #1 store for goyard replica bags, wallets and backpacks. The replica goyard bag world has changed. What was once a...",
    image: "/blog/blog1.jpg",
    month: "DEC",
    day: "14",
    publishedAt: "2024-12-14",
    readTime: "5 min read",
    content: `
      <h2>The Evolution of Replica Goyard Bags</h2>
      <p>The replica Goyard bag world has undergone a remarkable transformation. What was once considered impossible to replicate with precision has now become a reality through advanced manufacturing techniques and meticulous attention to detail.</p>

      <h2>Craftsmanship That Rivals the Original</h2>
      <p>Our 1:1 Goyard superclone bags feature:</p>
      <ul>
        <li>Premium coated canvas material identical to the original</li>
        <li>Reinforced stitching that withstands daily use</li>
        <li>Authentic hardware plating and engraving</li>
        <li>Perfect weight distribution and balance</li>
      </ul>

      <h2>Quality Assurance Process</h2>
      <p>Each replica Goyard bag undergoes rigorous quality control:</p>
      <ol>
        <li>Material inspection and testing</li>
        <li>Stitching and construction verification</li>
        <li>Hardware authenticity checks</li>
        <li>Final packaging and presentation</li>
      </ol>

      <h2>Why Choose Replica Goyard?</h2>
      <p>Experience the luxury of Goyard craftsmanship at a fraction of the cost. Our replica bags offer the same prestige, durability, and style as the authentic pieces, making luxury fashion accessible to everyone.</p>
    `,
    tags: ["Goyard", "Replica Bags", "Luxury Fashion", "Craftsmanship"]
  },
  {
    id: 2,
    slug: "replica-dior-bag-story",
    title: "Replica Dior Bag — The Real Story Behind Dior Replica Bags, Wallets And Accessories",
    excerpt: "All replica bags — the #1 store for dior superclone bags and luxury replicas. A fake dior bag today is a masterpiece of precision...",
    image: "/blog/blog2.jpg",
    month: "DEC",
    day: "14",
    publishedAt: "2024-12-14",
    readTime: "6 min read",
    content: `
      <h2>The Art of Dior Replication</h2>
      <p>A fake Dior bag today represents the pinnacle of modern manufacturing precision. Gone are the days of obvious counterfeits; today's superclone Dior bags are virtually indistinguishable from their authentic counterparts.</p>

      <h2>Material Excellence</h2>
      <p>Our replica Dior bags utilize:</p>
      <ul>
        <li>Genuine leather alternatives that age beautifully</li>
        <li>High-quality canvas materials</li>
        <li>Premium hardware that doesn't tarnish</li>
        <li>Expert craftsmanship in every stitch</li>
      </ul>

      <h2>Design Accuracy</h2>
      <p>Every detail matters in creating a perfect replica:</p>
      <ol>
        <li>Exact pattern matching</li>
        <li>Precise logo placement and sizing</li>
        <li>Authentic stitching patterns</li>
        <li>Perfect color matching</li>
      </ol>

      <h2>The Dior Legacy Continues</h2>
      <p>Christian Dior's vision of luxury lives on through our meticulously crafted replica bags. Experience the elegance and sophistication of Dior design without the exorbitant price tag.</p>
    `,
    tags: ["Dior", "Replica Bags", "Luxury Accessories", "Fashion"]
  },
  {
    id: 3,
    slug: "chanel-dior-insiders-perspective",
    title: "Replica Chanel & Dior Bags: An Insider's Perspective On Quality And Craftsmanship",
    excerpt: "Replica Chanel & Dior bags: an insider's perspective on quality and craftsmanship. For years, our team of luxury authenticators...",
    image: "/blog/blog3.jpg",
    month: "NOV",
    day: "17",
    publishedAt: "2024-11-17",
    readTime: "7 min read",
    content: `
      <h2>Inside the World of Luxury Replication</h2>
      <p>For years, our team of luxury authenticators and fashion industry veterans has operated at the forefront of replica bag manufacturing. This insider's perspective reveals the meticulous process behind creating Chanel and Dior replicas that stand up to expert scrutiny.</p>

      <h2>The Authentication Challenge</h2>
      <p>Creating replicas that pass authentication requires:</p>
      <ul>
        <li>Deep understanding of original manufacturing techniques</li>
        <li>Access to premium materials and hardware</li>
        <li>Expert craftsmanship and attention to detail</li>
        <li>Continuous quality improvement processes</li>
      </ul>

      <h2>Chanel vs Dior: Different Approaches</h2>
      <p>While both brands demand perfection, their requirements differ:</p>
      <h3>Chanel Characteristics:</h3>
      <ul>
        <li>Quilted leather perfection</li>
        <li>Precise chain strap construction</li>
        <li>Iconic CC logo placement</li>
      </ul>

      <h3>Dior Characteristics:</h3>
      <ul>
        <li>Clean lines and minimalist design</li>
        <li>Superior canvas quality</li>
        <li>Expert hardware finishing</li>
      </ul>

      <h2>Quality That Speaks for Itself</h2>
      <p>Our replica bags don't just look good—they perform exceptionally. The materials, construction, and finishing stand up to daily use, maintaining their luxurious appearance for years to come.</p>
    `,
    tags: ["Chanel", "Dior", "Quality Control", "Luxury Fashion"]
  },
  {
    id: 4,
    slug: "luxury-replica-bags-guide",
    title: "Luxury Replica Bags Guide — What To Look For Before You Buy",
    excerpt: "Learn how material quality, stitching, hardware, and shape all affect the final look and feel of a premium replica handbag...",
    image: "/blog/blog4.jpg",
    month: "NOV",
    day: "08",
    publishedAt: "2024-11-08",
    readTime: "4 min read",
    content: `
      <h2>Essential Quality Indicators</h2>
      <p>When evaluating a luxury replica bag, several key factors determine its quality and longevity. Understanding these elements ensures you make an informed purchase decision.</p>

      <h2>Material Quality</h2>
      <p>The foundation of any great bag is its materials:</p>
      <ul>
        <li><strong>Leather:</strong> Should feel supple yet durable</li>
        <li><strong>Canvas:</strong> Coated evenly without thin spots</li>
        <li><strong>Lining:</strong> Soft, high-quality fabric</li>
        <li><strong>Hardware:</strong> Heavy, well-plated metal components</li>
      </ul>

      <h2>Stitching Excellence</h2>
      <p>Perfect stitching is the hallmark of quality:</p>
      <ul>
        <li>Even stitch spacing and tension</li>
        <li>Reinforced stress points</li>
        <li>No loose threads or fraying</li>
        <li>Consistent color matching</li>
      </ul>

      <h2>Hardware Details</h2>
      <p>Hardware quality affects both function and aesthetics:</p>
      <ul>
        <li>Smooth zipper operation</li>
        <li>Well-aligned magnetic closures</li>
        <li>Engraved logos and branding</li>
        <li>Tarnish-resistant plating</li>
      </ul>

      <h2>Shape and Structure</h2>
      <p>The bag's form is crucial for both style and function:</p>
      <ul>
        <li>Maintains shape when empty</li>
        <li>Proper weight distribution</li>
        <li>Comfortable strap positioning</li>
        <li>Functional pocket placement</li>
      </ul>

      <h2>Making the Right Choice</h2>
      <p>By focusing on these quality indicators, you'll ensure your replica bag provides the luxury experience you deserve at a fraction of the authentic price.</p>
    `,
    tags: ["Replica Guide", "Quality Check", "Buying Tips", "Luxury Bags"]
  },
  {
    id: 5,
    slug: "best-everyday-designer-bags",
    title: "Best Everyday Designer-Inspired Bags For Work, Travel And Weekend Style",
    excerpt: "A closer look at practical designer-inspired bags that combine structure, storage, and timeless styling for daily use...",
    image: "/blog/blog5.jpg",
    month: "OCT",
    day: "29",
    publishedAt: "2024-10-29",
    readTime: "5 min read",
    content: `
      <h2>The Perfect Balance: Style Meets Functionality</h2>
      <p>Finding the right bag for everyday use requires balancing aesthetic appeal with practical functionality. Our curated selection of designer-inspired bags offers timeless style that works for every occasion.</p>

      <h2>Work-Ready Professional Bags</h2>
      <p>For the office and business meetings:</p>
      <ul>
        <li>Structured tote bags with ample storage</li>
        <li>Professional laptop compartments</li>
        <li>Clean lines and neutral colors</li>
        <li>Durable materials that maintain appearance</li>
      </ul>

      <h2>Travel Essentials</h2>
      <p>Designed for comfort and convenience:</p>
      <ul>
        <li>Spacious interiors with organization</li>
        <li>Comfortable strap options</li>
        <li>Weather-resistant materials</li>
        <li>Expandable compartments for flexibility</li>
      </ul>

      <h2>Weekend and Leisure Styles</h2>
      <p>Perfect for casual outings and social events:</p>
      <ul>
        <li>Versatile crossbody designs</li>
        <li>Fun color options and patterns</li>
        <li>Comfortable for all-day wear</li>
        <li>Easy to match with various outfits</li>
      </ul>

      <h2>Timeless Design Principles</h2>
      <p>What makes these bags enduring classics:</p>
      <ol>
        <li>Clean, simple silhouettes</li>
        <li>High-quality materials and construction</li>
        <li>Versatile color palettes</li>
        <li>Functional details that enhance usability</li>
      </ol>

      <h2>Invest in Quality</h2>
      <p>Choosing a well-made designer-inspired bag means investing in a piece that will serve you beautifully for years to come, combining luxury aesthetics with everyday practicality.</p>
    `,
    tags: ["Everyday Bags", "Work Bags", "Travel Bags", "Style Guide"]
  }
];

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.id === parseInt(resolvedParams.id));

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} | Luxury Replica Bags Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.id === parseInt(resolvedParams.id));

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-[#f6f6f6] min-h-screen">
      <div className="sticky top-0 z-50">
        <TopBar />
        <MainStoreHeader />
        <CategoryNav />
      </div>

      <article className="max-w-4xl mx-auto px-4 pt-10 md:pt-14 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-black hover:text-zinc-600">Home</Link>
          <span className="mx-2 text-zinc-400">/</span>
          <Link href="/blog" className="text-black hover:text-zinc-600">Blog</Link>
          <span className="mx-2 text-zinc-400">/</span>
          <span className="text-black">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <time className="text-black" dateTime={post.publishedAt}>
              {post.month} {post.day}, 2024
            </time>
            <span className="text-zinc-400">•</span>
            <span className="text-black">{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-light text-black mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-zinc-200 text-zinc-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(min-width: 768px) 896px, 100vw"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-p:text-black prose-li:text-black prose-strong:text-black"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full"
                >
                  #{tag.toLowerCase().replace(/\s+/g, '')}
                </span>
              ))}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center text-black hover:text-zinc-600 transition"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19 5 12 12 5" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </footer>
      </article>

      <Footer />
    </main>
  );
}