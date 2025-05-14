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
import TextEditor from '../../-components/KTextEditor/KTextEditor.tsx';
import type { UploadFile } from 'antd/es/upload/interface';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
  images: UploadFile[];
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
}: Omit<ProjectForm, 'images'>) => {
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

/*const uploadImages = async (projectId: number, images: UploadFile[]) => {
  const formData = new FormData();
  images.forEach((file) => {
    if (file.originFileObj) {
      formData.append('images', file.originFileObj);
    }
  });

  return axios.post(`/projects/${projectId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};*/
const uploadImages = async (projectId: number, images: UploadFile[]) => {
  const formData = new FormData();
  images.forEach(file => {
    if (file.originFileObj) {
      formData.append('images', file.originFileObj);
    }
  });

  const res = await axios.post<{ fileNames: string[] }>(
    `/projects/${projectId}/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data?.fileNames ?? []; // fallback empty array
};

const getProjects = () =>
  axios.get<Project[]>('/projects').then(res => res.data.reverse());

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
    setFileList([]);
  };

  const queryClient = useQueryClient();
  /* const { mutate, isPending } = useMutation({
    mutationFn: addProject,
    onError: () => toast.error('Nu s-a putut adăuga proiectul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Proiectul a fost adăugat cu succes.');
    },
  });*/

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addProject,
    onError: () => toast.error('Nu s-a putut adăuga proiectul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Proiectul a fost adăugat cu succes.');
    },
  });

  const onSubmit: SubmitHandler<ProjectForm> = async data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { images, ...rest } = data;

    try {
      const createdProject = await mutateAsync(rest);

      let fullProject = createdProject;

      if (fileList && fileList.length > 0) {
        const savedImageNames = await uploadImages(createdProject.id, fileList);

        // 🔁 Nu mai verifica .length — mereu trimite PATCH și apoi GET
        await axios.post(`/projects/${createdProject.id}`, {
          images: savedImageNames,
        });

        // 🔁 Fă mereu GET ca să obții și imaginile din DB
        const updated = await axios.get<Project>(
          `/projects/${createdProject.id}`
        );
        fullProject = updated.data;
      }

      queryClient.setQueryData<Project[]>(['projects'], old => {
        if (!old) return [fullProject];
        return [fullProject, ...old.filter(p => p.id !== fullProject.id)];
      });

      resetForm();
      setIsModalOpen(false);
      toast.success('Proiectul a fost adăugat cu succes.');
    } catch (err) {
      console.error(err);
      toast.error('A apărut o eroare la adăugarea proiectului.');
    }
  };

  /*
  const onSubmit: SubmitHandler<ProjectForm> = async (data) => {
    try {
      const { images, ...rest } = data;
      const createdProject = await mutateAsync({ ...rest, images }); // use mutation

      if (fileList.length > 0) {
        await uploadImages(createdProject.id, fileList); // POST /projects/:id/images
      }
  
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Proiectul a fost adăugat cu succes.');
    } catch (error) {
      toast.error('Nu s-a putut adăuga proiectul!');
    }
  };
  */

  //const onSubmit: SubmitHandler<ProjectForm> = data => {
  // mutate(data);
  //};

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
                  <TextEditor
                    status={errors.title ? 'error' : ''}
                    placeholder={errors.title?.message ?? 'Titlul proiectului'}
                    value={value}
                    onChange={onChange}
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
                  <TextEditor
                    status={errors.description ? 'error' : ''}
                    placeholder={
                      errors.description?.message ?? 'Descriere proiect'
                    }
                    value={value}
                    onChange={onChange}
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
              <Controller
                name="images"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList }) => {
                      setFileList(fileList);
                      field.onChange(fileList); // actualizează în react-hook-form
                    }}
                    beforeUpload={() => false}
                    multiple>
                    {fileList.length < 5 && (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 5 }}>Încarcă</div>
                      </div>
                    )}
                  </Upload>
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
                    images={Project.images}
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
