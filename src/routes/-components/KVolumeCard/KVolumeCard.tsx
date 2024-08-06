import styles from './KVolumeCard.module.css';
import { Link } from '@tanstack/react-router';
import { Button, Dropdown, Input, MenuProps, Modal } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { VolumeForm } from '../../research_/publications_/dialogue-francophones_/volumes';
import { Volume } from '../../research_/publications_/dialogue-francophones_/volumes/-volumes.model.ts';

const editVolume = async ({ title, id }: VolumeForm & { id: number }) => {
  const res = await axios.post<Volume>(`/volumes/${id}`, { title });
  return res.data;
};
const deleteVolume = (id: number) =>
  axios.delete(`/volumes/${id}`).then(res => res.data);

export const KVolumeCard = ({
  id,
  title,
  buttonText,
  url,
  volumeImageUrl,
}: {
  id: number;
  title: string;
  buttonText: string;
  url: string;
  volumeImageUrl: string;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteVolume,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['volumes'] });
      toast.success('Volumul a fost șters cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere volum',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți volumul?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        mutate(id);
      },
    });
  };

  const [isEditVolumeModalOpen, setIsEditVolumeModalOpen] = useState(false);
  const showEditVolumeModal = () => {
    setIsEditVolumeModalOpen(true);
  };

  const handleCancelForEditVolume = () => {
    setIsEditVolumeModalOpen(false);
    resetVolumeForm();
  };
  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === ActionableButton.DELETE) {
      showPropsConfirm();
    } else if (e.key === ActionableButton.EDIT) {
      showEditVolumeModal();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: ActionableButton.EDIT,
      label: 'Editează titlul',
      icon: <EditOutlined />,
    },
    {
      key: ActionableButton.DELETE,
      danger: true,
      label: 'Șterge volumul',
      icon: <DeleteOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const {
    handleSubmit: handleVolumeSubmit,
    reset: resetVolumeForm,
    formState: { errors: volumeErrors, isValid: isVolumeValid },
    control: volumeControl,
  } = useForm<VolumeForm>({
    defaultValues: {
      title: title,
    },
  });

  const { mutate: editVolumeMutation, isPending: isEditVolumePending } =
    useMutation({
      mutationFn: editVolume,
      onSuccess: async data => {
        await queryClient.invalidateQueries({
          queryKey: [`volumes`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`volume/${id}`],
        });
        toast.success('Volumul a fost editat cu succes');
        resetVolumeForm({ title: data.title });
        handleCancelForEditVolume();
      },
      onError: () => toast.error('A apărut o eroare în momentul editării'),
    });

  const onSubmit: SubmitHandler<VolumeForm> = data => {
    editVolumeMutation({ ...data, id: id });
  };

  return (
    <div className={styles.card}>
      <img
        src={volumeImageUrl}
        alt={'cover'}
        className={styles.backgroundImage}
      />
      {isLoggedIn && (
        <div className={styles.deleteVolume}>
          <Dropdown
            menu={menuProps}
            placement="bottomLeft"
            arrow
            trigger={['click']}>
            <Button
              type="primary"
              icon={<MoreOutlined />}
              shape="circle"
              loading={isPending}
            />
          </Dropdown>
        </div>
      )}
      <Modal
        title="Editează volumul"
        open={isEditVolumeModalOpen}
        onCancel={handleCancelForEditVolume}
        footer={[
          <Button key="back" onClick={handleCancelForEditVolume}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isEditVolumePending}
            disabled={!isVolumeValid}
            onClick={handleVolumeSubmit(onSubmit)}>
            Salvează
          </Button>,
        ]}>
        <Controller
          name="title"
          defaultValue=""
          control={volumeControl}
          rules={{
            required: 'Titlul secțiunii este un câmp obligatoriu',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              status={volumeErrors.title ? 'error' : ''}
              placeholder={volumeErrors.title?.message ?? 'Titlul secțiunii'}
              value={value}
              onChange={onChange}
              allowClear
            />
          )}
        />
      </Modal>
      <div className={styles.center}>
        <span className={styles.issueNumber}>{title}</span>

        <Link to={url}>
          <button className={styles.button}>{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default KVolumeCard;
