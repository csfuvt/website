import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
import { KMemberCard } from '../../-components/KMemberCard/KMemberCard';
import { KTitle } from '../../-components/KTitle/KTitle';
import styles from './MembersPage.module.css';
import profile from '../../../../public/profile.png';
import Georgiana_Badea from '../../../../public/Despre_noi/Georgiana-Badea.jpg';
import Neli_Eiben from '../../../../public/Despre_noi/Neli-Eiben.jpg';
import Ioana_Marcu from '../../../../public/Despre_noi/Ioana-Marcu.jpg';
import Andreea_Gheorghiu from '../../../../public/Despre_noi/Andreea-Gheorghiu.jpg';
import Ramona_Malita_Tanc from '../../../../public/Despre_noi/Ramona-Malita.jpg';
import Mariana_Pitar from '../../../../public/Despre_noi/Mariana-Pitar.jpg';
import Vasile_Popovici from '../../../../public/Despre_noi/Vasile-Popovici.jpg';
import Adina_Tihu from '../../../../public/Despre_noi/Adina-Tihu.jpg';
import { useTranslation } from 'react-i18next';

const MembersPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <KBanner label={t('MEMBRI')} />
      <div className={styles.pageContainer}>
        <div className={styles.section}>
          <KTitle label={t('Membru fondator')} />
          <KMemberCard
            description=""
            cvLink=""
            profileImage={profile}
            label_name="Margareta Gyurcsik"
            label_title={t('Membru onorific')}
          />
        </div>
        <div className={styles.section}>
          <KTitle label={t('Membri activi')} />
          <div className={styles.membersGrid}>
            <KMemberCard
              description="Centres d'intérêt : littérature francophones écrivain.e.s roumain.e.s d'expression française, littérature française, traduction littéraire, traductologie, histoire générale et comparée de la traduction, histoire de la traduction en roumain"
              cvLink=""
              profileImage={Georgiana_Badea}
              label_name="Prof. Univ. Dr. Georgiana Badea"
              label_title={t('Director Centru')}
            />
            <KMemberCard
              description="Centres d'intérêt : traductologie (autotraduction, didactique de la traduction, traduction générale et spécialisée) et études francophones (écriture féminine, littérature québécoise)"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/12.CV_NeliEiben.pdf"
              profileImage={Neli_Eiben}
              label_name="Lect. Univ. Dr. Neli Eiben"
              label_title={t('Secretar Științific')}
            />
            <KMemberCard
              description="Centres d'intérêt : la littérature issue de l'immigration maghrébine, les littératures francophones (Maghreb et Afrique Noire), la littérature du déplacement, la littérature urbaine"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/IMarcu_Curriculum-vitae.pdf"
              profileImage={Ioana_Marcu}
              label_name="Lect. Univ. Dr. Ioana Marcu"
              label_title={t('Secretar')}
            />
            <KMemberCard
              description="Centres d'intérêt : littérature française du XVIIIe siècle, littératures française/francophones contemporaines, parodie littéraire, didactique du texte littéraire"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Andreea-Gheorghiu.pdf"
              profileImage={Andreea_Gheorghiu}
              label_name="Asist. Univ. Dr. Andreea Gheorghiu"
              label_title={t('Membru de bazǎ')}
            />
            <KMemberCard
              description="Centres d'intérêt : littérature française médiévale et renaissante, littérature française du XIX e siècle, francophonie, didactique du texte littéraire"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Ramona-Malita-european-martie-2020.pdf"
              profileImage={Ramona_Malita_Tanc}
              label_name="Conf. Univ. Dr. Ramona Malița Tanc"
              label_title={t('Membru de bazǎ')}
            />
            <KMemberCard
              description="Centres d'intérêt : terminologie, traduction des documents audio-visuels, linguistique du texte, traduction assistée par ordinateur"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Pitar-Mariana-2020.pdf"
              profileImage={Mariana_Pitar}
              label_name="Conf. Univ. Dr. Mariana Pitar"
              label_title={t('Membru de bazǎ')}
            />
            <KMemberCard
              description="Centres d'intérêt : littérature française des XIXe et XXe siècles, littératures comparées, théorie littéraire"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Popovici-Vasile.pdf"
              profileImage={Vasile_Popovici}
              label_name="Prof. Univ. Dr. Vasile Popovici"
              label_title={t('Membru de bazǎ')}
            />
            <KMemberCard
              description="Centres d'intérêt : linguistique française, linguistique contrastive, domaine français – roumain : syntaxe et sémantique"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Adina-TIHU.pdf"
              profileImage={Adina_Tihu}
              label_name="Lect. Univ. Dr. Adina Tihu"
              label_title={t('Membru de bazǎ')}
            />
            <KMemberCard
              description="Centres d'intérêt : les systèmes de notation phonétique en diachronie, la phraséologie du français, la lexicographie et l'histoire des dictionnaires"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/04.CV_Eugenia_Tanase.pdf"
              profileImage={profile}
              label_name="Lect. Univ. Dr. Eugenia Tănase"
              label_title={t('Membru de bazǎ')}
            />
            <KMemberCard
              description="Centres d'intérêt : orthographe du français, grammaire contrastive (français – roumain)"
              cvLink="https://litere.uvt.ro/wp-content/uploads/2014/07/06.CV_Cristina_Tanase.pdf"
              profileImage={profile}
              label_name="Asist. Univ. Dr. Cristina Tănase"
              label_title={t('Membru de bazǎ')}
            />
          </div>
        </div>
        <div className={styles.section}>
          <KTitle label={t('Membri onorifici')} />
          <div className={styles.membersGrid}>
            <KMemberCard
              description=""
              cvLink=""
              profileImage={profile}
              label_name="Prenume Nume"
              label_title={t('Secretar Științific')}
            />
            <KMemberCard
              description=""
              cvLink=""
              profileImage={profile}
              label_name="Prenume Nume"
              label_title={t('Secretar Științific')}
            />
            <KMemberCard
              description=""
              cvLink=""
              profileImage={profile}
              label_name="Prenume Nume"
              label_title={t('Secretar Științific')}
            />
            <KMemberCard
              description=""
              cvLink=""
              profileImage={profile}
              label_name="Prenume Nume"
              label_title={t('Secretar Științific')}
            />
            <KMemberCard
              description=""
              cvLink=""
              profileImage={profile}
              label_name="Prenume Nume"
              label_title={t('Secretar Științific')}
            />
            <KMemberCard
              description=""
              cvLink=""
              profileImage={profile}
              label_name="Prenume Nume"
              label_title={t('Secretar Științific')}
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
