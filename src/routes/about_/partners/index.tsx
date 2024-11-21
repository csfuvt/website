import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { PartnerIndex } from './-partner.model.ts';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { KBanner } from '../../-components/KBanner/KBanner.tsx';
import { KAddButton } from '../../-components/KAddButton/KAddButton.tsx';
import { Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import styles from './Partners.module.css';
import KPartnersList from '../../-components/KPartners/KPartnersList.tsx';
import { KAddPartnerModal } from '../../-components/KAddPartnerModal/KAddPartnerModal.tsx';

const getPartners = () =>
  axios.get<PartnerIndex[]>('/partners').then(res => res.data);

const PartneringPage = () => {
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
      <KBanner label="Parteneri" />
      <div className={styles.page}>
        <div className={styles.text}>
          <span className={styles.title}>Centrul de Studii Francofone</span> are
          parteneriate cu instituții de pe întreg mapamondul:
        </div>
        {isLoggedIn && (
          <KAddButton className={'position'} onClick={showModal} />
        )}
        {isModalOpen && (
          <KAddPartnerModal
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
              Partenerii nu pot fi afișați momentan. Reveniți mai târziu!
            </span>
          </div>
        ) : (
          <>
            <div>
              <center>
                <h2>Europa Centrală și de Est</h2>
              </center>
              {isEmpty(
                partners?.filter(
                  p => p.partnerLocation === 'CENTRAL_EASTERN_EUROPE'
                )
              ) ? (
                <center>
                  <span>Nu există parteneri pentru această locație.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="CENTRAL_EASTERN_EUROPE" />
              )}
            </div>

            <div>
              <center>
                <h2>Europa de Vest</h2>
              </center>
              {isEmpty(
                partners?.filter(p => p.partnerLocation === 'WESTERN_EUROPE')
              ) ? (
                <center>
                  <span>Nu există parteneri pentru această locație.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="WESTERN_EUROPE" />
              )}
            </div>

            <div>
              <center>
                <h2>America de Nord</h2>
              </center>
              {isEmpty(
                partners?.filter(p => p.partnerLocation === 'NORTH_AMERICA')
              ) ? (
                <center>
                  <span>Nu există parteneri pentru această locație.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="NORTH_AMERICA" />
              )}
            </div>

            <div>
              <center>
                <h2>America Centrală și de Sud</h2>
              </center>
              {isEmpty(
                partners?.filter(
                  p => p.partnerLocation === 'CENTRAL_SOUTH_AMERICA'
                )
              ) ? (
                <center>
                  <span>Nu există parteneri pentru această locație.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="CENTRAL_SOUTH_AMERICA" />
              )}
            </div>

            <div>
              <center>
                <h2>Africa</h2>
              </center>
              {isEmpty(
                partners?.filter(p => p.partnerLocation === 'AFRICA')
              ) ? (
                <center>
                  <span>Nu există parteneri pentru această locație.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="AFRICA" />
              )}
            </div>

            <div>
              <center>
                <h2>Asia</h2>
              </center>
              {isEmpty(partners?.filter(p => p.partnerLocation === 'ASIA')) ? (
                <center>
                  <span>Nu există parteneri pentru această locație.</span>
                </center>
              ) : (
                <KPartnersList partnerLocation="ASIA" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/partners/')({
  component: PartneringPage,
});

export default PartneringPage;
