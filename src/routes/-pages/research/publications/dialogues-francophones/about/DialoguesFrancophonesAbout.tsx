import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KSlider } from '../../../../../-components/KSlider/KSlider.tsx';
import './styles.css';
import Image from './../../../../../../assets/img.png';

export const DialoguesFrancophonesAboutPage = () => {
  const slides = [
    {
      title: 'Despre noi',
      paragraphs: [
        <text>
          Creată în 1995, la iniţiativa Prof.dr.univ. Margareta Gyurcsik,
          revista <i>Dialogues francophones</i>, publicaţie a Centrului de
          Studii Francofone de la Catedra de Limbi romanice a Universităţii de
          Vest din Timişoara, este consacrată literaturii francofone
          contemporane.
        </text>,
        <text>
          Revista <i>Dialogues francophones</i> îşi propune să evidenţieze
          conexiunile literaturii francofone cu teoria literară şi literatura
          comparată.
        </text>,
      ],
    },
    {
      title: 'Despre noi',
      paragraphs: [
        'Redactată integral în limba franceză, revista publică articole ale cercetătorilor francofoni din Europa, America de Nord (Canada şi SUA), Maghreb şi Africa Subsahariană şi se bucură de o difuzare preponderent internaţională.',
        'Volumele, cu caracter pluridisciplinar, cuprind articole, secţiuni tematice, recenzii, interviuri cu scriitori sau specialişti din domeniul francofoniei literare.',
      ],
    },
  ];
  return (
    <div>
      <KBanner label="Dialogues francophones - Despre noi" />
      <div className="content">
        <KSlider slides={slides} image imageUrl={Image} />
      </div>
    </div>
  );
};
