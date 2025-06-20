import styles from './KPhdThesisCard.module.css';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
  Upload,
  UploadProps,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  InboxOutlined,
  MoreOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PhdThesis } from '../../events_/phd-theses/-phd-thesis.model.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { BASE_URL } from '../../../constants.ts';

interface PhdThesisForm {
  title: string;
  candidate: string;
  leader: string;
  organizers: string;
  meetingDate: string;
  councilPresident: string;
  councilReviewers: string;
  thesisSummary: string;
  links: string;
  posterUrl?: string;
}

const editPhdThesis = async ({
  id,
  ...data
}: PhdThesisForm & { id: number }) => {
  const res = await axios.post<PhdThesis>(`/phd-thesis/${id}`, data);
  return res.data;
};

const deletePhdThesis = (id: number) =>
  axios.delete(`/phd-thesis/${id}`).then(res => res.data);

const archivePhdThesis = (id: number) =>
  axios.post(`/phd-thesis/archive/${id}/false`).then(res => res.data);

const unarchivePhdThesis = (id: number) =>
  axios.post(`/phd-thesis/archive/${id}/true`).then(res => res.data);

export const KPhdThesisCard = ({
  id,
  title,
  candidate,
  leader,
  organizers,
  meetingDate,
  councilPresident,
  councilReviewers,
  thesisSummary,
  active,
  links,
  posterUrl,
  invalidateCache,
}: {
  id: number;
  title: string;
  candidate: string;
  leader: string;
  organizers: string;
  meetingDate: string;
  councilPresident: string;
  councilReviewers: string;
  thesisSummary: string;
  active: boolean;
  links: string;
  posterUrl?: string;
  invalidateCache: () => void;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deletePhdThesis,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['phd-thesis'] });
      toast.success('Teza de doctorat a fost ștearsă cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere teza de doctorat',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți această teză de doctorat?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteMutation(id);
      },
    });
  };

  const { mutate: archiveMutation } = useMutation({
    mutationFn: archivePhdThesis,
    onSuccess: () => {
      toast.success('Teza de doctorat a fost arhivată cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare la arhivare'),
  });

  const { mutate: unarchiveMutation } = useMutation({
    mutationFn: unarchivePhdThesis,
    onSuccess: () => {
      toast.success('Teza de doctorat a fost dezarhivată cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare la dezarhivare'),
  });

  const showPropsConfirmArchive = () => {
    confirm({
      title: 'Arhivare teză de doctorat',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să arhivați această teză de doctorat?',
      okText: 'Arhivează',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        archiveMutation(id);
      },
    });
  };

  const showPropsConfirmUnarchive = () => {
    confirm({
      title: 'Dezarhivare teză de doctorat',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să dezarhivați această teză de doctorat?',
      okText: 'Dezarhivează',
      okType: 'primary',
      cancelText: 'Renunță',
      onOk() {
        unarchiveMutation(id);
      },
    });
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditModalOpen(true);
    resetForm({
      title,
      candidate,
      leader,
      organizers,
      meetingDate,
      councilPresident,
      councilReviewers,
      thesisSummary,
      links,
    }); // Resetăm valorile formularului cu datele curente
  };

  const handleCancelForEdit = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === ActionableButton.DELETE) {
      showPropsConfirm();
    } else if (e.key === ActionableButton.EDIT && active) {
      showEditModal();
    } else if (e.key === 'ARCHIVE') {
      showPropsConfirmArchive();
    } else if (e.key === 'UNARCHIVE') {
      showPropsConfirmUnarchive();
    }
  };

  const items: MenuProps['items'] = active
    ? [
        {
          key: ActionableButton.EDIT,
          label: 'Editează',
          icon: <EditOutlined />,
        },
        {
          key: ActionableButton.DELETE,
          danger: true,
          label: 'Șterge',
          icon: <DeleteOutlined />,
        },
        {
          key: 'ARCHIVE',
          danger: true,
          label: 'Arhivează',
          icon: <InboxOutlined />,
        },
      ]
    : [
        {
          key: ActionableButton.DELETE,
          danger: true,
          label: 'Șterge',
          icon: <DeleteOutlined />,
        },
        {
          key: 'UNARCHIVE',
          label: 'Dezarhivează',
          icon: <InboxOutlined />,
        },
      ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const {
    handleSubmit,
    reset: resetForm,
    formState: { errors, isValid },
    control,
  } = useForm<PhdThesisForm>({
    defaultValues: {
      title,
      candidate,
      leader,
      organizers,
      meetingDate,
      councilPresident,
      councilReviewers,
      thesisSummary,
      links,
      posterUrl,
    },
  });

  useEffect(() => {
    if (isEditModalOpen) {
      resetForm({
        title,
        candidate,
        leader,
        organizers,
        meetingDate,
        councilPresident,
        councilReviewers,
        thesisSummary,
        links,
        posterUrl,
      });
    }
  }, [
    title,
    candidate,
    leader,
    organizers,
    meetingDate,
    councilPresident,
    councilReviewers,
    thesisSummary,
    links,
    posterUrl,
    isEditModalOpen,
    resetForm,
  ]);

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editPhdThesis,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['phd-thesis'] });
      toast.success('Teza de doctorat a fost editată cu succes');
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  const onSubmit: SubmitHandler<PhdThesisForm> = async data => {
    try {
      await editMutation({ ...data, id });

      if (posterFileList.length > 0) {
        const formData = new FormData();
        formData.append('posterUrl', posterFileList[0]);

        await axios.post(`/phd-thesis/${id}/poster`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success('Poster actualizat cu succes!');
      }

      await queryClient.invalidateQueries({ queryKey: ['phd-thesis'] });
      handleCancelForEdit();
    } catch (error) {
      toast.error('A apărut o eroare la salvarea tezei de doctorat!');
      console.error(error);
    }
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
    <div className={styles.card}>
      <div className={styles.contentWrapper}>
        {posterUrl && (
          <div className={styles.posterContainer}>
            <img
              src={`${BASE_URL}/files/phd-thesis/${posterUrl}`}
              alt="Poster"
              className={styles.posterImage}
              // onClick={() =>
              //   window.open(
              //     `${BASE_URL}/files/phd-thesis/${posterUrl}`,
              //    '_blank',
              //    'noopener,noreferrer'
              // )
              //}
            />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <p>
            <strong>Doctorand:</strong> {candidate}
          </p>

          {leader && (
            <p>
              <strong>Coordonator științific:</strong> {leader}
            </p>
          )}

          {organizers && (
            <p>
              <strong>Organizatori:</strong> {organizers}
            </p>
          )}

          {meetingDate && (
            <p>
              <strong>Data susținerii:</strong> {meetingDate}
            </p>
          )}

          {councilPresident && (
            <p>
              <strong>Președinte comisie:</strong> {councilPresident}
            </p>
          )}

          {councilReviewers && (
            <p>
              <strong>Referenți:</strong> {councilReviewers}
            </p>
          )}

          {thesisSummary && (
            <p>
              <strong>Rezumatul tezei:</strong> {thesisSummary}
            </p>
          )}
        </div>
      </div>
      <div>
        {links && (
          <div className={styles.linkContainer}>
            <a href={links} target="_blank" className={styles.logo}>
              <FontAwesomeIcon
                icon={faGlobe}
                style={{ color: '#004992', width: '40px', height: '40px' }}
              />
            </a>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div className={styles.actions}>
          <Dropdown
            menu={menuProps}
            placement="bottomLeft"
            arrow
            trigger={['click']}>
            <Button
              type="primary"
              icon={<MoreOutlined />}
              shape="circle"
              loading={isDeletePending}
            />
          </Dropdown>
        </div>
      )}
      {active && (
        <Modal
          title="Editează teza de doctorat"
          open={isEditModalOpen}
          onCancel={handleCancelForEdit}
          footer={[
            <Button key="back" onClick={handleCancelForEdit}>
              Renunță
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isEditPending}
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}>
              Salvează
            </Button>,
          ]}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: 'Titlul tezei de doctorat este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
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
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
                  status={errors.candidate ? 'error' : ''}
                  placeholder={errors.candidate?.message ?? 'Doctorandul tezei'}
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
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
                  status={errors.leader ? 'error' : ''}
                  placeholder={errors.leader?.message ?? 'Coordonatorul tezei'}
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
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
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
              name="councilPresident"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
                  status={errors.councilPresident ? 'error' : ''}
                  placeholder={
                    errors.councilPresident?.message ?? 'Președinte comisie'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="councilReviewers"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
                  status={errors.councilReviewers ? 'error' : ''}
                  placeholder={errors.councilReviewers?.message ?? 'Referenți'}
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
                <Input.TextArea
                  autoSize={{ minRows: 1, maxRows: 100 }}
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
                  placeholder={errors.links?.message ?? 'Link'}
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
                <Space
                  direction="horizontal"
                  size="middle"
                  style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
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

                  {posterUrl && (
                    <Button
                      danger
                      onClick={async () => {
                        try {
                          await axios.delete(`/phd-thesis/${id}/poster`);
                          toast.success('Posterul a fost șters!');
                          setPosterFileList([]);
                          field.onChange(''); // Golește valoarea din formular
                          await queryClient.invalidateQueries({
                            queryKey: ['phd-thesis'],
                          });
                        } catch (error) {
                          toast.error('Eroare la ștergerea posterului!');
                          console.error(error);
                        }
                      }}>
                      Șterge fotografia
                    </Button>
                  )}
                </Space>
              )}
            />
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default KPhdThesisCard;
