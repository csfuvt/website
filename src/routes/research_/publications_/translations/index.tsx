import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../-components/KBanner/KBanner';
import { KTranslationCard } from '../../../-components/KTranslationCard/KTranslationCard';
import styles from './TranslationPage.module.css';

const TranslationPage = () => {
  const items = [
    { details: 'Details 1', link: '/details/1' },
    { details: 'Details 2', link: '/details/2' },
    { details: 'Details 3', link: '/details/3' },
    { details: 'Details 4', link: '/details/4' },
    { details: 'Details 5', link: '/details/5' },
    { details: 'Details 6', link: '/details/6' },
    { details: 'Details 6', link: '/details/7' },
    { details: 'Details 6', link: '/details/8' },
  ];

  return (
    <div className={styles.container}>
      <KBanner label="TRADUCERI" />
      <div className={styles.grid}>
        {items.map((item, index) => (
          <KTranslationCard
            key={index}
            summaryText={item.details}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/research/publications/translations/')({
  component: TranslationPage,
});

export default TranslationPage;
