import { LocalizedInfoPage } from '../../components/layout/InfoPage';
import { POLICIES_UPDATED } from '../../data/portal';

// Text: portal.privacy in public/locales/<lang>/common.json
export default function Privacy() {
  return <LocalizedInfoPage page="privacy" updated={POLICIES_UPDATED} />;
}
