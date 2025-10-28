import Home from '../src/views/Home/Home';
import { generateMetadata as generateMeta, generateChurchSchema } from '../src/lib/seo';
import Script from 'next/script';

export const metadata = generateMeta('home');

export default function HomePage() {
  const churchSchema = generateChurchSchema();

  return (
    <>
      <Script
        id="church-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchSchema) }}
      />
      <Home />
    </>
  );
}
