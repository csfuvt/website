import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { KTitle } from '../../../../-components/KTitle/KTitle.tsx';
import { KParagraph } from '../../../../-components/KParagraph/KParagraph.tsx';
import './styles.css';
import { KCommitteeSection } from '../../../../-components/KCommitteeSection/KCommitteeSection.tsx';

const honorificCommitteeMembers = [
  {
    name: 'Dumitru TSEPENEAG',
    university: 'scriitor',
    country: 'France, România',
  },
  {
    name: 'Matei VISNIEC',
    university: 'scriitor',
    country: 'France, România',
  },
  {
    name: 'Fritz Peter KIRSCH',
    university: 'Université de Vienne',
    country: 'Austriche',
  },
  {
    name: 'André MAINDRON',
    university: 'Université de Poitiers',
    country: 'France',
  },
];

const scientificCommitteeMembers = [
  {
    name: 'Georgiana I. BADEA',
    university: 'Université de l’Ouest de Timisoara',
    country: 'Roumanie',
  },
  {
    name: 'Elena GHIŢĂ',
    university: 'Universitatea de Vest din Timişoara',
    country: 'România',
  },
  {
    name: 'Rodica LASCU-POP',
    university: 'Universitatea Babes-Bolyai din Cluj-Napoca',
    country: 'România',
  },
  {
    name: 'Peter-G. KLAUS',
    university: 'Freie Universität Berlin',
    country: 'Allemagne',
  },
  {
    name: 'Klaus-D. ERTLER',
    university: 'Institut für Romanistik, Graz',
    country: 'Autriche',
  },
  {
    name: 'Marc QUAGHEBEUR',
    university: 'Archives et Musée de la Littérature, Bruxelles',
    country: 'Belgique',
  },
  {
    name: 'Adina BABOS-BALINT',
    university: 'University of Winnipeg',
    country: 'Canada',
  },
  {
    name: 'Philippe BASABOSE',
    university: 'Memorial University of Newfoundland',
    country: 'Canada',
  },
  {
    name: 'Carlo LAVOIE',
    university: 'Université de l’Île-du-Prince-Édouard',
    country: 'Canada',
  },
  {
    name: 'Mariana IONESCU',
    university: 'Huron University College at Western Ontario, London',
    country: 'Canada',
  },
  {
    name: 'Simona PRUTEANU',
    university: 'Wilfrid Laurier University, Waterloo',
    country: 'Canada',
  },
  {
    name: 'Richard SAINT-GELAIS',
    university: 'CRILCQ, Université Laval de Québec',
    country: 'Canada',
  },
  { name: 'Yves LEROUX', university: 'Université d’Angers', country: 'France' },
  {
    name: 'Danielle RISTERUCCI-ROUDNICKY',
    university: 'Université d’Orléans',
    country: 'France',
  },
  {
    name: 'Allain VUILLEMIN',
    university: 'Université d’Artois Arras',
    country: 'France',
  },
  {
    name: 'Georges FRERIS',
    university: 'Université Aristote, Tessalonique',
    country: 'Grèce',
  },
  {
    name: 'Jenő FARKAS',
    university: 'Université Eötvös Loránd de Budapest',
    country: 'Hongrie',
  },
];

const redactionCommitteMembers = [
  {
    position: 'Redactor-şef',
    members: [
      {
        name: 'Ileana Neli EIBEN',
        email: 'ileana.eiben@e-uvt.ro',
      },
    ],
  },
  {
    position: 'Redactor-şef adjunct',
    members: [
      {
        name: 'Ioana MARCU',
        email: 'ioana.marcu@e-uvt.ro',
      },
    ],
  },
  {
    position: 'Redactori',
    members: [
      {
        name: 'Andreea GHEORGHIU',
        email: 'andreea.gheorghiu@e-uvt.ro',
      },
      {
        name: 'Adina TIHU',
        email: 'adina.tihu@e-uvt.ro',
      },
    ],
  },
  {
    position: 'Revizuirea rezumatelor in limba engleza',
    members: [
      {
        name: 'Dana CRĂCIUN',
        email: 'dana.craciun@e-uvt.ro',
      },
    ],
  },
];

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/committees/'
)({
  component: () => (
    <div>
      <KBanner label="Dialogues Francophones - COMITETE" />
      <div className="committees">
        <div className="committee">
          <KTitle label="Comitet onorific" />
          <KParagraph
            title
            titleLabel={'Director onorific'}
            text="Margareta GYURCSIK, Universitatea de Vest din Timişoara, România"
          />
          <KCommitteeSection
            isTitle
            title="Comitet onorific"
            list={honorificCommitteeMembers}
          />
        </div>
        <div className="committee">
          <KTitle label="Comitet științific" />
          <KCommitteeSection list={scientificCommitteeMembers} />
        </div>
        <div className="committee">
          <KTitle label="Comitet de redacție" />
          {redactionCommitteMembers.map(committe => (
            <KParagraph
              title
              titleLabel={committe.position}
              text={`${committe.members.map(member => `${member.name}, e-mail: ${member.email}`)}`}
            />
          ))}
        </div>
      </div>
    </div>
  ),
});
