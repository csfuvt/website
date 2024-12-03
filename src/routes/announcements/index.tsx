import { KBanner } from '../-components/KBanner/KBanner';
import styles from './AnnouncementsPage.module.css';
import axios from 'axios';
import { AnnouncementsAll } from './-announcements.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Spin, Pagination } from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';
import { KAddButton } from '../-components/KAddButton/KAddButton.tsx';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.ts';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import KAnnouncementCard from '../-components/KAnnouncementCard/KAnnouncementCard.tsx';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';

export interface AnnouncementAllForm {
  title: string;
  link: string;
  publicationDate: string;
}

const addAnnouncementsAll = ({
  title,
  link,
  publicationDate,
}: AnnouncementAllForm) => {
  return axios
    .post<AnnouncementsAll>(`/announcements`, {
      title,
      link,
      publicationDate,
    })
    .then(res => res.data);
};

const getAnnouncementsAll = async (page: number, pageSize: number) => {
  const { data } = await axios.get('/announcements', {
    params: { page, pageSize },
  });
  return data;
};

const AnnouncementsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const { isLoggedIn } = useAuth();

  const {
    data: announcementsall,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allAnnouncements', currentPage, pageSize],
    queryFn: async () => {
      const response = await getAnnouncementsAll(currentPage, pageSize);
      setTotalItems(response.total); // Setăm totalul elementelor
      return response.data;
    },
    //keepPreviousData: true,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
    reset,
  } = useForm<AnnouncementAllForm>({
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
    mutationFn: addAnnouncementsAll,
    onError: () => toast.error('Nu s-a putut adăuga anunțul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['allAnnouncements'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Anunțul a fost adăugat cu succes.');
    },
  });

  const onSubmit: SubmitHandler<AnnouncementAllForm> = data => {
    mutate(data);
  };

  const handleCacheInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: ['allAnnouncements'] });
  };

  return (
    <div className={styles.page}>
      <KBanner label="Anunțuri - arhivă" />
      <div className={styles.section}>
        <div className={styles.cardsContainer}>
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

          <div className="flex">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Anunțurile nu pot fi afișate momentan. Reveniți mai târziu!
              </span>
            ) : isEmpty(announcementsall) ? (
              <div className="flex">
                <span>Nu există anunțuri momentan.</span>
              </div>
            ) : (
              announcementsall?.map((announcement: AnnouncementsAll) => (
                <KAnnouncementCard
                  key={announcement.id}
                  id={announcement.id}
                  title={announcement.title}
                  link={announcement.link}
                  publicationDate={announcement.publicationDate}
                  invalidateCache={handleCacheInvalidation}
                />
              ))
            )}
          </div>
          <div className={styles.paginationContainer}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalItems}
              showSizeChanger
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              }}
              pageSizeOptions={['5', '10', '20']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/announcements/')({
  component: AnnouncementsPage,
});

export default AnnouncementsPage;
