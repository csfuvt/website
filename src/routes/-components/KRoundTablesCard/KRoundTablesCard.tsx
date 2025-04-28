import styles from './KRoundTablesCard.module.css';
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
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EventRoundTable } from '../../events_/round-tables/-round-tables.model.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { BASE_URL } from '../../../constants.ts';

interface EventRoundTableForm {
  title: string;
  organizers?: string;
  meetingDate: string;
  members: string;
  links?: string;
  posterUrl?: string;
}

const editEventRoundTable = async (
  data: EventRoundTableForm & { id: number }
) => {
  const { id, ...body } = data;
  const res = await axios.post<EventRoundTable>(`/round-tables/${id}`, body);
  return res.data;
};

const deleteEventRoundTable = (id: number) =>
  axios.delete(`/round-tables/${id}`).then(res => res.data);

const archiveEventRoundTable = (id: number) =>
  axios.post(`/round-tables/archive/${id}/false`).then(res => res.data);

const unarchiveEventRoundTable = (id: number) =>
  axios.post(`/round-tables/archive/${id}/true`).then(res => res.data);

export const KRoundTablesCard = ({
  id,
  title,
  organizers,
  meetingDate,
  members,
  links,
  active,
  posterUrl,
  invalidateCache,
}: {
  id: number;
  title: string;
  organizers?: string;
  meetingDate: string;
  members: string;
  links?: string;
  active: boolean;
  posterUrl?: string;
  invalidateCache: () => void;
}) => {
  const { isLoggedIn } = useAuth();

  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteEventRoundTable,
    onSuccess: () => {
      toast.success('Masa rotundă a fost ștearsă cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere eveniment',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți această masă rotundă?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteMutation(id);
      },
    });
  };

  const { mutate: archiveMutation } = useMutation({
    mutationFn: archiveEventRoundTable,
    onSuccess: () => {
      toast.success('Masa rotundă a fost arhivată cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare la arhivare'),
  });

  const { mutate: unarchiveMutation } = useMutation({
    mutationFn: unarchiveEventRoundTable,
    onSuccess: () => {
      toast.success('Masa rotundă a fost dezarhivată cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare la dezarhivare'),
  });

  const showPropsConfirmArchive = () => {
    confirm({
      title: 'Arhivare masă rotundă',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să arhivați această masă rotundă?',
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
      title: 'Dezarhivare masă rotundă',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să dezarhivați această masă rotundă?',
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
  } = useForm<EventRoundTableForm>({
    defaultValues: {
      title,
      organizers,
      meetingDate,
      members,
      links,
      posterUrl,
    },
  });

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editEventRoundTable,
    onSuccess: updatedData => {
      toast.success('Masa rotundă a fost editată cu succes');
      invalidateCache();
      resetForm({
        title: updatedData.title,
        organizers: updatedData.organizers,
        meetingDate: updatedData.meetingDate,
        members: updatedData.members,
        links: updatedData.links,
        posterUrl: updatedData.posterUrl,
      });
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  const onSubmit: SubmitHandler<EventRoundTableForm> = async data => {
    await editMutation({ ...data, id });

    if (posterFileList.length > 0) {
      const formData = new FormData();
      formData.append('posterUrl', posterFileList[0]);

      try {
        await axios.post(`/round-tables/${id}/poster`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Poster actualizat cu succes!');
      } catch (error) {
        toast.error('A apărut o eroare la încărcarea posterului!');
      }
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
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {organizers && (
          <p>
            <strong>Organizatori:</strong> {organizers}
          </p>
        )}
        <p>
          <strong>Data întâlnirii:</strong> {meetingDate}
        </p>
        <p>
          <strong>Participanți:</strong> {members}
        </p>
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
        {posterUrl && (
          <div className={styles.posterContainer}>
            <strong>Afiș:</strong>

            <img
              src={`${BASE_URL}/files/round-tables/${posterUrl}`}
              alt="Poster"
              className={styles.posterImage}
              onClick={() =>
                window.open(posterUrl, '_blank', 'noopener,noreferrer')
              }
            />
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
          title="Editează masa rotundă"
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
              rules={{ required: 'Titlul este obligatoriu' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Titlul"
                  status={errors.title ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="organizers"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Organizatori (opțional)"
                  status={errors.organizers ? 'error' : ''}
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
              rules={{ required: 'Participanții sunt obligatorii' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Participanți"
                  status={errors.members ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="links"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Linkuri (opțional)"
                  status={errors.links ? 'error' : ''}
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
                  <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
                </Upload>
              )}
            />
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default KRoundTablesCard;
