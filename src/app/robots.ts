import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://pureprompts.net/sitemap.xml',
        host: 'https://pureprompts.net',
    };
}
