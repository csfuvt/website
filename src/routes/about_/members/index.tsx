import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
import { KMemberCard } from '../../-components/KMemberCard/KMemberCard';
import { KTitle } from '../../-components/KTitle/KTitle';
import styles from './MembersPage.module.css';

const MembersPage = () => {
  return (
    <div>
      <KBanner label="MEMBRI" />
      <div className={styles.pageContainer}>
        <div className={styles.section}>
          <KTitle label="Membru fondator" />
          <KMemberCard
            label_name="Prenume Nume"
            label_title="Secretar Științific"
          />
        </div>
        <div className={styles.section}>
          <KTitle label="Membri activi" />
          <div className={styles.membersGrid}>
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
          </div>
        </div>
        <div className={styles.section}>
          <KTitle label="Membri onorifici" />
          <div className={styles.membersGrid}>
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
            <KMemberCard
              label_name="Prenume Nume"
              label_title="Secretar Științific"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/members/')({
  component: MembersPage,
});

export default MembersPage;
