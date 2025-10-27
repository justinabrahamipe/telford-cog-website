import Contact from '../../src/views/Contact/Contact';
import { generateMetadata as generateMeta } from '../../src/lib/seo';

export const metadata = generateMeta('contact');

export default function ContactPage() {
  return <Contact />;
}
