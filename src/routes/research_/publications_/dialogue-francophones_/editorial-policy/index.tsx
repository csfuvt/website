import { createFileRoute } from '@tanstack/react-router';
import { KParagraph } from '../../../../-components/KParagraph/KParagraph.tsx';
import './styles.css';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/editorial-policy/'
)({
  component: () => (
    <div>
      <KBanner label="Dialogues Francophones - Politica editorială" />
      <div className="content-policy">
        <KParagraph text="Revista Dialogues francophones stabilește o temă pentru fiecare număr prin consultarea membrilor comitetului științific. Calitatea articolelor publicate în Dialogues francophones rezultă din evaluarea temeinică a contribuțiilor trimise pe adresa revistei." />
        <KParagraph text="Textele trimise pe adresa redacției sunt evaluate, în prima etapă, de comitetul de redacției al Dialogues francophones pentru a stabili gradul de adecvare la tematica anunțată." />
        <KParagraph text="Redacția Dialogues francophones trimite textele evaluatorilor după obținerea raportului de originalitate (Ithenticate, Turnitin etc.) pentru fiecare articol." />
        <KParagraph text="Evaluarea dublu anonimizată – a autorului și a evaluatorilor – este efectuată de cel puțin doi cercetători în domeniu (alții decât membrii comitetului de redacție), membri în comitetul științific sau experți la care se apelează ocazional." />
        <KParagraph text="În fiecare număr al revistei, lista evaluatorilor este actualizată." />
        <KParagraph
          text="În procesul de evaluare, membrii comitetului științific și experții-evaluatori ad hoc au în vedere următoarele criterii :"
          list
          listElements={[
            'Respectarea protocolului de tehnoredactare (nerespectarea antrenează respingerea automată a articolului)',
            'Originalitatea subiectului tratat în articolul supus evaluării',
            'Adecvarea acestuia la tematica numărului',
            'Relevanța studiului propus, problematica și argumentarea',
            'Calitatea resurselor bibliografice.',
          ]}
        />

        <KParagraph
          text="Se apreciază:"
          list
          listElements={[
            'Părțile originale și corect editate în materialul supus evaluării',
            'Referințele bibliografice primare, exegeza acestora dacă o impune subiectul',
            'Bunele practici în materie de integritate în prezentarea rezultatelor de cercetare',
          ]}
        />

        <KParagraph
          text="Se sancționează:"
          list
          listElements={[
            'Absența surselor primare din bibliografie în favoarea referințele bibliografice secundare',
            'Dubla citare incomplet semnalată',
            'Preluarea de idei cât și preluarea de text fără citările de rigoare',
            'Citatele care depășesc 10 rânduri',
            'Preluarea de tip mozaic a unui bloc de text, fără citarea de rigoare, iar în interiorului textului respectiv se înlocuiesc cuvinte, dar cu păstrarea structurii de ansamblu a frazării',
          ]}
        />
        <KParagraph text="Toți colaboratorii vor fi informați cu privire la acceptarea sau refuzul propunerii lor prin intermediul platformei Dialogues francophones." />
      </div>
    </div>
  ),
});
