import { createFileRoute } from '@tanstack/react-router'
import { KBanner } from '../../../../-components/KBanner/KBanner'
import styles from './registration.module.css'
import { KTitle } from '../../../../-components/KTitle/KTitle'
import WordsCounter from '../../../../-components/WordsCounter/WordsCounter'
import { BASE_URL } from '../../../../../constants.ts'

export const Route = createFileRoute(
  '/events_/conferences_/francophones-studies_/current-year_/registration',
)({
  component: RegistrationPage,
})

function RegistrationPage() {
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
      <KBanner label="COLOCVIUL STUDENȚESC DE STUDII FRANCOFONE 2024 - Fișa de înscriere" />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <KTitle label="Fișa de înscriere" />
          <br />

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="hidden"
              id="title"
              name="title"
              value="COLOCVIUL STUDENȚESC DE STUDII FRANCOFONE 2024 - Fișa de înscriere"
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
              <label htmlFor="ciclul-de-studii">Ciclu de studii*</label>
              <select id="ciclul-de-studii" name="ciclul-de-studii" required>
                <option value="Selecteaza">Selectează</option>

                <option value="Licență">Licență</option>
                <option value="Master">Master</option>
                <option value="Doctorat">Doctorat</option>
                <option value="Postdoctorat">Postdoctorat</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="an-de-studii">An de studii*</label>
              <select id="an-de-studii" name="an-de-studii" required>
                <option value="Selecteaza">Selectează</option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="afiliere-institutionala">
                Afiliera instituțională*
              </label>
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
                placeholder="ex. ion.popescu@gmail.com"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sectiune">Secțiunea*</label>
              <select id="sectiune" name="sectiune" required>
                <option value="Selecteaza">Selectează</option>

                <option value="Literatură franceză și francofonă">
                  Literatură franceză şi francofonă
                </option>
                <option value="Lingvistica">Lingvistică</option>
                <option value="Cultură şi civilizaţie franceză">
                  Cultură şi civilizaţie franceză
                </option>
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
                limit={25}
                placeholder="(Introduceți titlul lucrării...)"
              ></WordsCounter>

              {/*
              <textarea
                id="titlu-lucrare-in-franceza"
                name="titlu-lucrare-in-franceza"
                placeholder="(Introduceți titlul lucrării...)"
                required></textarea>*/}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rezumat-in-franceza">
                Rezumat (în limba franceză)*
              </label>
              <WordsCounter
                id="rezumat-in-franceza"
                name="rezumat-in-franceza"
                limit={300}
                placeholder="(Introduceți rezumatul...)"
              ></WordsCounter>

              {/*<textarea
                id="rezumat-in-franceza"
                name="rezumat-in-franceza"
                placeholder="(Introduceți rezumatul...)"
                required></textarea>*/}
            </div>

            {/*
            <div className={styles.formGroup}>
              <label htmlFor="rezumat">Rezumat (în limba engleză)*</label>
              
              <textarea
                id="rezumat"
                name="rezumat"
                placeholder="(Introduceți rezumatul...)"
                required></textarea>
            </div>
*/}
            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie-in-franceza">
                3 cuvinte-cheie (în limba franceză)*
              </label>
              <textarea
                id="cuvinte-cheie-in-franceza"
                name="cuvinte-cheie-in-franceza"
                placeholder="(Introduceți cuvintele-cheie)"
                required
              ></textarea>
            </div>
            {/*
            <div className={styles.formGroup}>
              <label htmlFor="cuvinte-cheie">5 cuvinte-cheie (în limba engleză)*</label>
              <textarea
                id="cuvinte-cheie"
                name="cuvinte-cheie"
                placeholder="(Introduceți cuvintele-cheie...)"
                required></textarea>
            </div>
        */}

            <div className={styles.formGroup}>
              <label htmlFor="nume-cadru-didactic-coordonator">
                Nume cadru didactic coordonator*
              </label>
              <input
                type="text"
                id="nume-cadru-didactic-coordonator"
                name="nume-cadru-didactic-coordonator"
                placeholder="ex. Pop"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="prenume-cadru-didactic-coordonator">
                Prenume cadru didactic coordonator*
              </label>
              <input
                type="text"
                id="prenume-cadru-didactic-coordonator"
                name="prenume-cadru-didactic-coordonator"
                placeholder="ex. Andrei"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="titlu-academic-cadru-didactic-coordonator">
                Titlu academic cadru didactic coordonator*
              </label>
              <input
                type="text"
                id="titlu-academic-cadru-didactic-coordonator"
                name="titlu-academic-cadru-didactic-coordonator"
                placeholder="ex. lector universitar, conferențiar universitar doctor"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="afiliere-institutionala-cadru-didactic-coordonator">
                Afiliera instituțională cadru didactic coordonator*
              </label>
              <input
                type="text"
                id="afiliere-institutionala-cadru-didactic-coordonator"
                name="afiliere-institutionala-cadru-didactic-coordonator"
                placeholder="ex. universitate, institut, centru de cercetare"
                required
              />
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
              <div className={styles.formGroup}>
                <label className={styles.inlineCheckboxLabel}>
                  <input type="checkbox" id="receiveCopy" name="receiveCopy" />{' '}
                  Doresc să primesc o copie a e-mail-ului
                </label>
              </div>
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
