import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
import { KAddButton } from '../../-components/KAddButton/KAddButton.tsx';
import { KAddMemberModal } from '../../-components/KAddMemberModal/KAddMemberModal.tsx';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import styles from './MembersPage.module.css';
import KMembersList from '../../-components/KMemberCard/KMembersList.tsx';
import { isEmpty } from 'lodash-es';
import { MemberIndex } from './-member-model.ts';

const getMembers = () =>
  axios.get<MemberIndex[]>('/members').then(res => res.data);

const MembersPage = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>(null);

  const {
    data: members,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleToggleDescription = (name: string) => {
    setOpenCard(openCard === name ? null : name);
  };

  return (
    <div>
      <KBanner label={t('MEMBRI')} />
      <div className={styles.pageContainer}>
        <div className={styles.section}>
          {isLoggedIn && (
            <KAddButton className={'position'} onClick={showModal} />
          )}
          {isModalOpen && (
            <KAddMemberModal
              setIsOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              handleCancel={() => setIsModalOpen(false)}
            />
          )}
          {isLoading ? (
            <div className="flex">
              <Spin />
            </div>
          ) : isError ? (
            <div className="flex">
              <span>
                Membrii nu pot fi afișați momentan. Reveniți mai târziu!
              </span>
            </div>
          ) : (
            <>
              <div>
                <center>
                  <h2>Fondatori</h2>
                </center>
                {isEmpty(
                  members?.filter(p => p.memberCategory === 'FOUNDER')
                ) ? (
                  <center>
                    <span>Nu există membri în această categorie.</span>
                  </center>
                ) : (
                  <KMembersList
                    memberCategory={'FOUNDER'}
                    openCard={openCard}
                    toggleDescription={handleToggleDescription}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </div>

              <div>
                <center>
                  <h2>Conducere</h2>
                </center>
                {isEmpty(
                  members?.filter(p => p.memberCategory === 'MANAGEMENT')
                ) ? (
                  <center>
                    <span>Nu există membri în această categorie.</span>
                  </center>
                ) : (
                  <KMembersList
                    memberCategory={'MANAGEMENT'}
                    openCard={openCard}
                    toggleDescription={handleToggleDescription}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </div>

              <div>
                <center>
                  <h2>Echipa de bază</h2>
                </center>
                {isEmpty(
                  members?.filter(p => p.memberCategory === 'BASE_TEAM')
                ) ? (
                  <center>
                    <span>Nu există membri în această categorie.</span>
                  </center>
                ) : (
                  <KMembersList
                    memberCategory={'BASE_TEAM'}
                    openCard={openCard}
                    toggleDescription={handleToggleDescription}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </div>

              <div>
                <center>
                  <h2>Colaboratori</h2>
                </center>
                {isEmpty(
                  members?.filter(p => p.memberCategory === 'COLLABORATOR')
                ) ? (
                  <center>
                    <span>Nu există membri în această categorie.</span>
                  </center>
                ) : (
                  <KMembersList
                    memberCategory={'COLLABORATOR'}
                    openCard={openCard}
                    toggleDescription={handleToggleDescription}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </div>

              <div>
                <center>
                  <h2>Doctoranzi și studenți</h2>
                </center>
                {isEmpty(
                  members?.filter(p => p.memberCategory === 'STUDENTS')
                ) ? (
                  <center>
                    <span>Nu există membri în această categorie.</span>
                  </center>
                ) : (
                  <KMembersList
                    memberCategory={'STUDENTS'}
                    openCard={openCard}
                    toggleDescription={handleToggleDescription}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </div>

              <div>
                <center>
                  <h2>Membri asociați</h2>
                </center>
                {isEmpty(
                  members?.filter(p => p.memberCategory === 'ASSOCIATE_MEMBER')
                ) ? (
                  <center>
                    <span>Nu există membri în această categorie.</span>
                  </center>
                ) : (
                  <KMembersList
                    memberCategory={'ASSOCIATE_MEMBER'}
                    openCard={openCard}
                    toggleDescription={handleToggleDescription}
                    isLoggedIn={isLoggedIn}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/members/')({
  component: MembersPage,
});

export default MembersPage;
