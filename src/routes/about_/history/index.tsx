import { createFileRoute } from '@tanstack/react-router';
import './index.css';

const HistoryPage = () => {
  return (
    <div className="page-container">
      {/* First Section */}
      <div className="section-container">
        <img
          src="/path/to/image1.jpg"
          alt="Description of image"
          className="image-box"
        />
        <div className="text-container">
          <div className="title">Istoric</div>
          <div className="paragraph">
            <div className="line">
              <p>
                Centrul de Studii Francofone, având drept obiect cercetarea în
                domeniul francofoniei, a fost creat în 1994 la iniţiativa Prof.
                univ. dr. Margareta Gyurcsik şi reuneşte cercetători şi cadre
                didactice din Colectivul de Limba franceză de la Facultatea de
                Litere, Istorie şi Teologie, Universitatea de Vest din
                Timişoara.
              </p>
            </div>
            <div className="line">
              <p>
                Domeniul francofoniei este înţeles în sens larg prin explorarea
                literaturilor din arii geografice diverse (Canada, Maghreb,
                Africa subsahariană etc.), incluzând literatura franceză
                contemporană. De asemenea, programele de cercetare şi
                publicaţiile Centrului acordă constant atenţie contribuţiilor
                româneşti: literatura scriitorilor români francofoni, traducerea
                literară din şi în limba franceză, autotraducerea, precum şi
                aportul cercetării româneşti la exegeza şi istoriografia în curs
                de constituire a literaturilor francofone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="blue-background-wrapper">
        <div className="section-container-blue">
          <div className="text-container">
            <div className="paragraph">
              <div className="line_blue">
                <p>
                  Centrul a avut şi are un rol federator, propunând teme de
                  investigaţie şi puncte de joncţiune pentru cercetări diverse,
                  care pun în valoare specializări ştiinţifice şi opţiuni
                  metodologice variate.
                </p>
              </div>
              <div className="line_blue">
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
            src="/path/to/image2.jpg"
            alt="Description of image"
            className="image-box"
          />
        </div>
      </div>

      {/* Third Section */}
      <div className="section-container">
        <img
          src="/path/to/image3.jpg"
          alt="Description of image"
          className="image-box"
        />
        <div className="text-container">
          <div className="paragraph">
            <div className="line">
              <p>
                Din 1995, Centrul publică revista de literatură francofonă
                contemporană Dialogues francophones. Începând cu anul 2009,
                numerele au devenit tematice.
              </p>
            </div>
            <div className="line">
              <p>
                Din 2004, Centrul organizează anual un colocviu de studii
                francofone, intitulat iniţial Contributions roumaines à la
                francophonie, apoi, din 2010, Colloque International d’Études
                Francophones à Timişoara (CIEFT). Lucrările sunt publicate în
                volume intitulate Agapes francophones.
              </p>
            </div>
            <div className="line">
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
  );
};

export const Route = createFileRoute('/about/history/')({
  component: HistoryPage,
});

export default HistoryPage;
