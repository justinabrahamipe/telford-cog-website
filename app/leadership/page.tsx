import Leadership from '../../src/views/Leadership/Leadership';
import { generateMetadata as generateMeta } from '../../src/lib/seo';

export const metadata = generateMeta('leadership');

export default function LeadershipPage() {
  return <Leadership />;
}
