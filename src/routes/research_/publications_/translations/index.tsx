import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../-components/KBanner/KBanner';
import { KTranslationCard } from '../../../-components/KTranslationCard/KTranslationCard';
import './styles.css';
import { KAddButton } from '../../../-components/KAddButton/KAddButton.tsx';
import { KAddTranslationModal } from '../../../-components/KAddTranslationModal/KAddTranslationModal.tsx';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth.ts';
import axios from 'axios';
import { BASE_URL } from '../../../../constants.ts';
import { Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Translation } from './-translation.model.ts';
import { isEmpty } from 'lodash-es';

const getTranslations = () =>
  axios.get<Translation[]>('/translations').then(res => res.data);

const TranslationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: translations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['translations'],
    queryFn: getTranslations,
  });

  return (
    <div>
      <KBanner label="TRADUCERI" />
      {isLoggedIn && (
        <KAddButton
          className={'position'}
          onClick={() => setIsModalOpen(true)}
        />
      )}
      {isModalOpen && <KAddTranslationModal setIsOpen={setIsModalOpen} />}
      <div className="flex">
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <span>
            Traducerile nu pot fi afișate momentan. Reveniți mai târziu!
          </span>
        ) : isEmpty(translations) ? (
          <span>Nu există traduceri momentan.</span>
        ) : (
          translations?.map((item, index) => (
            <KTranslationCard
              key={index}
              summaryText={item.description}
              link={item.links[0]?.url}
              translationImage={
                BASE_URL + `/pics/translations/${item.id}${item.coverExtension}`
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/research/publications/translations/')({
  component: TranslationPage,
});

export default TranslationPage;
