import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    language: z.enum(['en', 'zh']),
    seoTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    h1: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.enum([
      'Cost & Planning',
      'Import & Shipping',
      'Manufacturing & Quality',
      'Installation & Technical',
      'Supplier Selection',
      'Materials & Components',
    ]),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    author: z.string().default('ZhongSai Steel Structure Editorial Team'),
    publishedAt: z.string().optional(),
    updatedAt: z.string().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    translationKey: z.string().optional(),
    alternateSlug: z.string().optional(),
    relatedProducts: z.array(z.string()).optional(),
    relatedComponents: z.array(z.string()).optional(),
    ctaType: z.enum([
      'send-drawings',
      'send-project-requirements',
      'discuss-project',
      'view-manufacturing',
      'view-export-process',
      'view-components',
      'none',
    ]).default('send-project-requirements'),
    ctaText: z.string().optional(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
