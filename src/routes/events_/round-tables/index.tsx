import { KBanner } from '../../-components/KBanner/KBanner';
import styles from './RoundTablesPage.module.css';
import axios from 'axios';
import { EventRoundTable } from './-round-tables.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Space,
  Spin,
  Upload,
  UploadProps,
} from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';
import { KAddButton } from '../../-components/KAddButton/KAddButton.tsx';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth.ts';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import KRoundTablesCard from '../../-components/KRoundTablesCard/KRoundTablesCard.tsx';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';

export interface RoundTableForm {
  title: string;
  organizers: string;
  meetingDate: string;
  members: string;
  links: string;
  posterUrl: string;
}

const addRoundTable = ({
  title,
  organizers,
  meetingDate,
  members,
  links,
  posterUrl,
}: RoundTableForm) => {
  return axios
    .post<EventRoundTable>(`/round-tables`, {
      title,
      organizers,
      meetingDate,
      members,
      links,
      posterUrl,
    })
    .then(res => res.data);
};

const getRoundTables = () =>
  axios.get<EventRoundTable[]>('/round-tables').then(res => res.data.reverse());

const RoundTablesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: roundTables,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['roundTables'],
    queryFn: getRoundTables,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<RoundTableForm>({
    defaultValues: {
      title: '',
      organizers: '',
      meetingDate: '',
      members: '',
      links: '',
      posterUrl: '',
    },
  });

  const showModal = () => {
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
  const { isPending } = useMutation({
    mutationFn: addRoundTable,
    onError: () => toast.error('Nu s-a putut adăuga masa rotundă!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roundTables'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Masa rotundă a fost adăugată cu succes.');
    },
  });

  const onSubmit: SubmitHandler<RoundTableForm> = async data => {
    try {
      const created = await axios
        .post<EventRoundTable>(`/round-tables`, {
          ...data,
          posterUrl: '',
        })
        .then(res => res.data);

      if (posterFileList.length > 0) {
        const formData = new FormData();
        formData.append('posterUrl', posterFileList[0]);

        await axios.post(`/round-tables/${created.id}/poster`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Poster încărcat cu succes!');
      }

      await queryClient.invalidateQueries({ queryKey: ['roundTables'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Masa rotundă a fost adăugată cu succes.');
    } catch (err) {
      console.error(err);
      toast.error('Nu s-a putut adăuga masa rotundă!');
    }
  };

  const handleCacheInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: ['roundTables'] });
  };

  const [posterFileList, setPosterFileList] = useState<File[]>([]);

  const uploadPosterProps: UploadProps = {
    onRemove: () => setPosterFileList([]),
    beforeUpload: file => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg';
      if (!isJpgOrPng) {
        toast.error('Se pot adăuga doar fișiere JPG / PNG!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 30;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 30MB');
        return false;
      }
      setPosterFileList([file]);
      return false; // stop automatic upload
    },
    fileList: posterFileList.map(file => ({
      uid: file.name,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file),
    })),
  };

  return (
    <div className={styles.page}>
      <KBanner label="MESE ROTUNDE" />
      <div className={styles.section}>
        <div
          style={{
            marginTop: '60px',
            marginBottom: '-60px',
            textAlign: 'center',
          }}>
          <Button
            type="primary"
            onClick={() =>
              (window.location.href = '/events/round-tables/archive')
            }
            size="large">
            Mergi la Arhivă
          </Button>
        </div>
        <div className={styles.cardsContainer}>
          {isLoggedIn && (
            <KAddButton className={'position'} onClick={showModal} />
          )}
          <Modal
            title="Creează o masă rotundă"
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
                    placeholder={
                      errors.title?.message ?? 'Titlul mesei rotunde'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="organizers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.organizers ? 'error' : ''}
                    placeholder={
                      errors.organizers?.message ?? 'Organizatori (opțional)'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="meetingDate"
                control={control}
                rules={{ required: 'Data întâlnirii este obligatorie' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <DatePicker
                    format="DD.MM.YYYY"
                    value={value ? dayjs(value, 'DD.MM.YYYY') : null}
                    onChange={(_date, dateString) => {
                      onChange(dateString);
                    }}
                    placeholder={error?.message || 'Selectați o dată'}
                    status={error ? 'error' : ''}
                    allowClear
                  />
                )}
              />
              <Controller
                name="members"
                control={control}
                rules={{
                  required: 'Participanții sunt un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.members ? 'error' : ''}
                    placeholder={errors.members?.message ?? 'Participanți'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="links"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.links ? 'error' : ''}
                    placeholder={errors.links?.message ?? 'Linkuri (opțional)'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="posterUrl"
                control={control}
                render={({ field }) => (
                  <Upload
                    {...uploadPosterProps}
                    listType="picture"
                    showUploadList={true}
                    onChange={info => {
                      if (info.file.status === 'done' && info.file.response) {
                        const uploadedUrl = info.file.response.url;
                        field.onChange(uploadedUrl);
                        toast.success('Poster actualizat!');
                      } else if (info.file.status === 'error') {
                        toast.error('Eroare la actualizarea posterului');
                      }
                    }}>
                    <Button icon={<UploadOutlined />}>
                      Selectează imaginea
                    </Button>
                  </Upload>
                )}
              />
            </Space>
          </Modal>
          <div className="flex">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Mesele rotunde nu pot fi afișate momentan. Reveniți mai târziu!
              </span>
            ) : isEmpty(roundTables) ? (
              <div className="flex">
                <span>Nu există mese rotunde momentan.</span>
              </div>
            ) : (
              roundTables?.map(eventRoundTable => {
                return (
                  <KRoundTablesCard
                    key={eventRoundTable.id}
                    id={eventRoundTable.id}
                    title={eventRoundTable.title}
                    organizers={eventRoundTable.organizers}
                    meetingDate={eventRoundTable.meetingDate}
                    members={eventRoundTable.members}
                    links={eventRoundTable.links}
                    active={eventRoundTable.active}
                    posterUrl={eventRoundTable.posterUrl}
                    invalidateCache={handleCacheInvalidation}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/events/round-tables/')({
  component: RoundTablesPage,
});

export default RoundTablesPage;
