import React from 'react';
import { Globe } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import FooterStrips from './FooterStrips';
import type { LanguageType } from '../../types/index';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const currentLanguage = i18n.resolvedLanguage ?? 'en';

  return (
    <footer className="bg-gray-900 text-white">
      <FooterStrips />
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/images/taal-seal-192.webp"
                alt="Official seal of the Municipality of Taal"
                width={56}
                height={56}
                className="mr-3 h-14 w-14"
              />

              <div>
                <div className="font-bold">{t('site_name')}</div>
                <div className="text-xs text-gray-300">
                  {t('footer.tagline')}
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{t('footer.subText')}</p>
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.key}>
              <h3 className="text-lg font-bold mb-4">
                {t(`footer.sections.${section.key}`, {
                  defaultValue: section.title,
                })}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.key}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {t(`footer.links.${link.key}`, {
                        defaultValue: link.label,
                      })}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 flex flex-col items-center gap-3 md:mb-0 md:flex-row md:gap-6">
              <p className="text-gray-300 text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{t('footer.language')}</span>
                <select
                  value={currentLanguage}
                  onChange={e =>
                    i18n.changeLanguage(e.target.value as LanguageType)
                  }
                  className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-sm text-gray-200 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
                >
                  {Object.entries(LANGUAGES).map(([code, lang]) => (
                    <option key={code} value={code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {/* <a
                href="/privacy"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Terms of Use
              </a> */}
              <a
                href="https://bettergov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {t('footer.bettergov')}
              </a>
              <a
                href="https://github.com/rambaldoz/bettertaalbatangas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {t('footer.contributeGithub')}
              </a>
              <Link
                to="/sitemap"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                {t('footer.sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
