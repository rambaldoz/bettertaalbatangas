import React, { useState } from 'react';
import { X, Menu, ChevronDown } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import InfoBar from './InfoBar';
import SiteSearch from './SiteSearch';
import EmergencyStrip from './EmergencyStrip';
import ErrorBoundary from '../ui/ErrorBoundary';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t } = useTranslation('common');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Red emergency strip with Taal hotlines */}
      <EmergencyStrip />

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/taal-seal-192.webp"
                alt="Official seal of the Municipality of Taal"
                width={84}
                height={84}
                className="mr-3 h-12 w-12 sm:h-16 sm:w-16 xl:mr-4 xl:h-21 xl:w-21"
              />
              <div>
                <div className="text-base font-bold text-black sm:text-lg xl:text-xl">
                  BetterTaalBatangas.org
                </div>
                <div className="text-xs text-gray-800">
                  {t('site_description')}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center space-x-6 lg:flex xl:space-x-8 xl:pr-24">
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-bold transition-colors"
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-800 group-hover:text-primary-600 transition-colors" />
                  )}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center">
            <SiteSearch
              label={t('navbar.search')}
              className="flex items-center text-gray-700 hover:text-primary-600 font-bold transition-colors"
            />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navy bar: rotating exchange rate and current weather */}
      <ErrorBoundary>
        <InfoBar />
      </ErrorBoundary>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {mainNavigation.map(item => (
            <div key={item.label}>
              {!item.children ? (
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="block px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  {t(`navbar.${item.label.toLowerCase()}`)}
                </Link>
              ) : (
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="w-full flex justify-between items-center px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  {t(`navbar.${item.label.toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeMenu === item.label ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
              )}
              {item.children && activeMenu === item.label && (
                <div className="pl-6 py-2 space-y-1 bg-gray-50">
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      to={child.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <SiteSearch
            label={t('navbar.search')}
            onOpen={closeMenu}
            className="flex w-full items-center px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          />
          <Link
            to="/sitemap"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
