import Link from "next/link";
import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why MGO Ratings Matter for Your Health",
    excerpt: "Discover the science behind Methylglyoxal and how it differentiates Manuka from regular honey.",
    date: "May 10, 2026",
    author: "Dr. Amy Wells",
    readTime: "5 min read",
    image: "/assets/products/4.jpeg",
    slug: "why-mgo-ratings-matter"
  },
  {
    id: 2,
    title: "5 Ways to Use Manuka Honey in Your Skincare Routine",
    excerpt: "From face masks to spot treatments, learn why Manuka is a beauty editor's best kept secret.",
    date: "May 8, 2026",
    author: "Sarah Jenkins",
    readTime: "4 min read",
    image: "/assets/products/3.jpeg",
    slug: "manuka-skincare-routine"
  },
  {
    id: 3,
    title: "The Truth About Cold Extraction",
    excerpt: "Why heat is the enemy of raw honey and how our process preserves nature's vital enzymes.",
    date: "May 5, 2026",
    author: "Marcus Thorne",
    readTime: "6 min read",
    image: "/assets/products/WhatsApp Image 2026-05-10 at 5.26.08 AM.jpeg",
    slug: "truth-about-cold-extraction"
  }
];

export default function BlogPage() {
  return (
    <div className="py-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-20">
           <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs">Wellness Blog</span>
           <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-[1.1]">
             Latest <span className="text-amber-500">Insights</span>
           </h1>
           <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
             Explore the latest research, recipes, and wellness tips from the world of Australian Manuka.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {blogPosts.map((post) => (
             <article key={post.id} className="glass-panel rounded-[2.5rem] overflow-hidden group flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                   <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply" />
                   <div className="absolute top-4 left-4">
                      <span className="bg-void/80 backdrop-blur-md text-amber-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Nutrition
                      </span>
                   </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow gap-6">
                   <div className="flex items-center gap-4 text-[10px] text-text-muted uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> By {post.author}</span>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-display font-bold text-text-primary group-hover:text-amber-500 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                   </div>

                   <Link href={`/blog/${post.slug}`} className="mt-auto flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
             </article>
           ))}
        </div>
      </div>
    </div>
  );
}
