import { createFileRoute } from '@tanstack/react-router'
import { KBanner } from '../../../../-components/KBanner/KBanner'
import { KTitle } from '../../../../-components/KTitle/KTitle'
import styles from './registration.module.css'
import WordsCounter from '../../../../-components/WordsCounter/WordsCounter'
import { BASE_URL } from '../../../../../constants.ts'

export const RegistrationPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formProps = Object.fromEntries(formData)

    formProps.receiveCopy =
      formData.get('receiveCopy') === 'on' ? 'true' : 'false'

    console.log('Form data being sent:', JSON.stringify(formProps))
    try {
      const response = await fetch(BASE_URL + '/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error submitting form:', errorData)
        alert(`Failed to send email: ${errorData.message}`)
      } else {
        alert('Email sent successfully!')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send email')
    }
  }

  return (
    <div>
      <KBanner label="CIEFT 2025 - Fișa de înscriere" />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <KTitle label="Fișa de înscriere" />
          <br />

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="hidden"
              id="title"
              name="title"
              value="CIEFT 2024 - Fișa de înscriere"
            />

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
                id="titlu-academic-si-stiintific"
                name="titlu-academic-si-stiintific"
                placeholder="ex. cadru didactic, cercetător, doctorand"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="afiliere">Afiliera instituțională*</label>
              <input
                type="text"
                id="afiliere-institutionala"
                name="afiliere-institutionala"
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
              <label htmlFor="titlu-lucrare-in-franceza">
                Titlul lucrării (în limba franceză)*
              </label>
              <WordsCounter
                id="titlu-lucrare-in-franceza"
                name="titlu-lucrare-in-franceza"
                placeholder="(Introduceți titlul lucrării...)"
                limit={25}
              ></WordsCounter>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="titlu-lucrare-in-engleza">
                Titlul lucrării (în limba engleză)*
              </label>
              <WordsCounter
                id="titlu-lucrare-in-engleza"
                name="titlu-lucrare-in-engleza"
                placeholder="(Introduceți titlul lucrării...)"
                limit={25}
              ></WordsCounter>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rezumat-in-franceza">
                Rezumat (în limba franceză)*
              </label>
              <WordsCounter
                id="rezumat-in-franceza"
                name="rezumat-in-franceza"
                placeholder="(Introduceți rezumatul...)"
                limit={300}
              ></WordsCounter>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rezumat-in-engleza">
                Rezumat (în limba engleză)*
              </label>
              <WordsCounter
                id="rezumat-in-engleza"
                name="rezumat-in-engleza"
                placeholder="(Introduceți rezumatul...)"
                limit={300}
              ></WordsCounter>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie">
                5 cuvinte-cheie (în limba franceză)*
              </label>
              <textarea
                id="cuvinte-cheie-in-franceza"
                name="cuvinte-cheie-in-franceza"
                placeholder="(Introduceți cuvintele-cheie)"
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie-in-engleza">
                5 cuvinte-cheie (în limba engleză)*
              </label>
              <textarea
                id="cuvinte-cheie-in-engleza"
                name="cuvinte-cheie-in-engleza"
                placeholder="(Introduceți cuvintele-cheie...)"
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label>Prezentare cu video-proiector*</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="prezentare-cu-video-proiector"
                    value="da"
                    required
                  />{' '}
                  Da
                </label>
                <label>
                  <input
                    type="radio"
                    name="prezentare-cu-video-proiector"
                    value="nu"
                    required
                  />{' '}
                  Nu
                </label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.inlineCheckboxLabel}>
                <input type="checkbox" id="receiveCopy" name="receiveCopy" />{' '}
                Doresc să primesc o copie a e-mail-ului
              </label>
            </div>
            <button type="submit" className={styles.submitButton}>
              Trimite
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute(
  '/events_/conferences_/cieft_/current-year_/registration',
)({
  component: RegistrationPage,
})

export default RegistrationPage
