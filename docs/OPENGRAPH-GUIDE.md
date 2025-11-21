# OpenGraph Images - Guía de Implementación

## Sistema Automático de OG Images

Este proyecto utiliza un sistema **config-driven** para generar automáticamente imágenes de OpenGraph (OG) para redes sociales (Facebook, LinkedIn, Twitter, WhatsApp).

---

## 📋 Para Productos (100% Automático)

### ✅ **NO REQUIERE CONFIGURACIÓN**

El sistema automáticamente:
1. Detecta `product.images[0]` del producto
2. Usa la imagen del producto como OG image
3. Si no hay imagen, genera diseño profesional con nombre/descripción
4. Busca en `mockProducts` y `SanMar API` automáticamente

**Ejemplo:**
```typescript
// Producto en mockData.ts
{
  id: 'nuevo-producto-123',
  name: 'Camiseta Personalizada',
  images: ['/images/products/camiseta.jpg'], // ← Se usa automáticamente
  // ...
}
```

**Resultado:** OG image automática usando `camiseta.jpg`

---

## 🎯 Para Páginas Estáticas (1 Línea de Config)

### Paso 1: Añadir Configuración

Edita `src/lib/og/config.ts` y añade tu ruta:

```typescript
export const OG_ROUTES: Record<string, OGConfig> = {
  // ... rutas existentes
  
  '/tu-nueva-pagina': {
    route: '/tu-nueva-pagina',
    template: 'hero-image',  // o 'text-gradient'
    title: 'Título para OG',
    subtitle: 'Subtítulo opcional',
    image: '/images/tu-nueva-pagina-hero.png'  // Ruta de la imagen hero
  },
};
```

### Paso 2: Crear Archivo OG Image

Crea `src/app/tu-nueva-pagina/opengraph-image.tsx`:

```typescript
import { ImageResponse } from 'next/og';
import { getOGConfig } from '@/lib/og/config';
import { BaseOGLayout } from '@/lib/og/templates';

export const runtime = 'edge';
export const revalidate = 86400; // 24 hours ISR
export const alt = 'Título descriptivo para SEO';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function TuPaginaOGImage() {
  const config = getOGConfig('/tu-nueva-pagina');

  if (config.template === 'hero-image' && config.image) {
    const imageUrl = new URL(config.image, process.env.NEXT_PUBLIC_SITE_URL || 'https://www.v7mpc.com');
    const imageData = await fetch(imageUrl).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        // @ts-ignore
        <img src={imageData} width="1200" height="630" style={{ objectFit: 'cover' }} />
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <BaseOGLayout
        title={config.title}
        subtitle={config.subtitle}
        badges={config.badges}
      />
    ),
    { ...size }
  );
}
```

### Paso 3: ¡Listo!

El sistema automáticamente:
- ✅ Genera la OG image en build time
- ✅ Cachea en edge por 24 horas (ISR)
- ✅ Optimiza para WhatsApp (JPEG, <8MB)
- ✅ Añade meta tags automáticamente

---

## 🎨 Templates Disponibles

### 1. `hero-image` (Recomendado)
Usa la imagen hero real de la página:

```typescript
{
  template: 'hero-image',
  image: '/images/about/hero.png'
}
```

**Resultado:** Muestra la imagen hero directamente (como foto de producto)

### 2. `text-gradient` (Para páginas sin imagen hero)
Genera diseño con gradiente y texto:

```typescript
{
  template: 'text-gradient',
  title: 'Servicios Profesionales',
  subtitle: 'Soluciones personalizadas para tu negocio',
  badges: ['Calidad', 'Garantía', 'Soporte 24/7']
}
```

**Resultado:** Diseño profesional con gradiente, título y badges

---

## 📏 Especificaciones Técnicas

### Dimensiones Requeridas
- **Tamaño:** 1200x630 pixels (estándar OpenGraph)
- **Formato:** JPEG (mejor compatibilidad WhatsApp)
- **Peso máximo:** <8MB (Facebook), <5MB (Twitter)

### Formatos Soportados
- ✅ `.jpg` / `.jpeg` (recomendado para WhatsApp)
- ✅ `.png` (si necesitas transparencia)
- ✅ `.gif` (no recomendado)

### Caché y Performance
- **ISR:** 24 horas (`revalidate = 86400`)
- **Runtime:** Edge (máxima velocidad global)
- **CDN:** Automático con Vercel

---

## 🔍 Ejemplos Reales del Proyecto

### Página con Hero Image
```typescript
// lib/og/config.ts
'/about': {
  route: '/about',
  template: 'hero-image',
  title: 'About V7MPC - Professional Custom Products',
  subtitle: 'Family-owned business delivering quality products since 1999',
  image: '/images/about/hero.png'
}
```

### Página con Diseño Generado
```typescript
// lib/og/config.ts
'/products': {
  route: '/products',
  template: 'text-gradient',
  title: 'Professional Products Catalog',
  subtitle: 'Custom Apparel, Promotional Items & Recognition Solutions',
  badges: ['Custom Printing', 'Bulk Orders', 'Quality Guaranteed']
}
```

---

## 🧪 Testing

### Verificar OG Image en Desarrollo
```bash
npm run dev
```

Visita: `http://localhost:3000/tu-ruta/opengraph-image`

### Verificar en Build
```bash
npm run build
```

Busca en output: `ƒ /tu-ruta/opengraph-image`

### Probar en Redes Sociales

**Facebook Debugger:**
https://developers.facebook.com/tools/debug/

**LinkedIn Inspector:**
https://www.linkedin.com/post-inspector/

**Twitter Card Validator:**
https://cards-dev.twitter.com/validator

**WhatsApp:**
- Enviar URL a contacto de prueba
- Verificar preview de la imagen

---

## ❌ Errores Comunes

### 1. "Image not found" en OG
**Problema:** Ruta de imagen incorrecta en config
**Solución:** Verificar que la imagen existe en `/public/images/...`

```typescript
// ❌ Incorrecto
image: 'images/hero.png'  // Falta '/'

// ✅ Correcto
image: '/images/hero.png'
```

### 2. OG image no se actualiza
**Problema:** Caché del navegador o red social
**Solución:** 
- Limpiar `.next` folder: `Remove-Item -Recurse -Force .next`
- Rebuild: `npm run build`
- Usar debuggers de redes sociales para forzar refresh

### 3. Build falla en opengraph-image.tsx
**Problema:** Import o sintaxis incorrecta
**Solución:** Copiar un archivo existente como template

---

## 🚀 Despliegue

### Vercel (Automático)
```bash
git push
```

Vercel automáticamente:
1. Genera todas las OG images en build time
2. Cachea en edge locations globalmente
3. Sirve con headers optimizados

### Verificación Post-Deploy
1. Visitar: `https://www.v7mpc.com/tu-ruta/opengraph-image`
2. Debe mostrar la imagen generada
3. Probar en WhatsApp/Facebook

---

## 📚 Recursos

- [Next.js OG Image Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Vercel OG](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
- [OpenGraph Protocol](https://ogp.me/)

---

## 💡 Tips

1. **Usa siempre hero images reales** cuando sea posible (mejor engagement)
2. **Añade alt text descriptivo** para accesibilidad
3. **Prueba en WhatsApp** antes de deploy (es el más restrictivo)
4. **Mantén config.ts ordenado** alfabéticamente por ruta
5. **Reutiliza opengraph-image.tsx** - copia de páginas existentes

---

## 🔄 Changelog

### v1.0.0 (2025-01-20)
- ✅ Sistema automático implementado
- ✅ Config centralizado en `lib/og/config.ts`
- ✅ Templates reutilizables en `lib/og/templates.tsx`
- ✅ ISR con 24 horas de caché
- ✅ Soporte automático para productos
- ✅ Reducción de código duplicado 90%

---

**¿Preguntas?** Consulta los archivos existentes en `src/app/*/opengraph-image.tsx` como referencia.
