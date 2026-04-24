import { useEffect, useRef } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { getSiteTranslateLang } from '../../../siteTranslation.ts';
import {
  clearDeepLHandledTextNodes,
  translatePendingSiteDom,
} from '../../../deeplDomTranslate.ts';

/**
 * După randare: traduce tot ce e vizibil, apoi la mutații DOM (modale, descrieri deschise)
 * traduce doar nodurile noi — portalurile Ant sunt incluse în deeplDomTranslate.
 */
export function SiteTranslationRunner() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const generation = useRef(0);

  useEffect(() => {
    const lang = getSiteTranslateLang();
    document.documentElement.lang = lang === 'ro' ? 'ro' : lang;

    if (lang === 'ro') return;

    const id = ++generation.current;
    const timer = window.setTimeout(() => {
      if (id !== generation.current) return;
      clearDeepLHandledTextNodes();
      void (async () => {
        try {
          await translatePendingSiteDom(lang);
        } catch (err) {
          console.error('Traducere DeepL eșuată:', err);
        }
      })();
    }, 380);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    if (getSiteTranslateLang() === 'ro') return;

    let debounce: ReturnType<typeof setTimeout>;

    const schedule = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        const lang = getSiteTranslateLang();
        if (lang === 'ro') return;
        void translatePendingSiteDom(lang).catch(err => {
          console.error('Traducere DeepL (conținut nou):', err);
        });
      }, 450);
    };

    // Fără characterData: schimbările de text făcute de traducere nu redeclanșează observerul
    // (altfel apare un val de cereri duplicate).
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      window.clearTimeout(debounce);
    };
  }, [pathname]);

  return null;
}
