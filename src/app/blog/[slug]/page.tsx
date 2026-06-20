import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const blogPosts = {
  "why-mgo-ratings-matter": {
    title: "Why MGO Ratings Matter for Your Bioactive Profile",
    description: "Discover the natural compound Methylglyoxal and how it defines the Amazing Standard of Manuka honey.",
    date: "May 10, 2026",
    author: "Dr. Amy Wells",
    readTime: "5 min read",
    image: "/assets/products/mgo-30.webp",
    paragraphs: [
      "When selecting a premium Manuka honey, the letters 'MGO' are often the first thing you notice on the label. This represents Methylglyoxal, the naturally occurring organic compound responsible for the honey's unique properties. Understanding MGO ratings is essential for choosing the right level of daily support for your personal wellness journey.",
      "Methylglyoxal is formed naturally in the nectar of the Manuka flower (Leptospermum scoparium). In standard honeys, bioactive components can be fragile and easily degraded by heat or light. However, Manuka's MGO concentration is remarkably stable. This ensures that the premium honey preserves its potency from the hive to your home.",
      "Higher MGO ratings indicate a more concentrated bioactive profile. For example, our MGO 30 is ideal for daily wellness support and acts as a delicious natural sweetener. Mid-range options like MGO 263 provide targeted support, while our high-activity reserve grades like MGO 800+ deliver an exceptional concentration of bioactive compounds for serious wellness focus.",
      "Every jar we produce meets our rigorous quality assurance standards. This careful approach ensures that the MGO level stated on the label is precisely what is in the jar. By quality-checking each batch, we maintain the Amazing Standard of purity and consistency.",
      "Integrating Manuka honey into your lifestyle is simple and rewarding. Whether enjoyed straight from the spoon, stirred into warm water, or added to your favorite morning recipe, it provides a premium boost to your wellness routine. Choose a grade that aligns with your specific wellness goals."
    ]
  },
  "manuka-skincare-routine": {
    title: "5 Ways to Use Manuka Honey in Your Skincare Routine",
    description: "From face masks to daily skincare support, learn why Manuka is a beauty editor's best kept secret for a naturally concentrated glow.",
    date: "May 8, 2026",
    author: "Sarah Jenkins",
    readTime: "4 min read",
    image: "/assets/products/mgo-30.webp",
    paragraphs: [
      "Honey has been celebrated for centuries as a natural beauty secret, but premium Manuka honey takes topical application to a new level. With its dense bioactive profile and natural humectant properties, Manuka honey has become a favorite ingredient for clean beauty enthusiasts and skincare professionals alike.",
      "As a natural humectant, Manuka honey draws moisture from the air directly into the skin. This provides deep, long-lasting hydration, helping to plump the skin and restore a youthful, radiant glow. It is particularly effective for those seeking dry skin support or looking to maintain skin suppleness.",
      "One of the most popular ways to experience these benefits is through a simple, single-ingredient face mask. Applying a thin layer of mid-to-high MGO Manuka honey to damp skin for 15-20 minutes allows the bioactive compounds to work their magic. When rinsed off with warm water, the skin feels remarkably soft and refreshed.",
      "Beyond standalone masks, Manuka can be mixed with ground oats for a gentle exfoliating scrub or added to a dab of your nightly moisturizer for enhanced hydration. Its natural properties help soothe the skin barrier, making it an excellent addition to your routine after sun exposure or during harsh winter weather.",
      "When selecting honey for skincare, potency matters. Choosing a scientifically verified honey, such as our MGO 400, ensures that you are applying a high concentration of beneficial compounds. Enhance your daily self-care routine with the pure, wild-sourced power of Australian Manuka."
    ]
  },
  "truth-about-cold-extraction": {
    title: "The Truth About Ethical Harvesting",
    description: "Why heat is the enemy of raw honey and how our wild-sourced process preserves nature's vital enzymes.",
    date: "May 5, 2026",
    author: "Marcus Thorne",
    readTime: "6 min read",
    image: "/assets/products/mgo-30.webp",
    paragraphs: [
      "Not all honey is created equal, and the journey from hive to jar makes all the difference. At Amazing Natures, our ethical harvesting and cold-extraction processes are designed to preserve the delicate, naturally occurring enzymes and bioactive profile of our premium Australian Manuka honey.",
      "Many commercial honeys are subjected to high-temperature pasteurization and ultra-filtration. While this creates a uniform, cheap product, it destroys the vital enzymes and beneficial compounds that make honey a true wellness food. Heat is the ultimate enemy of raw honey, degrading its natural structure.",
      "Our cold-extraction technique ensures the honey is never heated above the natural temperature of the beehive. This slow, careful process preserves the honey's natural integrity. What you receive is a living food, rich in active enzymes and tasting exactly as nature intended in the pristine wilderness.",
      "Ethical harvesting also means prioritizing the health of our bees. We work closely with our apiaries to ensure hive sustainability, leaving plenty of honey for the bees to thrive through the seasons. By respecting our hives and environment, we secure a sustainable future for both the bees and our customers.",
      "By maintaining these strict harvesting and extraction standards, we deliver a product that is scientifically verified and rich in bioactive properties. When you choose Amazing Natures, you are supporting sustainable agriculture and enjoying the purest expression of Australian Manuka honey."
    ]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Amazing Natures Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Amazing Natures`,
      description: post.description,
      images: [{ url: post.image }],
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "why-mgo-ratings-matter" },
    { slug: "manuka-skincare-routine" },
    { slug: "truth-about-cold-extraction" },
  ];
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-[140px] pb-24 px-6 md:pt-36 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <article className="glass-panel p-8 md:p-16 rounded-[3rem] border-amber-700/10">
          <div className="flex items-center gap-4 text-xs text-text-muted uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight mb-8">
            {post.title}
          </h1>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-white p-12 flex items-center justify-center mb-12 border border-amber-900/5">
            <div className="relative w-full h-full max-h-[90%]">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-contain" 
                priority
              />
            </div>
            <div className="absolute top-6 left-6">
              <span className="bg-amber-700/10 backdrop-blur-md text-amber-700 border border-amber-700/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {post.date}
              </span>
            </div>
          </div>

          <div className="prose prose-invert prose-amber max-w-none space-y-6 text-text-secondary text-lg leading-relaxed font-medium">
            {post.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
