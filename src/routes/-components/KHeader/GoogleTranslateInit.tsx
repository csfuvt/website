import { useEffect } from 'react';
import { initGoogleTranslateWidget } from '../../../googleTranslate.ts';

let translateScriptRequested = false;

/**
 * Încarcă script-ul Google și inițializează widget-ul ascuns;
 * traducerea efectivă pornește din cookie-ul `googtrans` după reload.
 */
export function GoogleTranslateInit() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      initGoogleTranslateWidget();
    };

    if (window.google?.translate) {
      initGoogleTranslateWidget();
      return;
    }

    if (translateScriptRequested) {
      return;
    }
    translateScriptRequested = true;

    const script = document.createElement('script');
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
