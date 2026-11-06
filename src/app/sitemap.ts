import type {MetadataRoute} from 'next';
import {getBlogData,origin} from '@/lib/blog';
export const revalidate=300;
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const {posts}=await getBlogData();return [{url:origin,lastModified:new Date(),changeFrequency:'weekly',priority:1},{url:`${origin}/blog`,changeFrequency:'weekly',priority:0.8},...posts.map(p=>({url:`${origin}/blog/${p.slug}`,lastModified:new Date(p.publishedAt)}))]}
