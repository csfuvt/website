import { createFileRoute } from '@tanstack/react-router';
import styles from './HistoryPage.module.css';
import { KBanner } from '../../-components/KBanner/KBanner';
import istoric1 from '../../../../public/Despre_noi/istoric1.jpg';
import istoric2 from '../../../../public/Despre_noi/istoric2.jpg';
import istoric3 from '../../../../public/Despre_noi/istoric3.jpg';

const HistoryPage = () => {
  return (
    <div>
      <KBanner label="ISTORIC" />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <img
            src={istoric1}
            alt="Description of image"
            className={styles.imageBox}
          />
          <div className={styles.textContainer}>
            <div className={styles.title}>Istoric</div>
            <div className={styles.paragraph}>
              <div className={styles.line}>
                <p>
                  Centrul de Studii Francofone, având drept obiect cercetarea în
                  domeniul francofoniei, a fost creat în 1994 la iniţiativa
                  Prof. univ. dr. Margareta Gyurcsik şi reuneşte cercetători şi
                  cadre didactice din Colectivul de Limba franceză de la
                  Facultatea de Litere, Istorie şi Teologie, Universitatea de
                  Vest din Timişoara.
                </p>
              </div>
              <div className={styles.line}>
                <p>
                  Domeniul francofoniei este înţeles în sens larg prin
                  explorarea literaturilor din arii geografice diverse (Canada,
                  Maghreb, Africa subsahariană etc.), incluzând literatura
                  franceză contemporană. De asemenea, programele de cercetare şi
                  publicaţiile Centrului acordă constant atenţie contribuţiilor
                  româneşti: literatura scriitorilor români francofoni,
                  traducerea literară din şi în limba franceză, autotraducerea,
                  precum şi aportul cercetării româneşti la exegeza şi
                  istoriografia în curs de constituire a literaturilor
                  francofone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionContainerBlue}>
          <div className={styles.textContainer}>
            <div className={styles.paragraph}>
              <div className={styles.lineBlue}>
                <p>
                  Centrul a avut şi are un rol federator, propunând teme de
                  investigaţie şi puncte de joncţiune pentru cercetări diverse,
                  care pun în valoare specializări ştiinţifice şi opţiuni
                  metodologice variate.
                </p>
              </div>
              <div className={styles.lineBlue}>
                <p>
                  Centrul contribuie substanţial la configurarea şi derularea
                  programelor de studiu ale Catedrei de Limbi Romanice prin
                  includerea domeniului literar francofon atât în ciclul de
                  licenţă, cât mai ales în cele de masterat şi doctorat.
                </p>
              </div>
            </div>
          </div>
          <img
            src={istoric3}
            alt="Description of image"
            className={styles.imageBox}
          />
        </div>

        <div className={styles.sectionContainer}>
          <img
            src={istoric2}
            alt="Description of image"
            className={styles.imageBox}
          />
          <div className={styles.textContainer}>
            <div className={styles.paragraph}>
              <div className={styles.line}>
                <p>
                  Din 1995, Centrul publică revista de literatură francofonă
                  contemporană Dialogues francophones. Începând cu anul 2009,
                  numerele au devenit tematice.
                </p>
              </div>
              <div className={styles.line}>
                <p>
                  Din 2004, Centrul organizează anual un colocviu de studii
                  francofone, intitulat iniţial Contributions roumaines à la
                  francophonie, apoi, din 2010, Colloque International d’Études
                  Francophones à Timişoara (CIEFT). Lucrările sunt publicate în
                  volume intitulate Agapes francophones.
                </p>
              </div>
              <div className={styles.line}>
                <p>
                  Centrul a iniţiat o serie de proiecte, în domenii variate:
                  studii literare, traducere, lingvistică, didactica limbii
                  franceze ca limbă străină.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/history/')({
  component: HistoryPage,
});

export default HistoryPage;
