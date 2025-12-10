# API и интеграции

## 📧 Contact Form API

### Endpoint: POST /api/contact

Отправка заявки с формы контактов.

**Request:**
```json
{
  "name": "Иван Иванов",
  "company": "Компания ООО",
  "email": "ivan@example.com",
  "message": "Мне нужна разработка сайта..."
}
```

**Response (Success):**
```json
{
  "status": "success",
  "message": "Заявка отправлена",
  "id": "uuid-1234-5678"
}
```

**Response (Error):**
```json
{
  "status": "error",
  "message": "Ошибка валидации",
  "errors": {
    "email": "Email невалиден"
  }
}
```

### Implementation

```tsx
// components/sections/ContactSection.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  
  if (data.status === 'success') {
    toast.success('Спасибо! Мы скоро свяжемся с вами');
  }
};
```

## 📊 Analytics Integration

### Google Analytics

```tsx
// app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### Vercel Analytics (автоматический)

```tsx
// Встроен в Next.js приложении на Vercel
// https://vercel.com/analytics
```

## 🔔 Email Notifications

### Nodemailer/SendGrid

```bash
npm install nodemailer
# или
npm install @sendgrid/mail
```

```tsx
// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  return transporter.sendMail({ to, subject, html });
}
```

## 💳 Платежи (опционально)

### Stripe Integration

```bash
npm install stripe @stripe/react-js @stripe/js
```

```tsx
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Создание платежной сессии
export async function createPaymentSession(amount: number) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'OdinLab Service',
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
  });
  
  return session.url;
}
```

## 🤖 CMS Integration (Headless)

### Contentful / Sanity

```bash
# Contentful
npm install contentful contentful-management

# Sanity
npm install @sanity/client
```

```tsx
// lib/cms.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});

export async function getPosts() {
  return await client.fetch(`
    *[_type == "post"] {
      _id,
      title,
      slug,
      publishedAt,
      body
    } | order(publishedAt desc)
  `);
}
```

## 🔐 Authentication (опционально)

### NextAuth.js

```bash
npm install next-auth
```

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## 📱 Push Notifications

### Firebase Cloud Messaging

```bash
npm install firebase
```

```tsx
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ...
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
```

## 🗺️ Maps Integration

### Google Maps / Mapbox

```tsx
// components/Map.tsx
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={{ lat: 55.7558, lng: 37.6173 }} // Moscow
        zoom={10}
      >
        <Marker position={{ lat: 55.7558, lng: 37.6173 }} />
      </GoogleMap>
    </LoadScript>
  );
}
```

## 🎥 Video Integration

### Vimeo / YouTube

```tsx
// components/VideoPlayer.tsx
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
});

export default function VideoPlayer() {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      width="100%"
      height="100%"
      controls
    />
  );
}
```

## 🔍 Search Integration

### Algolia / Meilisearch

```bash
npm install algoliasearch
```

```tsx
// lib/algolia.ts
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

export const index = client.initIndex('products');

export async function searchProducts(query: string) {
  return index.search(query);
}
```

## 🌍 Internationalization (i18n)

### next-i18next

```bash
npm install next-i18next
```

```tsx
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },
  ns: ['common', 'home'],
  defaultNS: 'common',
};
```

## 🔗 External APIs

### Базовый пример fetch

```tsx
// lib/api.ts
export async function fetchData(endpoint: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Использование
const data = await fetchData('/services');
```

---

**Версия:** 1.0
**Последнее обновление:** 11 декабря 2025
