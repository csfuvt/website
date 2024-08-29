import styles from './KPhdThesisCard.module.css';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import { Button, Dropdown, Input, MenuProps, Modal, Space } from 'antd';
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
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PhdThesis } from '../../events_/phd-theses/-phd-thesis.model.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface PhdThesisForm {
  title: string;
  candidate: string;
  leader: string;
  organizers: string;
  meetingDate: string;
  councilMembers: string;
  thesisSummary: string;
  links: string;
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

export const KPhdThesisCard = ({
  id,
  title,
  candidate,
  leader,
  organizers,
  meetingDate,
  councilMembers,
  thesisSummary,
  links,
}: {
  id: number;
  title: string;
  candidate: string;
  leader: string;
  organizers: string;
  meetingDate: string;
  councilMembers: string;
  thesisSummary: string;
  links: string;
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
  } = useForm<PhdThesisForm>({
    defaultValues: {
      title,
      candidate,
      leader,
      organizers,
      meetingDate,
      councilMembers,
      thesisSummary,
      links,
    },
  });

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editPhdThesis,
    onSuccess: async data => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proiectul a fost editat cu succes');
      const formattedData = {
        ...data,
      };
      resetForm(formattedData);
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  const onSubmit: SubmitHandler<PhdThesisForm> = data => {
    editMutation({ ...data, id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <p>
          <strong>Doctorand:</strong> {candidate}
        </p>

        {leader && (
          <p>
            <strong>Conducător:</strong> {leader}
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

        {councilMembers && (
          <p>
            <strong>Membri comisiei:</strong> {councilMembers}
          </p>
        )}

        {thesisSummary && (
          <p>
            <strong>Rezumatul tezei:</strong> {thesisSummary}
          </p>
        )}

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
              <Input
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
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.meetingDate ? 'error' : ''}
                placeholder={errors.meetingDate?.message ?? 'Data susținerii'}
                value={value}
                onChange={onChange}
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
                  errors.thesisSummary?.message ?? 'Rezumatul tezei de doctorat'
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
        </Space>
      </Modal>
    </div>
  );
};

export default KPhdThesisCard;
