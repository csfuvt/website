import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KSlider } from '../../../../../-components/KSlider/KSlider.tsx';
import './styles.css';
import Image from './../../../../../../assets/img.png';

export const DialoguesFrancophonesAboutPage = () => {
  const slides = [
    {
      title: 'Despre noi',
      paragraphs: [
        'Creată în 1995, la iniţiativa Prof.dr.univ. Margareta Gyurcsik, revista Dialogues francophones, publicaţie a Centrului de Studii Francofone de la Catedra de Limbi romanice a Universităţii de Vest din Timişoara, este consacrată literaturii francofone contemporane.',
        'Revista Dialogues francophones îşi propune să evidenţieze conexiunile literaturii francofone cu teoria literară şi literatura comparată.',
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
      <KBanner label="Dialogues Francophones - Despre noi" />
      <div className="content">
        <KSlider slides={slides} image imageUrl={Image} />
      </div>
    </div>
  );
};
