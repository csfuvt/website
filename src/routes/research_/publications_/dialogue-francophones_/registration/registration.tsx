import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KTitle } from '../../../../-components/KTitle/KTitle';
import styles from './registration.module.css';

export const RegistrationPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData);

    console.log('Form data being sent:', JSON.stringify(formProps));
    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting form:', errorData);
        alert(`Failed to send email: ${errorData.message}`);
      } else {
        alert('Email sent successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div>
      <KBanner label="Dialogue Francophones 2024 - Fișa de înscriere" />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <KTitle label="Fișa de înscriere" />
          <br />

          <form className={styles.form} onSubmit={handleSubmit}>
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
                placeholder="ex. cadru didactic, cercetător, doctorand"
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
                <option value="Selecteaza">Selectează</option>

                <option value="Literatura franceza si francofona">
                  Literatură franceză şi francofonă
                </option>
                <option value="Lingvistica">Lingvistică</option>
                <option value="Didactica">Didactică</option>
                <option value="Traductologie">Traductologie</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="titlu-comunicare">
                Titlul lucrării (în limba franceză)*
              </label>
              <textarea
                id="titlu-comunicare"
                name="titlu-comunicare"
                placeholder="(Introduceți titlul lucrării...)"
                required></textarea>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="titlu-comunicare">
                Titlul lucrării (în limba engleză)*
              </label>
              <textarea
                id="titlu-comunicare"
                name="titlu-comunicare"
                placeholder="(Introduceți titlul lucrării...)"
                required></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rezumat">Rezumat (în limba franceză)*</label>
              <textarea
                id="rezumat"
                name="rezumat"
                placeholder="(Introduceți rezumatul...)"
                required></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rezumat">Rezumat (în limba engleză)*</label>
              <textarea
                id="rezumat"
                name="rezumat"
                placeholder="(Introduceți rezumatul...)"
                required></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie">
                5 cuvinte-cheie (în limba franceză)*
              </label>
              <textarea
                id="cuvinte-cheie"
                name="cuvinte-cheie"
                placeholder="(Introduceți cuvintele-cheie)"
                required></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie">
                5 cuvinte-cheie (în limba engleză)*
              </label>
              <textarea
                id="cuvinte-cheie"
                name="cuvinte-cheie"
                placeholder="(Introduceți cuvintele-cheie...)"
                required></textarea>
            </div>

            {/*
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
            */}

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
  '/research/publications/dialogue-francophones/registration/registration'
)({
  component: RegistrationPage,
});

export default RegistrationPage;
