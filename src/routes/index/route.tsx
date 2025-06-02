import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import styles from './styles.module.css';
import { KMovingBanner } from '../-components/KMovingBanner/KMovingBanner.tsx';
import axios from 'axios';
import { Announcement } from './-announcement.model.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Input, Modal, Space, Spin, Upload } from 'antd';
import { isEmpty } from 'lodash-es';
import KAnnouncementCard from '../-components/KAnnouncementCard/KAnnouncementCard.tsx';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { BASE_URL } from '../../constants.ts';
import EditKMovingBanner from '../-components/KMovingBanner/EditKMovingBanner.tsx';
import EditKMovingBannerJos from '../-components/KMovingBanner/EditKMovingBannerJos.tsx';

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
    data: bannerJos = [],
    isLoading: isBannerLoading,
    isError: isBannerError,
  } = useQuery({
    queryKey: ['bannerJos'],
    queryFn: async () =>
      axios.get(`${BASE_URL}/bannerjos`).then(res => res.data),
  });

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
      prevIndex === 0 ? bannerJos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === bannerJos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCacheInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: ['homeAnnouncements'] });
  };

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const handleBannerUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${BASE_URL}/banner/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Imaginea a fost încărcată cu succes.');
      setIsBannerModalOpen(false);
    } catch (error) {
      console.error('Eroare la încărcarea imaginii:', error);
      toast.error('Nu s-a putut încărca imaginea.');
    }
  };

  // ---------

  const [isBannerJosModalOpen, setIsBannerJosModalOpen] = useState(false);

  const handleBannerJosUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${BASE_URL}/bannerjos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Imaginea a fost încărcată cu succes.');
      setIsBannerModalOpen(false);
    } catch (error) {
      console.error('Eroare la încărcarea imaginii:', error);
      toast.error('Nu s-a putut încărca imaginea.');
    }
  };

  const [isEditModalOpenB, setIsEditModalOpenB] = useState(false);

  const showEditModalB = () => {
    setIsEditModalOpenB(true);
  };

  const handleEditModalCancelB = async () => {
    setIsEditModalOpenB(false);
    await queryClient.invalidateQueries({ queryKey: ['banner'] });
  };

  /// /==-=-=--=-=

  const [isEditModalOpenBJos, setIsEditModalOpenBJos] = useState(false);

  const showEditModalBJos = () => {
    setIsEditModalOpenBJos(true);
  };

  const handleEditModalCancelBJos = async () => {
    setIsEditModalOpenBJos(false);
    await queryClient.invalidateQueries({ queryKey: ['bannerJos'] });
  };

  return (
    <>
      <KMovingBanner />
      {!isError && !isLoading && isLoggedIn && (
        <center>
          <Space
            direction="vertical"
            style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Space direction="horizontal" size="middle">
              <div className={styles.butonulBannerAdd}>
                <Button
                  type="primary"
                  onClick={() => setIsBannerModalOpen(true)}>
                  Adaugă o imagine pe bandă
                </Button>
              </div>
              <div className={styles.butonulBannerAdd}>
                <Button type="default" onClick={showEditModalB}>
                  Editează banda cu imagini
                </Button>
              </div>
            </Space>

            <Space direction="horizontal" size="middle">
              <div className={styles.butonulBannerAdd}>
                <Button
                  type="primary"
                  onClick={() => setIsBannerJosModalOpen(true)}>
                  Adaugă o imagine în slider jos
                </Button>
              </div>
              <div className={styles.butonulBannerAdd}>
                <Button type="default" onClick={showEditModalBJos}>
                  Editează slider jos
                </Button>
              </div>
            </Space>
          </Space>
        </center>
      )}
      <div className={styles.pageContainer}>
        <div className={styles.sectionContainer}>
          <div className={styles.boxContainer}>
            {isBannerError ? (
              <div style={{ color: 'red', textAlign: 'center' }}>
                Eroare la încărcarea imaginilor.
              </div>
            ) : isBannerLoading ? (
              <Spin />
            ) : bannerJos.length > 0 ? (
              <div className={styles.imageSliderContainer}>
                <button className={styles.arrowButton} onClick={handlePrev}>
                  {'<'}
                </button>
                <img
                  src={`${BASE_URL}${bannerJos[currentIndex]?.imageUrl}`}
                  alt="Homepage"
                  className={styles.image}
                />
                <button className={styles.arrowButton} onClick={handleNext}>
                  {'>'}
                </button>
              </div>
            ) : (
              <div className={styles.emptyBannerMessage}>
                Nu există imagini în slider.
              </div>
            )}
          </div>

          <div className={styles.boxContainer}>
            {/*{isLoggedIn && (*/}
            {/*  <KAddButton className={'position'} onClick={showModal} />*/}
            {/*)}*/}
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

            <Modal
              title="Încarcă o imagine pe bandă"
              open={isBannerModalOpen}
              onCancel={() => setIsBannerModalOpen(false)}
              footer={null}>
              <p>Selectează o imagine (JPG / JPEG / PNG):</p>
              <Upload
                accept=".jpg,.jpeg,.png"
                beforeUpload={file => {
                  handleBannerUpload(file);
                  return false;
                }}
                showUploadList={false}>
                <Button type="primary">Selectează imaginea</Button>
              </Upload>
              <p>
                <b>Atenție!</b> Fotografiile trebuie să fie cu rezoluția de{' '}
                <b>1400x330</b>
              </p>
            </Modal>

            <Modal
              title="Încarcă o imagine pe slider-ul de jos"
              open={isBannerJosModalOpen}
              onCancel={() => setIsBannerJosModalOpen(false)}
              footer={null}>
              <p>Selectează o imagine (JPG / JPEG / PNG):</p>
              <Upload
                accept=".jpg,.jpeg,.png"
                beforeUpload={file => {
                  handleBannerJosUpload(file);
                  return false;
                }}
                showUploadList={false}>
                <Button type="primary">Selectează imaginea</Button>
              </Upload>
              <p>
                <b>Atenție!</b> Rezoluție recomandată (minim) <b>1386x1772</b>
              </p>
            </Modal>

            <Modal
              title="Editează banda cu imagini"
              open={isEditModalOpenB}
              onCancel={handleEditModalCancelB}
              footer={null}
              width={1200}>
              <EditKMovingBanner />
            </Modal>

            <Modal
              title="Editează slider-ul de jos"
              open={isEditModalOpenBJos}
              onCancel={handleEditModalCancelBJos}
              footer={null}
              width={1200}>
              <EditKMovingBannerJos />
            </Modal>

            <h1>Anunțuri</h1>
            {!isError && !isLoading && isLoggedIn && (
              <div style={{ marginBottom: '1rem' }}>
                <Button type="primary" onClick={showModal}>
                  Adaugă un anunț
                </Button>
              </div>
            )}
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
