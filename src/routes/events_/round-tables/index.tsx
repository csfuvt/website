import { createFileRoute } from '@tanstack/react-router';
import { KRedTitle } from '../../-components/KRedTitle/KRedTitle';
import { KTextField } from '../../-components/KTextField/KTextField';
import styles from './RoundTables.module.css';
import facebook from '../../../../public/logo-facebook.png';
import camera from '../../../../public/camera.png';
import { KBanner } from '../../-components/KBanner/KBanner';

const RoundTablesPage = () => {
  return (
    <div>
      <KBanner label="MESE ROTUNDE" />
      <div className={styles.page}>
        <div className={styles.section}>
          <KRedTitle label_title="Contactele româno-franceze livrești și non-livrești în Principatele Române" />
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
            label_text="Richard Sîrbu, Mihai Radan, Simona Constantinovici, Raluca Radac Baciu, Ileana Neli Eiben, Bianca Constantinescu, Lucia Udrescu, Diana Moțoc, Mihaela Visky, Georgiana Lungu-Badea"
          />
          <a href="https://shorturl.at/fADPR" className={styles.logo}>
            <img src={facebook} />
          </a>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Traducerea titlurilor. Efecte perlocuționare (in)eficiente" />
          <KTextField
            label_title="Data susținerii:"
            label_text="18 martie 2015"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="Bianca Constantinescu, Simona Constantinovici, Mirela Pop, Luminița Vleja, Georgiana Lungu-Badea, Iulia Cosma, Diana Moțoc. Andreea Gheorghiu, Simona Constantinovici"
          />
          <a href="https://shorturl.at/deqwR" className={styles.logo}>
            <img src={facebook} />
          </a>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="L’Ecriture migrante au Québec. Enjeux identitaires" />
          <KTextField
            label_title="Data susținerii:"
            label_text="13 Octombrie 2014"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="Simona Constantinovici, Iulia Cosma, Neli Ileana Eiben, Valentina Shiryaeva, Georgiana Lungu-Badea, Mirela Pop, Mața Andrei, Lucia Udrescu, Bianca Constantinescu, Daniela Gheltofan"
          />
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Ziua internațională a traducătorului. Autotraducerea (scriitori români de expresie franceză) și terminologia traductologică" />
          <KTextField
            label_title="Data susținerii:"
            label_text="30 Septembrie 2014"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="Simona Constantinovici, Iulia Cosma, Neli Ileana Eiben, Valentina Shiryaeva, Georgiana Lungu-Badea, Mirela Pop, Mața Andrei, Lucia Udrescu, Bianca Constantinescu, Daniela Gheltofan"
          />
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Traducere, autotraducere, retraducere. De la o limbă la alta, de la o mentalitate la alta, de la o cultură la alta" />
          <KTextField
            label_title="Data susținerii:"
            label_text="28 Iunie 2014"
          />
          <KTextField
            label_title="Membri comisiei:"
            label_text="Maria Andrei, Simona Constantinovici, Georgiana Lungu- Badea, Mirela Pop, Mihai Radan, Richard Sârbu, Luminița Cleja, Iulia Cosma, Daniela Gheltofan, Ileana Neli Eiben, Diana Moțoc, Georgeta Rus, Raluca Radac-Baciu"
          />
          <a href="https://shorturl.at/wHJRW" className={styles.logo}>
            <img src={facebook} />
          </a>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="La dimension culturelle de certaines fonctions de la traduction" />
          <KTextField label_title="Data susținerii:" label_text="24 Mai 2014" />
          <KTextField
            label_title="Membri comisiei:"
            label_text="Jean Delisle (Universite d’Ottawa),
      Natalya Gavrilenko, Viviana Augustini Ouafi, Michel Politis, Liliana Foșalău, Thomas Lenz, Laura Folica, Rosa Agost, Monique Nicolas, Eliza Hatzdikis, Andreea Gheorghiu, Iulia Bobăilă, Mihaela Visky, Adina Popa, Luminița Vleja, Ileana Eiben Neli, Adina Tihu, Bianca Constantinescu, Lucia Udrescu, Gina Rus, Alina Pelea, Maria Țenchea, Victor Ivanovici, Diana Moțoc, Cristina Panta, Corina Călinescu, Adelina Stoian"
          />
          <div className={styles.logo_section}>
            <a href="https://shorturl.at/wHJRW" className={styles.logo}>
              <img src={facebook} />
            </a>
            <a
              href="https://www.facebook.com/IsttraromTranslationes/photos/a.703647252983967/863698936978797"
              className={styles.logo}>
              <img src={camera} />
            </a>
            <a
              href="https://www.facebook.com/IsttraromTranslationes/photos/a.703647252983967/863701693645188"
              className={styles.logo}>
              <img src={camera} />
            </a>
          </div>
        </div>

        <div className={styles.section}>
          <KRedTitle label_title="Dumitru Tsepeneag. Les Métamorphoses d’un créateur : écrivain, théoricien, traducteur, cu participarea scriitorului" />
          <KTextField label_title="Data susținerii:" label_text="2006" />
          <KTextField
            label_title="Masă rotundă:"
            label_text="Dumitru ȚEPENEAG, Nicolae BÂRNA, Jenö FARKAS, Marian Victor BUCIU, Margareta GYURCSIK, Georgiana LUNGU BADEA, Laura PAVEL, Ioan SIMUȚ"
          />
          <KTextField
            label_title="Atelier de traducere:"
            label_text="Participă: Dumitru Țepeneag, Jenö Farkas, Margareta Gyurcsik, Nicolae Barna, Marian Buciu, Laura Pavel, Calin Teutisan, Elena Ghita, Andreea Gheorghiu, Georgeta Ciobanu, Mihaela Visky, Neli Eibel, Ilona Balasz, Ilie Minescu, Corina Braga, Carmen Pădure-Blaga.
      Studenți: Andreea Sisak, Raluca Madaras, Moira Tomescu, Flavia Pal, Carmen Sarbescu, Adela Vladu, Ioana Giurginca et Adina Popa.
      Moderator: Georgiana Lungu Badea."
          />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/events/round-tables/')({
  component: RoundTablesPage,
});

export default RoundTablesPage;
