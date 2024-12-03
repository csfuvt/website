import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import styles from './styles.module.css';
import { KMovingBanner } from '../-components/KMovingBanner/KMovingBanner';
import home2 from '../../../public/home2.jpg';
import home0 from '../../../public/home0.png';
import axios from 'axios';
import { Announcement } from './-announcement.model.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { KAddButton } from '../-components/KAddButton/KAddButton.tsx';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import KAnnouncementCard from '../-components/KAnnouncementCard/KAnnouncementCard.tsx';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

const images = [home0, home2];

export interface AnnouncementForm {
  title: string;
  link: string;
  publicationDate: string;
}

const addAnnouncement = ({
  title,
  link,
  publicationDate,
}: AnnouncementForm) => {
  return axios
    .post<Announcement>(`/announcements`, {
      title,
      link,
      publicationDate,
    })
    .then(res => res.data);
};

const getAnnouncements = () =>
  axios
    .get<Announcement[]>('/announcements/1/all-items')
    .then(res => res.data.reverse().slice(0, 3));

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: announcements,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['homeAnnouncements'],
    queryFn: getAnnouncements,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    setValue,
  } = useForm<AnnouncementForm>({
    defaultValues: {
      title: '',
      link: '',
      publicationDate: '',
    },
  });

  const showModal = () => {
    const currentDate = format(new Date(), 'dd MMMM yyyy', { locale: ro });
    setValue('publicationDate', currentDate);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    reset();
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addAnnouncement,
    onError: () => toast.error('Nu s-a putut adăuga anunțul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['homeAnnouncements'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Anunțul a fost adăugat cu succes.');
    },
  });

  const onSubmit: SubmitHandler<AnnouncementForm> = data => {
    mutate(data);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCacheInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: ['homeAnnouncements'] });
  };

  return (
    <>
      <KMovingBanner />
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <div className={styles.boxContainer}>
            <div className={styles.imageSliderContainer}>
              <button className={styles.arrowButton} onClick={handlePrev}>
                {'<'}
              </button>
              <img
                src={images[currentIndex]}
                alt="Slider"
                className={styles.image}
              />
              <button className={styles.arrowButton} onClick={handleNext}>
                {'>'}
              </button>
            </div>
          </div>

          <div className={styles.boxContainer}>
            {isLoggedIn && (
              <KAddButton className={'position'} onClick={showModal} />
            )}
            <Modal
              title="Creează un anunț"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Renunță
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={isPending}
                  disabled={!isValid}
                  onClick={handleSubmit(onSubmit)}>
                  Salvează
                </Button>,
              ]}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: 'Titlul este un câmp obligatoriu',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      status={errors.title ? 'error' : ''}
                      placeholder={errors.title?.message ?? 'Titlul anunțului'}
                      value={value}
                      onChange={onChange}
                      allowClear
                    />
                  )}
                />
                <Controller
                  name="link"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      status={errors.link ? 'error' : ''}
                      placeholder={errors.link?.message ?? 'Linkuri (opțional)'}
                      value={value}
                      onChange={onChange}
                      allowClear
                    />
                  )}
                />
                <Controller
                  name="publicationDate"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input type="hidden" value={value} />
                  )}
                />
              </Space>
            </Modal>

            <h1>Anunțuri</h1>
            <a href="announcements">
              <button className={styles.buttonAnunt}>
                Vezi toate anunțurile &gt;
              </button>
            </a>
            <br />
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Anunțurile nu pot fi afișate momentan. Reveniți mai târziu!
              </span>
            ) : isEmpty(announcements) ? (
              <div className="flex">
                <span>Nu există anunțuri momentan.</span>
              </div>
            ) : (
              announcements?.map(announcements => {
                return (
                  <KAnnouncementCard
                    key={announcements.id}
                    id={announcements.id}
                    title={announcements.title}
                    link={announcements.link}
                    publicationDate={announcements.publicationDate}
                    invalidateCache={handleCacheInvalidation}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});

export default HomePage;
