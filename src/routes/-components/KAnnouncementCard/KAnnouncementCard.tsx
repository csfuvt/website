import styles from './KAnnouncementCard.module.css';
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
import { AnnouncementsAll } from '../../announcements/-announcements.model.ts';

interface AnnouncementForm {
  title: string;
  link: string;
}

const editAnnouncements = async ({
  id,
  ...data
}: AnnouncementForm & { id: number }) => {
  const res = await axios.post<AnnouncementsAll>(`/announcements/${id}`, data);
  return res.data;
};

const deleteAnnouncements = (id: number) =>
  axios.delete(`/announcements/${id}`).then(res => res.data);

export const KAnnouncementsCard = ({
  id,
  title,
  link,
  publicationDate,
  invalidateCache,
}: {
  id: number;
  title: string;
  link: string;
  publicationDate: string;
  invalidateCache: () => void;
}) => {
  const { isLoggedIn } = useAuth();

  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteAnnouncements,
    onSuccess: () => {
      toast.success('Anunțul a fost șters cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere anunț',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți acest anunț?',
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
  } = useForm<AnnouncementForm>({
    defaultValues: {
      title,
      link,
    },
  });

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editAnnouncements,
    onSuccess: updatedData => {
      toast.success('Anunțul a fost editat cu succes!');
      invalidateCache();
      resetForm({
        title: updatedData.title,
        link: updatedData.link,
      });
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  const onSubmit: SubmitHandler<AnnouncementForm> = data => {
    editMutation({ ...data, id });
  };
  return (
    <>
      <div className={styles.cardAnunt}>
        <h2 className={styles.titleAnunt}>{title}</h2>
        <p>
          <i>Publicat: {publicationDate}</i>
        </p>

        {link && (
          <p>
            <a href={link} target="_blank">
              <button className={styles.buttonAnunt}>Click aici</button>
            </a>
          </p>
        )}

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
          title="Editează proiectul"
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
                required: 'Titlul proiectului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={errors.title ? 'error' : ''}
                  placeholder={errors.title?.message ?? 'Titlul proiectului'}
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
                  placeholder="Link (opțional)"
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
          </Space>
        </Modal>
      </div>
      <br></br>
    </>
  );
};

export default KAnnouncementsCard;
