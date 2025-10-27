import Home from '../src/views/Home/Home';
import { generateMetadata as generateMeta, generateChurchSchema } from '../src/lib/seo';
import { StructuredData } from '../src/components/SEO/StructuredData';

export const metadata = generateMeta('home');

export default function HomePage() {
  const churchSchema = generateChurchSchema();

  return (
    <>
      <StructuredData data={churchSchema} />
      <Home />
    </>
  );
}
