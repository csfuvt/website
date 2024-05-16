import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../-components/KBanner/KBanner';
import { KActeColocvii } from '../../../-components/KActeColocvii/KActeColocvii';
import styles from './LingvisticConfPage.module.css';

const LingvisticConfPage = () => {
  const items = [
    {
      summary:
        'De la phrase / énoncé au texte / discours. Perspectives linguistiques et didactiques',
      link: 'https://csf.uvt.ro/pdfs/cfrl/11_CFRL_sommaire.pdf',
      bookImage: '../../../../../public/ActeColocviiPics/copertavolum.png',
    },
    {
      summary: 'La phrase: carrefour linguistique et didactique',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/La-Phrase-carrefour-linguistique-et-didactique',
      bookImage:
        '../../../../../public/ActeColocviiPics/carrefour_linguistique_et_didactique.png',
    },
    {
      summary: 'La négation. Études linguistiques, pragmatiques et didactiques',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/La-Negation.-Etudes-linguistiques-pragmatiques-et-didactiques',
      bookImage: '../../../../public/ActeColocviiPics/Études_linguistiques.png',
    },
    {
      summary: 'NominalisationS: études linguistiques et didactiques',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/NominalisationS-etudes-linguistiques-et-didactiques',
      bookImage:
        '../../../../public/ActeColocviiPics/linguistiques-et-didactiques.png',
    },
    {
      summary:
        'Temps, aspect et classes de mots: études théoriques et didactiques',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Temps-aspect-et-classes-de-mots-etudes-theoriques-et-didactiques',
      bookImage: '../../../../../public/ActeColocviiPics/temps.png',
    },
    {
      summary: 'adjectif hors de sa catégorie',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/L-Adjectif-hors-de-sa-categorie',
      bookImage: '../../../../../public/ActeColocviiPics/adjectif-hors.png',
    },
    {
      summary: 'Les constructions détachées: entre langue et discours',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Les-Constructions-detachees-entre-langue-et-discours',
      bookImage:
        '../../../../../public/ActeColocviiPics/Les-constructions-détachées.png',
    },
    {
      summary: 'L adverbe, un pervers polymorphe',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/L-Adverbe-un-pervers-polymorphe',
      bookImage: '../../../../../public/ActeColocviiPics/adverbe.png',
    },
    {
      summary:
        'Prépositions et conjonctions de subordination. Syntaxe et sémantique',
      link: 'https://csf.uvt.ro/pdfs/cfrl/3_CFRL_sommaire.pdf',
      bookImage: '../../../../../public/ActeColocviiPics/prepositions.png',
    },
    {
      summary: 'Le syntagme nominal: syntaxe et sémantique',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Le-Syntagme-nominal-syntaxe-et-semantique',
      bookImage: '../../../../../public/ActeColocviiPics/syntagme.png',
    },
    {
      summary: 'Fonctions syntaxiques et rôles sémantiques',
      link: 'http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Fonctions-syntaxiques-et-roles-semantiques',
      bookImage: '../../../../../public/ActeColocviiPics/functions.png',
    },
  ];

  return (
    <div className={styles.container}>
      <KBanner label="ACTELE COLOCVIILOR FRANCO-ROMANE DE LINGVISTICA" />
      <div className={styles.grid}>
        {items.map((item, index) => (
          <KActeColocvii
            key={index}
            summaryText={item.summary}
            link={item.link}
            bookImage={item.bookImage}
          />
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research/publications/lingvistic-conferences/'
)({
  component: LingvisticConfPage,
});

export default LingvisticConfPage;
