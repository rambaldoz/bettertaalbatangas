import { LocalizedInfoPage } from '../../components/layout/InfoPage';
import { POLICIES_UPDATED } from '../../data/portal';

// Text: portal.accessibility in public/locales/<lang>/common.json
export default function Accessibility() {
  return <LocalizedInfoPage page="accessibility" updated={POLICIES_UPDATED} />;
}
