export type SiteTranslateLang = 'ro' | 'en' | 'fr';

const STORAGE_KEY = 'csf_site_lang';

export function getSiteTranslateLang(): SiteTranslateLang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'en' || v === 'fr') return v;
  } catch {
    /* ignore */
  }
  return 'ro';
}

export function setSiteTranslateLang(lang: SiteTranslateLang) {
  try {
    if (lang === 'ro') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

/** Salvează limba și reîncarcă pagina (conținut sursă = română din React). */
export function applySiteLanguage(lang: SiteTranslateLang) {
  const cur = getSiteTranslateLang();
  if (cur === lang) return;
  setSiteTranslateLang(lang);
  window.location.reload();
}
