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
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  InboxOutlined,
  MoreOutlined,
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

interface EventRoundTableForm {
  title: string;
  organizers?: string;
  meetingDate: string;
  members: string;
  links?: string;
}

const editEventRoundTable = async ({
  id,
  ...data
}: EventRoundTableForm & { id: number }) => {
  const res = await axios.post<EventRoundTable>(`/round-tables/${id}`, data);
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
  invalidateCache,
}: {
  id: number;
  title: string;
  organizers?: string;
  meetingDate: string;
  members: string;
  links?: string;
  active: boolean;
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
      });
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  const onSubmit: SubmitHandler<EventRoundTableForm> = data => {
    editMutation({ ...data, id });
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
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default KRoundTablesCard;
