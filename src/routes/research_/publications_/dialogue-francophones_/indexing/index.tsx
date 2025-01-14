import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { Index } from './-index.model.ts';
import { useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { KAddButton } from '../../../../-components/KAddButton/KAddButton.tsx';
import { Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import styles from './Indexing.module.css';
import KIndexList from '../../../../-components/KIndex/KIndexList.tsx';
import { KAddIndexModal } from '../../../../-components/KAddIndexModal/KAddIndexModal.tsx';

const getIndexes = () => axios.get<Index[]>('/indexes').then(res => res.data);

const IndexingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: indexes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['indexes'],
    queryFn: getIndexes,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <KBanner label="Dialogues Francophones - INDEXARE" />
      <div className={styles.page}>
        <div className={styles.text}>
          <span className={styles.title}>Dialogue Francophones</span> este
          indexată în următoarele baze de date internaționale:
        </div>
        {isLoggedIn && (
          <KAddButton className={'position'} onClick={showModal} />
        )}
        {isModalOpen && (
          <KAddIndexModal
            setIsOpen={setIsModalOpen}
            publicationType="DIALOGUES_FRANCOPHONE"
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
          />
        )}
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <span>
            Indexurile nu pot fi afișate momentan. Reveniți mai târziu!
          </span>
        ) : isEmpty(indexes) ? (
          <span>Nu există indexuri momentan.</span>
        ) : (
          <KIndexList publicationType="DIALOGUES_FRANCOPHONE" />
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/indexing/'
)({
  component: IndexingPage,
});

export default IndexingPage;
