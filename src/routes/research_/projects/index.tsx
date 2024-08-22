import { KBanner } from '../../-components/KBanner/KBanner.tsx';
import styles from './ProjectsPage.module.css';
import axios from 'axios';
import { Project } from './-projects.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';
import { KAddButton } from '../../-components/KAddButton/KAddButton.tsx';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth.ts';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import KProjectCard from '../../-components/KProjectCard/KProjectCard.tsx';

export interface ProjectForm {
  title: string;
  responsible: string;
  members: string;
  funding: string;
  budget: string;
  hostingUni: string;
  partners: string;
  description: string;
}

const addProject = ({
  title,
  responsible,
  members,
  funding,
  budget,
  hostingUni,
  partners,
  description,
}: ProjectForm) => {
  return axios
    .post<Project>(`/projects`, {
      title,
      responsible,
      members,
      funding,
      budget,
      hostingUni,
      partners,
      description,
    })
    .then(res => res.data);
};

const getProjects = () =>
  axios
    .get<Project[]>('/projects')
    .then(res => res.data.reverse());

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<ProjectForm>({
    defaultValues: {
      title: '',
      responsible: '',
      members: '',
      funding: '',
      budget: '',
      hostingUni: '',
      partners: '',
      description: '',
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
    mutationFn: addProject,
    onError: () => toast.error('Nu s-a putut adăuga proiectul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Proiectul a fost adăugat cu succes.');
    },
  });

  const onSubmit: SubmitHandler<ProjectForm> = data => {
    mutate(data);
  };

  return (
    <div className={styles.page}>
      <KBanner label="PROIECTE" />
      <div className={styles.section}>
        <div className={styles.cardsContainer}>
          {isLoggedIn && (
            <KAddButton className={'position'} onClick={showModal} />
          )}
          <Modal
            title="Creează un proiect"
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
                    placeholder={errors.responsible?.message ?? 'Responsabil proiect'}
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
                    placeholder={errors.hostingUni?.message ?? 'Universitatea gazdă'}
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
            </Space>
          </Modal>
          <div className="flex">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Proiectele nu pot fi afișate momentan. Reveniți mai târziu!
              </span>
            ) : isEmpty(projects) ? (
              <div className="flex">
                <span>Nu există proiecte momentan.</span>
              </div>
            ) : (
              projects?.map(Project => {
                return (
                  <KProjectCard
                    key={Project.id}
                    id={Project.id}
                    title={Project.title}
                    responsible={Project.responsible}
                    members={Project.members}
                    funding={Project.funding}
                    budget={Project.budget}
                    hostingUni={Project.hostingUni}
                    partners={Project.partners}
                    description={Project.description}
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

export const Route = createFileRoute('/research/projects/')({
  component: ProjectsPage,
});

export default ProjectsPage;