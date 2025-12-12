'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { brands } from '@/data/brands';

export default function ApparelBrandGrid() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Official Brands
          </p>
          <h2 className="text-balance font-primary text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Recognized Apparel{' '}
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Brands
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-sm sm:text-base text-slate-600">
            We work with a curated selection of leading apparel brands to offer reliable, modern garments ready for customization for your business or organization.
          </p>
        </motion.header>

        {/* Grid de marcas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
        >
          {brands.map((brand, index) => (
            <motion.article
              key={brand.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
            >
              <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
                <div className="relative aspect-[4/3] w-full max-w-[170px]">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    fill
                    sizes="(min-width: 1024px) 160px, (min-width: 640px) 33vw, 50vw"
                    className="object-contain transition duration-300 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <span className="sr-only">{brand.name}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
                <h3 className="line-clamp-1 text-[0.9rem] font-semibold text-slate-900">
                  {brand.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                  {brand.description}
                </p>
              </div>

              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="absolute inset-x-0 -bottom-16 h-24 bg-gradient-to-t from-slate-900/5 to-transparent" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Nota inferior */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-xs sm:text-sm text-slate-500"
        >
          If you're looking for another apparel brand, we can add it to your collection upon request.
        </motion.p>
      </div>
    </section>
  );
}
