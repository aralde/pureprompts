import { MetadataRoute } from 'next';

const BASE_URL = 'https://pureprompts.net';

export default function sitemap(): MetadataRoute.Sitemap {
    const categories = ['Images', 'Coding', 'General', 'Tactio'];
    const now = new Date();

    const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/?category=${encodeURIComponent(cat)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1,
        },
        ...categoryPages,
    ];
}
