import { useEffect } from 'react';
import { useLocation } from 'react-router';

// On navigation, go to the top of the page, or to the section named in the
// URL hash (e.g. /contact#report) once it has rendered.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
