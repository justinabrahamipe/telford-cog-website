import About from '../../src/views/About/About';
import { generateMetadata as generateMeta } from '../../src/lib/seo';

export const metadata = generateMeta('about');

export default function AboutPage() {
  return <About />;
}
