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
    },
    { summary: 'Sumar', link: '/details/2' },
    { summary: 'Sumar', link: '/details/3' },
    { summary: 'Sumar', link: '/details/4' },
    { summary: 'Sumar', link: '/details/5' },
    { summary: 'Sumar', link: '/details/6' },
    { summary: 'Sumar', link: '/details/7' },
    { summary: 'Sumar', link: '/details/8' },
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
