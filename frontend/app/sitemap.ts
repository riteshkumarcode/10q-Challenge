import { MetadataRoute } from 'next';
import { MOCK_COURSES, MOCK_BLOGS, MOCK_EXAMS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://10qchallenge.in';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/course-all`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic Course routes
  const courseRoutes: MetadataRoute.Sitemap = MOCK_COURSES.map((course) => ({
    url: `${baseUrl}/course-detail/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic Blog routes
  const blogRoutes: MetadataRoute.Sitemap = MOCK_BLOGS.map((blog) => ({
    url: `${baseUrl}/blog-detail/${blog.slug}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Exam routes
  const examRoutes: MetadataRoute.Sitemap = MOCK_EXAMS.map((exam) => ({
    url: `${baseUrl}/exam/${exam.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...examRoutes];
}
