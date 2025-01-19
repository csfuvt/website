import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../-components/KBanner/KBanner';
import styles from '../../../-components/KCardColocvii/KCardColocvii.module.css';
import KCardColocvii2 from '../../../-components/KCardColocvii2/KCardColocvii2';

export const Route = createFileRoute(
  '/events/conferences/lingvistic-francophones/'
)({
  component: () => (
    <>
      <KBanner label="COLOCVIILE FRANCO-ROMANE DE LINGVISTICĂ" />

      <div className={styles.colocviiContainer}>
        <KCardColocvii2
          id={0}
          title={'XIe Colloque franco-roumain de linguistique'}
          meetingDate={'1 june 2017'}
          organizers={
            'l’Université de l’Ouest de Timişoara, l’Université d’Artois et le centre de recherche Grammatica d’Arras. Arras.'
          }
          colloquyName={
            '« De la phrase/énoncé au texte/discours – perspectives linguistiques et didactiques »'
          }
        />
        <KCardColocvii2
          id={1}
          title={'Xe Colloque international franco-roumain'}
          meetingDate={'3 june 2015'}
          organizers={
            'l’Université d’Artois, les laboratoires Grammatica d’Arras et Circeft-Escol, Paris-Est Créteil. Arras.'
          }
          colloquyName={'« La phrase, carrefour linguistique et didactique »'}
        />
        <KCardColocvii2
          id={2}
          title={'IXe Colloque de linguistique franco-roumaine'}
          meetingDate={'15 may 2013'}
          organizers={
            'l’Université de l’Ouest de Timişoara, l’Université d’Artois - le centre de recherche Grammatica d’Arras. Timişoara.'
          }
          colloquyName={
            '« La négation. Études linguistiques, pragmatiques et didactiques »'
          }
        />
        <KCardColocvii2
          id={3}
          title={'VIIIe Colloque de linguistique franco-roumaine'}
          meetingDate={'18 may 2011'}
          organizers={
            'l’Université d’Artois - les laboratoires Grammatica d’Arras et l’Université de l’Ouest de Timişoara. Arras.'
          }
          colloquyName={
            '« NominalisationS. Études linguistiques et didactiques »'
          }
        />
        <KCardColocvii2
          id={4}
          title={'VIIe Colloque de linguistique franco-roumaine'}
          meetingDate={'18 may 2009'}
          organizers={
            'l’Université de l’Ouest de Timişoara et l’Université d’Artois - le centre de recherche Grammatica d’Arras. Timişoara.'
          }
          colloquyName={
            '« Temps, aspect et classes de mots : études théoriques et didactiques »'
          }
        />
        <KCardColocvii2
          id={5}
          title={'VIe Colloque de linguistique franco-roumaine'}
          meetingDate={'23 may 2007'}
          organizers={
            'l’Université d’Artois - les laboratoires Grammatica d’Arras et l’Université de l’Ouest de Timişoara. Arras.'
          }
          colloquyName={"« L'adjectif hors de sa catégorie »"}
        />
        <KCardColocvii2
          id={6}
          title={'Ve Colloque franco-roumain de linguistique'}
          meetingDate={'8 june 2005'}
          organizers={
            'l’Université de l’Ouest de Timişoara et l’Université d’Artois - le centre de recherche Grammatica d’Arras. Timişoara.'
          }
          colloquyName={
            '« Les constructions détachées : entre langue et discours »'
          }
        />
        <KCardColocvii2
          id={7}
          title={'IVe Colloque franco-roumain de linguistique'}
          meetingDate={'26 may 2003'}
          organizers={
            'l’Université d’Artois - les laboratoires Grammatica d’Arras et l’Université de l’Ouest de Timişoara. Université d’Artois, Arras.'
          }
          colloquyName={'« L’adverbe : un pervers polymorphe »'}
        />
        <KCardColocvii2
          id={8}
          title={'IIIe Colloque franco-roumain de linguistique'}
          meetingDate={'29 may 2001'}
          organizers={
            'l’Université de l’Ouest de Timişoara et l’Université d’Artois - le centre de recherche Grammatica d’Arras. Timişoara.'
          }
          colloquyName={
            '« Prépositions et conjonctions de subordination. Syntaxe et sémantique » »'
          }
        />

        <KCardColocvii2
          id={9}
          title={'IIe Colloque franco-roumain de linguistique'}
          meetingDate={'27 april 1999'}
          organizers={
            'l’Université d’Artois - les laboratoires Grammatica d’Arras et l’Université de l’Ouest de Timişoara. Arras.'
          }
          colloquyName={'« Le syntagme nominal : syntaxe et sémantique »'}
        />

        <KCardColocvii2
          id={10}
          title={'Ier Colloque franco-roumain de linguistique'}
          meetingDate={'15 april 1997'}
          organizers={
            'l’Université de l’Ouest de Timişoara, l’Université d’Artois - le centre de recherche Grammatica d’Arras. Timişoara.'
          }
          colloquyName={'« Fonctions syntaxiques et rôles sémantiques »'}
        />
      </div>
    </>
  ),
});
