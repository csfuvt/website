import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
// import { useTranslation } from 'react-i18next';
import { KSliderRight } from '../../-components/KSliderRight/KSliderRight';

import istoric1 from '../../../../public/Despre_noi/istoric1.jpg';

const HistoryPage = () => {
  // const { t } = useTranslation();
  const slides = [
    {
      title: '',
      paragraphs: [
        'Centrul de Studii Francofone, având drept obiect cercetarea în domeniul francofoniei, a fost creat în 1994 la iniţiativa Prof. univ. dr. Margareta Gyurcsik şi reuneşte cercetători şi cadre didactice din Colectivul de Limba franceză de la Facultatea de Litere, Istorie, Filosofie şi Teologie, Universitatea de Vest din Timişoara.',
        'Domeniul francofoniei este înţeles în sens larg prin explorarea literaturilor din arii geografice diverse (Canada, Maghreb, Africa subsahariană etc.), incluzând literatura franceză contemporană. De asemenea, programele de cercetare şi publicaţiile Centrului acordă constant atenţie contribuţiilor româneşti: literatura scriitorilor români francofoni, traducerea literară din şi în limba franceză, autotraducerea, precum şi aportul cercetării româneşti la exegeza şi istoriografia în curs de constituire a literaturilor francofone.',
      ],
    },
    {
      title: '',
      paragraphs: [
        'Centrul a avut şi are un rol federator, propunând teme de investigaţie şi puncte de joncţiune pentru cercetări diverse, care pun în valoare specializări ştiinţifice şi opţiuni metodologice variate.',
        'Centrul contribuie substanţial la configurarea şi derularea programelor de studiu ale Catedrei de Limbi Romanice prin includerea domeniului literar francofon atât în ciclul de licenţă, cât mai ales în cele de masterat şi doctorat.',
      ],
    },
    {
      title: '',
      paragraphs: [
        <>
          {
            'Din 1995, Centrul publică revista de literatură francofonă contemporană '
          }
          <i>Dialogues francophones</i>
          {'. Începând cu anul 2009, numerele au devenit tematice.'}
        </>,
        <>
          {
            'Din 2004, Centrul organizează anual un colocviu de studii francofone, intitulat iniţial '
          }
          <i>Contributions roumaines à la francophonie</i>
          {
            ', apoi, din 2010, Colloque International d’Études Francophones à Timişoara (CIEFT). Lucrările sunt publicate în volume intitulate '
          }
          <i> Agapes francophones.'</i>
        </>,
        'Centrul a iniţiat o serie de proiecte, în domenii variate: studii literare, traducere, lingvistică, didactica limbii franceze ca limbă străină.',
      ],
    },
  ];

  return (
    <div>
      <KBanner label={'ISTORIC'} />
      <div className="content">
        <KSliderRight slides={slides} image imageUrl={istoric1} />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/history/')({
  component: HistoryPage,
});

export default HistoryPage;
