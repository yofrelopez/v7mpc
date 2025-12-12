import type { Metadata } from 'next';
import CategoryHero from '@/components/products/CategoryHero';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { ApparelSubcategories } from '@/components/apparel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Custom Apparel & Uniforms | V7 Marketplace Corporation',
    description: 'Premium custom apparel and professional uniforms for schools, government, corporations, and organizations. From t-shirts to outerwear, we outfit your team with quality and style.',
    keywords: [
        'custom apparel',
        'professional uniforms',
        'custom t-shirts',
        'corporate polo shirts',
        'team jackets',
        'branded hats',
        'activewear',
        'school uniforms',
        'government uniforms',
        'embroidered apparel'
    ],
    openGraph: {
        type: 'website',
        url: 'https://www.v7mpc.com/apparel',
        title: 'Custom Apparel & Uniforms | V7MPC',
        description: 'Outfit your team with premium custom apparel and professional uniforms',
        images: [
            {
                url: 'https://www.v7mpc.com/images/og/apparel.jpg',
                width: 1200,
                height: 630,
                alt: 'Custom Apparel | V7 Marketplace Corporation',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Custom Apparel & Uniforms | V7MPC',
        description: 'Premium apparel that unites your team',
        images: ['https://www.v7mpc.com/images/og/apparel.jpg'],
    },
};

export default function ApparelPage() {
    // Custom category data for apparel with gradient highlight
    const apparelCategory = {
        id: 'apparel',
        slug: 'apparel',
        name: 'Apparel That Unites',
        highlightText: 'Your Team',
        description: 'Elevate your organization\'s presence with premium uniforms and apparel designed for comfort, performance, and brand consistency. From schools to government offices, our tailored solutions ensure every team looks as professional as the work they do.',
        productCount: 0
    };

    return (
        <div className="flex flex-col">

            {/* Hero Section */}
            <CategoryHero
                category={apparelCategory}
                productCount={0}
                heroImage="/images/products/apparel.png"
                customGradient="from-slate-800 to-slate-900"
                showButtons={false}
                imagePosition="object-right object-center sm:object-center sm:object-[center_75%]"
            />

            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Solutions', href: '/solutions' },
                    { label: 'Corporate Apparel', href: '/apparel', current: true }
                ]}
            />

            {/* Subcategories Section */}
            <ApparelSubcategories />

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-primary text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Outfit Your Team?
                    </h2>
                    <p className="font-accent text-lg text-slate-200 mb-8">
                        Request a custom quote for bulk apparel orders tailored to your organization's needs.
                    </p>
                    <Link href="/quote">
                        <Button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
                            Request a Quote
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
