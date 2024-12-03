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
  implementationPeriod: string;
  description: string;
  link: string;
}

const addProject = ({
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
      implementationPeriod,
      description,
      link,
    })
    .then(res => res.data);
};

const getProjects = () =>
  axios.get<Project[]>('/projects').then(res => res.data.reverse());

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
      implementationPeriod: '',
      description: '',
      link: '',
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
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}>
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.responsible ? 'error' : ''}
                    placeholder={
                      errors.responsible?.message ??
                      'Responsabil proiect (opțional)'
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.members ? 'error' : ''}
                    placeholder={
                      errors.members?.message ?? 'Membri proiectului (opțional)'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="funding"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.funding ? 'error' : ''}
                    placeholder={
                      errors.funding?.message ?? 'Axă de finanțare (opțional)'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="budget"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.budget ? 'error' : ''}
                    placeholder={errors.budget?.message ?? 'Buget (opțional)'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="hostingUni"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.hostingUni ? 'error' : ''}
                    placeholder={
                      errors.hostingUni?.message ??
                      'Universitatea gazdă (opțional)'
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
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.partners ? 'error' : ''}
                    placeholder={
                      errors.partners?.message ?? 'Parteneri (opțional)'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="implementationPeriod"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.partners ? 'error' : ''}
                    placeholder={
                      errors.partners?.message ??
                      'Perioada de implementare (opțional)'
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
                    placeholder={
                      errors.description?.message ?? 'Descriere proiect'
                    }
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
                    status={errors.partners ? 'error' : ''}
                    placeholder={errors.partners?.message ?? 'Link (opțional)'}
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
                    implementationPeriod={Project.implementationPeriod}
                    description={Project.description}
                    link={Project.link}
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
