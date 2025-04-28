import { KBanner } from '../../-components/KBanner/KBanner.tsx';
import styles from './PhdThesisPage.module.css';
import axios from 'axios';
import { PhdThesis } from './-phd-thesis.model.ts';
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
import KPhdThesisCard from '../../-components/KPhdThesisCard/KPhdThesisCard.tsx';
import dayjs from 'dayjs';
import { UploadOutlined } from '@ant-design/icons';

export interface PhdThesisForm {
  title: string;
  candidate: string;
  leader: string;
  organizers: string;
  meetingDate: string;
  councilMembers: string;
  thesisSummary: string;
  links: string;
  posterUrl: string;
}

const addPhdThesis = ({
  title,
  candidate,
  leader,
  organizers,
  meetingDate,
  councilMembers,
  thesisSummary,
  links,
  posterUrl,
}: PhdThesisForm) => {
  return axios
    .post<PhdThesis>(`/phd-thesis`, {
      title,
      candidate,
      leader,
      organizers,
      meetingDate,
      councilMembers,
      thesisSummary,
      links,
      posterUrl,
    })
    .then(res => res.data);
};

const getPhdThesis = () =>
  axios.get<PhdThesis[]>('/phd-thesis').then(res => res.data.reverse());

const PhdThesisPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: phdThesis,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['phd-thesis'],
    queryFn: getPhdThesis,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<PhdThesisForm>({
    defaultValues: {
      title: '',
      candidate: '',
      leader: '',
      organizers: '',
      meetingDate: '',
      councilMembers: '',
      thesisSummary: '',
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
  const { mutate, isPending } = useMutation({
    mutationFn: addPhdThesis,
    onError: () => toast.error('Nu s-a putut adăuga teza de doctorat!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['phd-thesis'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Teza de doctorat a fost adăugată cu succes.');
    },
  });

  const onSubmit: SubmitHandler<PhdThesisForm> = data => {
    mutate(data);
  };

  const handleCacheInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: ['phd-thesis'] });
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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 2MB');
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
      <KBanner label="SUSȚINERI DE TEZE DOCTORALE" />
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
              (window.location.href = '/events/phd-theses/archive')
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
            title="Creează o teză de doctorat"
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
                  required: 'Titlul tezei de doctorat este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.title ? 'error' : ''}
                    placeholder={
                      errors.title?.message ?? 'Titlul tezei de doctorat'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="candidate"
                control={control}
                rules={{
                  required: 'Doctorandul tezei este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.candidate ? 'error' : ''}
                    placeholder={
                      errors.candidate?.message ?? 'Doctorandul tezei'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="leader"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.leader ? 'error' : ''}
                    placeholder={
                      errors.leader?.message ?? 'Coordonatorul tezei'
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
                    placeholder={errors.organizers?.message ?? 'Organizatori'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="meetingDate"
                control={control}
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
                name="councilMembers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.councilMembers ? 'error' : ''}
                    placeholder={
                      errors.councilMembers?.message ?? 'Membri comisiei'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="thesisSummary"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.thesisSummary ? 'error' : ''}
                    placeholder={
                      errors.thesisSummary?.message ??
                      'Rezumatul tezei de doctorat'
                    }
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
                  <Input.TextArea
                    status={errors.links ? 'error' : ''}
                    placeholder={errors.links?.message ?? 'Link-uri'}
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
                Tezele de doctorat nu pot fi afișate momentan. Reveniți mai
                târziu!
              </span>
            ) : isEmpty(phdThesis) ? (
              <div className="flex">
                <span>Nu există teze de doctorat momentan.</span>
              </div>
            ) : (
              phdThesis?.map(PhdThesis => {
                return (
                  <KPhdThesisCard
                    key={PhdThesis.id}
                    id={PhdThesis.id}
                    title={PhdThesis.title}
                    candidate={PhdThesis.candidate}
                    leader={PhdThesis.leader}
                    organizers={PhdThesis.organizers}
                    meetingDate={PhdThesis.meetingDate}
                    councilMembers={PhdThesis.councilMembers}
                    thesisSummary={PhdThesis.thesisSummary}
                    active={PhdThesis.active}
                    links={PhdThesis.links}
                    posterUrl={PhdThesis.posterUrl}
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

export const Route = createFileRoute('/events/phd-theses/')({
  component: PhdThesisPage,
});

export default PhdThesisPage;
