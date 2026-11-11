import { LocalizedInfoPage } from '../../components/layout/InfoPage';
import { POLICIES_UPDATED } from '../../data/portal';

// Text: portal.terms in public/locales/<lang>/common.json
export default function Terms() {
  return <LocalizedInfoPage page="terms" updated={POLICIES_UPDATED} />;
}
