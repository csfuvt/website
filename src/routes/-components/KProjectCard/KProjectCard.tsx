import styles from './KProjectCard.module.css';
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
import { Project } from '../../research_/projects/-projects.model.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface ProjectForm {
  title: string;
  responsible: string;
  members: string;
  funding: string;
  budget: string;
  hostingUni: string;
  partners: string;
  implementationPeriod: string;
  description: string;
  link: string;
}

const editProject = async ({ id, ...data }: ProjectForm & { id: number }) => {
  const res = await axios.post<Project>(`/projects/${id}`, data);
  return res.data;
};

const deleteProject = (id: number) =>
  axios.delete(`/projects/${id}`).then(res => res.data);

export const KProjectsCard = ({
  id,
  title,
  responsible,
  members,
  funding,
  budget,
  hostingUni,
  partners,
  implementationPeriod,
  description,
  link,
}: {
  id: number;
  title: string;
  responsible: string;
  members: string;
  funding: string;
  budget: string;
  hostingUni: string;
  partners: string;
  implementationPeriod: string;
  description: string;
  link: string;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proiectul a fost șters cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere proiect',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți acest proiect?',
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
  } = useForm<ProjectForm>({
    defaultValues: {
      title,
      responsible,
      members,
      funding,
      budget,
      hostingUni,
      partners,
      implementationPeriod,
      description,
      link,
    },
  });

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editProject,
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

  const onSubmit: SubmitHandler<ProjectForm> = data => {
    editMutation({ ...data, id });
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <p>
          <strong>Responsabil proiect:</strong> {responsible}
        </p>
        <p>
          <strong>Membri proiect:</strong> {members}
        </p>
        <p>
          <strong>Axă de finanțare:</strong> {funding}
        </p>
        <p>
          <strong>Buget:</strong> {budget}
        </p>
        <p>
          <strong>Universitate gazdă:</strong> {hostingUni}
        </p>
        <p>
          <strong>Parteneri:</strong> {partners}
        </p>
        <p>
          <strong>Perioada de implementare:</strong> {implementationPeriod}
        </p>
        <p>
          <strong>Descriere proiect:</strong> {description}
        </p>
        {link && (
          <div className={styles.linkContainer}>
            <a href={link} target="_blank" className={styles.logo}>
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
            name="responsible"
            control={control}
            rules={{
              required: 'Responsabilul proiect este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.responsible ? 'error' : ''}
                placeholder={
                  errors.responsible?.message ?? 'Responsabil proiect'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="members"
            control={control}
            rules={{
              required: 'Membri proiectului sunt un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.members ? 'error' : ''}
                placeholder={errors.members?.message ?? 'Membri proiectului'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="funding"
            control={control}
            rules={{
              required: 'Axele de finanțare este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.funding ? 'error' : ''}
                placeholder={errors.funding?.message ?? 'Axă de finanțare'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="budget"
            control={control}
            rules={{
              required: 'Bugetul este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.budget ? 'error' : ''}
                placeholder={errors.budget?.message ?? 'Buget'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="hostingUni"
            control={control}
            rules={{
              required: 'Universitatea gazdă este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.hostingUni ? 'error' : ''}
                placeholder={
                  errors.hostingUni?.message ?? 'Universitatea gazdă'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="partners"
            control={control}
            rules={{
              required: 'Partenerii sunt un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.partners ? 'error' : ''}
                placeholder={errors.partners?.message ?? 'Parteneri'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="implementationPeriod"
            control={control}
            rules={{
              required: 'Perioada de implementare este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.partners ? 'error' : ''}
                placeholder={
                  errors.partners?.message ?? 'Perioada de implementare'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: 'Descrierea este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input.TextArea
                status={errors.description ? 'error' : ''}
                placeholder={errors.description?.message ?? 'Descriere proiect'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="link"
            control={control}
            rules={{
              required: 'Link este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.partners ? 'error' : ''}
                placeholder={errors.partners?.message ?? 'Link'}
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

export default KProjectsCard;
