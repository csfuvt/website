import { useMemo, useState } from 'react';
import {
  applySiteLanguage,
  getTranslateTargetFromCookie,
  type SiteTranslateLang,
} from '../../../googleTranslate.ts';
import './LanguageSwitcher.css';

const OPTIONS: { id: SiteTranslateLang; label: string }[] = [
  { id: 'ro', label: 'RO' },
  { id: 'en', label: 'EN' },
  { id: 'fr', label: 'FR' },
];

export function LanguageSwitcher() {
  const initial = useMemo(() => getTranslateTargetFromCookie(), []);
  const [active, setActive] = useState<SiteTranslateLang>(initial);

  const onSelect = (lang: SiteTranslateLang) => {
    if (lang === active) return;
    setActive(lang);
    applySiteLanguage(lang);
  };

  return (
    <div className="lang-switcher notranslate" translate="no">
      <div
        className="lang-switcher__group"
        role="group"
        aria-label="Traducere site: română, engleză, franceză">
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`lang-switcher__btn${active === id ? ' lang-switcher__btn--active' : ''}`}
            onClick={() => onSelect(id)}
            aria-pressed={active === id}
            aria-label={
              id === 'ro'
                ? 'Română'
                : id === 'en'
                  ? 'English (traducere automată)'
                  : 'Français (traduction automatique)'
            }>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
