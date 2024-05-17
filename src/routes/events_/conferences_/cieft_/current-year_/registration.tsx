import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KTitle } from '../../../../-components/KTitle/KTitle';
import styles from './registration.module.css';

export const RegistrationPage = () => {
  return (
    <div>
      <KBanner label="CIEFT 2025 - Fișa de înscriere" />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <KTitle label="Fișa de înscriere" />
          <br />

          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nume">Nume*</label>
              <input
                type="text"
                id="nume"
                name="nume"
                placeholder="ex. Popescu"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="prenume">Prenume*</label>
              <input
                type="text"
                id="prenume"
                name="prenume"
                placeholder="ex. Ion"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="titlu-academic">
                Titlul academic și științific*
              </label>
              <input
                type="text"
                id="titlu-academic"
                name="titlu-academic"
                placeholder="ex. profesor, cercetător, doctorand"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="afiliere">Afiliera instituțională*</label>
              <input
                type="text"
                id="afiliere"
                name="afiliere"
                placeholder="ex. universitate, institut, centru de cercetare"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail*</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ex. universitate, institut, centru de cercetare"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sectiune">Secțiunea*</label>
              <select id="sectiune" name="sectiune" required>
                <option value="">Selectează</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="titlu-comunicare">Titlul comunicării*</label>
              <textarea
                id="titlu-comunicare"
                name="titlu-comunicare"
                placeholder="(în limba comunicării și în limba engleză)"
                required></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rezumat">Rezumat*</label>
              <textarea
                id="rezumat"
                name="rezumat"
                placeholder="(în limba comunicării și în limba engleză)"
                required></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie">5 cuvinte-cheie*</label>
              <textarea
                id="cuvinte-cheie"
                name="cuvinte-cheie"
                placeholder="(în limba comunicării și în limba engleză)"
                required></textarea>
            </div>
            <div className={styles.formGroup}>
              <label>Prezentare cu video-proiector*</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="video-proiector"
                    value="da"
                    required
                  />{' '}
                  Da
                </label>
                <label>
                  <input
                    type="radio"
                    name="video-proiector"
                    value="nu"
                    required
                  />{' '}
                  Nu
                </label>
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/events/conferences/cieft/current-year/registration'
)({
  component: RegistrationPage,
});

export default RegistrationPage;
