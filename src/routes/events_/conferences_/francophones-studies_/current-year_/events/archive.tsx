import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { PostersIndexCOLOCVIU } from './-events.model.ts';
import { useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KAddButton } from '../../../../../-components/KAddButton/KAddButton.tsx';
import { Button, Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import styles from './Events.module.css';
import { KAddPostersModal } from '../../../../../-components/KAddPostersModal/KAddPostersModal.tsx';
import KPostersListArchive from '../../../../../-components/KPosters/KPostersListArchive.tsx';

const getEvents = () =>
  axios.get<PostersIndexCOLOCVIU[]>('/event-posters').then(res => res.data);

const PostersCOLOCVIU = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: posters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['event-posters'],
    queryFn: getEvents,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <KBanner label="Arhivă - AFIȘ, PROGRAM ȘI REZUMATE" />
      <div className={styles.page}>
        {isLoggedIn && (
          <KAddButton className={'position'} onClick={showModal} />
        )}
        {isModalOpen && (
          <KAddPostersModal
            setIsOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            handleCancel={() => setIsModalOpen(false)}
            targetPage={'COLOCVIU'}
          />
        )}

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={() =>
              (window.location.href =
                '/events/conferences/francophones-studies/current-year/events')
            }
            size="large">
            Mergi la ultimul poster
          </Button>
        </div>

        {isLoading ? (
          <div className="flex">
            <Spin />
          </div>
        ) : isError ? (
          <div className="flex">
            <span>Afisul nu pot fi afisat momentan. Reveniți mai târziu!</span>
          </div>
        ) : (
          <>
            <div>
              {isEmpty(posters?.filter(p => p.type === 'COLOCVIU')) ? (
                <center>
                  <span>Nu există postere.</span>
                </center>
              ) : (
                <KPostersListArchive type="COLOCVIU" isLoggedIn={isLoggedIn} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/events/archive'
)({
  component: PostersCOLOCVIU,
});

export default PostersCOLOCVIU;
