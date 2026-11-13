import { ArrowUpRight } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { LocalizedInfoPage } from '../../components/layout/InfoPage';
import { CONTACT_EMAIL, REPORT_FORM_URL } from '../../data/portal';

// Text: portal.contact in public/locales/<lang>/common.json
export default function Contact() {
  const { t } = useTranslation('common');
  const form = REPORT_FORM_URL ? (
    <p>
      <a
        href={REPORT_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="!no-underline inline-flex items-center gap-2 rounded-lg bg-secondary-600 px-5 py-3 font-bold !text-white hover:bg-secondary-700"
      >
        {t('portal.contact.openForm')}
        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
      </a>
    </p>
  ) : (
    <p className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <Trans
        i18nKey="portal.contact.formSoon"
        components={{ strong: <strong /> }}
      />
    </p>
  );
  return (
    <LocalizedInfoPage
      page="contact"
      slots={{ form }}
      flags={{ email: !!CONTACT_EMAIL }}
    />
  );
}
