import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
import styles from './MembersPage.module.css';

const MembersPage = () => {
  return (
    <div>
      <KBanner label="MEMBRI" />
      <div className={styles.pageContainer}></div>
    </div>
  );
};

export const Route = createFileRoute('/about/members/')({
  component: MembersPage,
});

export default MembersPage;
