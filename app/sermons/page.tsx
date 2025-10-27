import Sermons from '../../src/views/Sermons/Sermons';
import { generateMetadata as generateMeta } from '../../src/lib/seo';

export const metadata = generateMeta('sermons');

export default function SermonsPage() {
  return <Sermons />;
}
