import { createFileRoute } from '@tanstack/react-router';
import { KRedTitle } from '../../-components/KRedTitle/KRedTitle';
import { KTextField } from '../../-components/KTextField/KTextField';
import styles from '../round-tables/RoundTables.module.css';
import facebook from '../../../../public/logo-facebook.png';
import book from '../../../../public/book.png';
import { KBanner } from '../../-components/KBanner/KBanner';

const phdThesesPage = () => {
  return (
    <div>
      <KBanner label="SUSȚINERI DE TEZE DOCTORALE" />
      <div className={styles.page}>
        <div className={styles.section}>
          <KRedTitle label_title="Traduceri, traducători, mentalități: contribuții la studiul relațiilor româno-franceze în secolele al XVIII-lea-al XIX-lea" />
          <KTextField
            label_title="Doctorand:"
            label_text="Raluca Corina Radac (Baciu)"
          />
          <KTextField
            label_title="Conducător:"
            label_text="Prof.univ.dr. Georgiana Lungu-Badea"
          />
          <KTextField
            label_title="Organizatori:"
            label_text={
              <>
                <a
                  href="https://www.facebook.com/Isttrarom-Translationes/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Centre d'études ISTTRAROM-Translatoiones
                </a>
                , Centrul de studii francofone,
                <a
                  href="https://www.facebook.com/uvtromania/"
                  target="_blank"
                  rel="noopener noreferrer">
                  {' '}
                  Universitatea de Vest din Timișoara
                </a>
              </>
            }
          />
          <KTextField
            label_title="Data susținerii:"
            label_text="29 septembrie 2015, 10:00"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="prof. univ. dr. Alexandru Gafton, prof.univ.dr. Richard Sîrbu, prof. univ. dr. Ludmila Zbanț, conf,univ.dr. Valy Ceia, prof. univ. dr. Mihai Radan, conf.univ.dr. Simona Constantinovici, Daniela Gheltofan, Ileana Neli Eiben, Gina Rus, Bianca Constantinescu, Lucia Udrescu."
          />
          <div className={styles.logo_section}>
            <a href="https://shorturl.at/hnRS5" className={styles.logo}>
              <img src={facebook} />
            </a>
            <a href="https://shorturl.at/ipyHL" className={styles.logo}>
              <img src={book} />
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Sur une visibilité de l’autotraducteur : Dumitru Tsepeneag et Felicia Mihali" />
          <KTextField label_title="Doctorand:" label_text="Eiben Ileana Neli" />
          <KTextField
            label_title="Conducător:"
            label_text="Prof.univ.dr. Georgiana Lungu-Badea"
          />
          <KTextField
            label_title="Organizatori:"
            label_text={
              <>
                <a
                  href="https://www.facebook.com/Isttrarom-Translationes/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Centre d'études ISTTRAROM-Translatoiones
                </a>
                , Centrul de studii francofone,
                <a
                  href="https://www.facebook.com/uvtromania/"
                  target="_blank"
                  rel="noopener noreferrer">
                  {' '}
                  Universitatea de Vest din Timișoara
                </a>
              </>
            }
          />
          <KTextField
            label_title="Data susținerii:"
            label_text="18 decembrie 2014, 14:00"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="prof. univ. dr. Margareta Gyurcsik (UVT), prof. univ. dr. Mariana Ionescu (Huron University College at Western, Canada), prof. univ. dr. Anda Rădulescu (Universitatea din Craiova), conf. univ.dr. Valy Ceia"
          />
          <a href="https://rb.gy/gixuf5" className={styles.logo}>
            <img src={facebook} />
          </a>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Sur une visibilité de l’autotraducteur : Dumitru Tsepeneag et Felicia Mihali" />
          <KTextField
            label_title="Doctorand:"
            label_text="Andreea Monca Gheorghiu"
          />
          <KTextField
            label_title="Conducător:"
            label_text="Prof.univ.dr. Georgiana Lungu-Badea"
          />
          <KTextField
            label_title="Organizatori:"
            label_text="Centrul de studii francofone – DF"
          />
          <KTextField
            label_title="Data susținerii:"
            label_text="29 noiembrie 2014"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="Prof. univ. dr. Lăcrămioara Petrescu (UAIC), prof. univ. dr. Cecilia Condei (Craiova), conf. univ. dr. Vasile Popovici (UVT), prof. univ.dr. Otilia Hedeșan (UVT), prof. univ. dr. Hortensia Pârlog (UVT)"
          />
          <a href="https://rb.gy/dy2fyz" className={styles.logo}>
            <img src={book} />
          </a>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Sur une visibilité de l’autotraducteur : Dumitru Tsepeneag et Felicia Mihali" />
          <KTextField label_title="Doctorand:" label_text="Eiben Ileana Neli" />
          <KTextField
            label_title="Conducător:"
            label_text="Prof.univ.dr. Georgiana Lungu-Badea"
          />
          <KTextField
            label_title="Organizatori:"
            label_text="Centre d'études ISTTRAROM-Translationes, Centrul de studii francofone, Universitatea de Vest din Timișoara"
          />
          <KTextField
            label_title="Data susținerii:"
            label_text="18 decembrie 2014, 14:00"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="prof. univ. dr. Margareta Gyurcsik (UVT), prof. univ. dr. Mariana Ionescu (Huron University College at Western, Canada), prof. univ. dr. Anda Rădulescu (Universitatea din Craiova), conf. univ.dr. Valy Ceia"
          />
          <a href="https://rb.gy/gixuf5" className={styles.logo}>
            <img src={facebook} />
          </a>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Structures de l’imaginaire dans l’œuvre de Michel Tournier" />
          <KTextField
            label_title="Doctorand:"
            label_text="Luciana Penteliuc-Cotoşman"
          />
          <KTextField
            label_title="Conducător:"
            label_text="Prof.univ.dr. Livius CIOCÂRLIE"
          />
          <KTextField label_title="Data susținerii:" label_text="2005" />
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="L'Image recurrente de la route chez trois écrivains roumains d'expression française: Tristan Tzara, Benjamin Fondane et Ilarie Voronca" />
          <KTextField label_title="Doctorand:" label_text="Ecaterina Grün" />
          <KTextField
            label_title="Conducători:"
            label_text="prof. univ. dr. Livius Ciocârlie, UVT
       prof. univ.dr. Alain Vuillemin Universitatea d’Artois, Arras, Franța"
          />
          <KTextField label_title="Data susținerii:" label_text="2002" />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/events/phd-theses/')({
  component: phdThesesPage,
});
