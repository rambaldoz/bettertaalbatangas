import { useTranslation } from 'react-i18next';

// What volunteers have spent building the site so far, e.g. "3,000".
// Set VITE_BUILD_COST in .env.local; leave empty to show the volunteer line.
const BUILD_COST = import.meta.env.VITE_BUILD_COST as string | undefined;

// Yellow "cost to the people" strip above the footer (as on
// betterbinangonan.org). Error reports go through the Contact page form.
export default function FooterStrips() {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="bg-accent-400 py-2.5 text-center text-sm text-primary-950">
        {BUILD_COST ? (
          <>
            {t('footer.costBuild')}{' '}
            <span className="font-bold">₱{BUILD_COST}</span>.{' '}
          </>
        ) : (
          <>{t('footer.costVolunteers')} </>
        )}
        {t('footer.costPeople')} <span className="font-bold">₱0</span>.
      </div>
    </>
  );
}
