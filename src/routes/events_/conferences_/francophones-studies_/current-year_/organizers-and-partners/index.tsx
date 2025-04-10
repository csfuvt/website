import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { PartnerIndex } from './-partner.model.ts';
import { useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KAddButton } from '../../../../../-components/KAddButton/KAddButton.tsx';
import { Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import styles from './Partners.module.css';
import KPartnersList from '../../../../../-components/KPartners/KPartnersList.tsx';
import { KAddPartnerModal } from '../../../../../-components/KAddPartnerModal/KAddPartnerModal.tsx';

const getPartners = () =>
  axios.get<PartnerIndex[]>('/partners').then(res => res.data);

const OrgPartFranco = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: partners,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['partners'],
    queryFn: getPartners,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <KBanner label="ORGANIZATORI ȘI PARTENERI COLOCVIUL STUDENȚESC DE STUDII FRANCOFONE" />
      <div className={styles.page}>
        <div className={styles.text}>
          În vederea organizării Colocviului studențesc de studii francofone,{' '}
          <span className={styles.title}>Centrul de Studii Francofone </span>
          are parteneriate cu următoarele entități / instituții:
        </div>
        {isLoggedIn && (
          <KAddButton className={'position'} onClick={showModal} />
        )}
        {isModalOpen && (
          <KAddPartnerModal
            setIsOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            handleCancel={() => setIsModalOpen(false)}
            targetPage={'COLOCVIU_PAGE'}
          />
        )}

        {isLoading ? (
          <div className="flex">
            <Spin />
          </div>
        ) : isError ? (
          <div className="flex">
            <span>
              Partenerii nu pot fi afișați momentan. Reveniți mai târziu!
            </span>
          </div>
        ) : (
          <>
            <div>
              {isEmpty(
                partners?.filter(p => p.partnerLocation === 'COLOCVIU_PAGE')
              ) ? (
                <center>
                  <span>Nu există parteneri.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="COLOCVIU_PAGE" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/organizers-and-partners/'
)({
  component: OrgPartFranco,
});

export default OrgPartFranco;
