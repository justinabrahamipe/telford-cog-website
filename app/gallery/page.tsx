import Gallery from '../../src/views/Gallery/Gallery';
import { generateMetadata as generateMeta } from '../../src/lib/seo';

export const metadata = generateMeta('gallery');

export default function GalleryPage() {
  return <Gallery />;
}
