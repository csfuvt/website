import styles from './KRoundTablesCard.module.css';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import { Button, Dropdown, Input, MenuProps, Modal, Space } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
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

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

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

export const KRoundTablesCard = ({
  id,
  title,
  organizers,
  meetingDate,
  members,
  links,
  invalidateCache,
}: {
  id: number;
  title: string;
  organizers?: string;
  meetingDate: string;
  members: string;
  links?: string;
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
    } else if (e.key === ActionableButton.EDIT) {
      showEditModal();
    }
  };

  const items: MenuProps['items'] = [
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
          <strong>Data întâlnirii:</strong> {formatDate(meetingDate)}
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
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Data întâlnirii"
                type="date"
                status={errors.meetingDate ? 'error' : ''}
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
    </div>
  );
};

export default KRoundTablesCard;
