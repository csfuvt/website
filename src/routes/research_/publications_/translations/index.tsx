import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../-components/KBanner/KBanner';
import './styles.css';
import { KAddButton } from '../../../-components/KAddButton/KAddButton.tsx';
import { KAddTranslationModal } from '../../../-components/KAddTranslationModal/KAddTranslationModal.tsx';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth.ts';
import axios from 'axios';
import { BASE_URL } from '../../../../constants.ts';
import { Spin } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Translation } from './-translation.model.ts';
import { isEmpty } from 'lodash-es';
import KTranslationCard2 from '../../../-components/KTranslationCard2/KTranslationCard2.tsx';

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

  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ['translations'] });
  };

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
          translations?.map(item => (
            <KTranslationCard2
              key={item.id}
              id={item.id}
              title={item.links[0]?.label}
              link={item.links[0]?.url}
              description={item.description}
              author={item.links[0]?.author}
              translator={item.translator}
              editura={item.links[0]?.editura}
              year={item.links[0]?.year}
              bionote={item.links[0]?.bionote}
              bookImage={
                BASE_URL + `/pics/translations/${item.id}${item.coverExtension}`
              }
              invalidateCache={invalidateCache}
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
