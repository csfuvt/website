import styles from './KProjectCard.module.css';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
  Upload,
  Image,
  UploadFile,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Project } from '../../research_/projects/-projects.model.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import TextEditor from '../KTextEditor/KTextEditor.tsx';
import { BASE_URL } from '../../../constants.ts';
import { UploadFileStatus } from 'antd/es/upload/interface';

interface ProjectForm {
  title: string;
  responsible?: string;
  members?: string;
  funding?: string;
  budget?: string;
  hostingUni?: string;
  partners?: string;
  implementationPeriod?: string;
  description: string;
  link?: string;
  images?: (UploadFile | { id: number; path: string; projectId: number })[];
}

const editProject = async ({ id, ...data }: ProjectForm & { id: number }) => {
  const res = await axios.post<Project>(`/projects/${id}`, data);
  return res.data;
};

const deleteProject = (id: number) =>
  axios.delete(`/projects/${id}`).then(res => res.data);

const uploadImages = async (id: number, formData: FormData) => {
  try {
    await axios.post(`/projects/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Imaginile au fost încărcate cu succes!');
  } catch (error) {
    toast.error('A apărut o eroare la încărcarea imaginilor.');
  }
};

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
  images,
}: {
  id: number;
  title: string;
  responsible?: string;
  members?: string;
  funding?: string;
  budget?: string;
  hostingUni?: string;
  partners?: string;
  implementationPeriod?: string;
  description: string;
  link?: string;
  images?: { id: number; path: string; projectId: number }[];
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

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

  useEffect(() => {
    if (images && images.length > 0) {
      const formattedImages: UploadFile[] = images.map(img => ({
        uid: img.id.toString(),
        name: img.path,
        status: 'done' as UploadFileStatus,
        url: `${BASE_URL}/files/project-images/${img.path}`,
      }));
      setFileList(formattedImages);
    }
  }, [images]);

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
      images: images || [],
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

  const onSubmit: SubmitHandler<ProjectForm> = async data => {
    try {
      const newImages =
        data.images?.filter((file: any) => file.originFileObj) ?? [];

      const formData = new FormData();
      newImages.forEach((file: any) => {
        formData.append('images', file.originFileObj);
      });

      if (newImages.length > 0) {
        await uploadImages(id, formData); // POST /projects/:id/images ✅
      }

      await editMutation({
        id,
        title: data.title,
        responsible: data.responsible,
        members: data.members,
        funding: data.funding,
        budget: data.budget,
        hostingUni: data.hostingUni,
        partners: data.partners,
        implementationPeriod: data.implementationPeriod,
        description: data.description,
        link: data.link,
      }); // POST /projects/:id

      if (imagesToDelete.length > 0) {
        await axios.post(`/projects/${id}/delete-images`, {
          imageIds: imagesToDelete,
        }); // POST /projects/:id/delete-images
      }

      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Proiectul a fost editat cu succes.');
      resetForm();
    } catch (error) {
      toast.error('A apărut o eroare în momentul editării');
    }
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.contentWrapper}>
        {images && images.length > 0 && (
          <div className={styles.imageGallery}>
            <Image.PreviewGroup
              preview={{
                visible: previewVisible,
                onVisibleChange: vis => setPreviewVisible(vis),
              }}>
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={`${BASE_URL}/files/project-images/${img.path}`}
                  alt={`Proiect imagine ${index + 1}`}
                  // width={index === 0 ? 200 : 0}
                  style={index === 0 ? {} : { display: 'none' }}
                  onClick={
                    index === 0 ? () => setPreviewVisible(true) : undefined
                  }
                  className={styles.projectImage}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.title}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          {responsible && (
            <p>
              <strong>Responsabil proiect:</strong> {responsible}
            </p>
          )}
          {members && (
            <p>
              <strong>Membri proiect:</strong> {members}
            </p>
          )}
          {funding && (
            <p>
              <strong>Axă de finanțare:</strong> {funding}
            </p>
          )}
          {budget && (
            <p>
              <strong>Buget:</strong> {budget}
            </p>
          )}
          {hostingUni && (
            <p>
              <strong>Universitate gazdă:</strong> {hostingUni}
            </p>
          )}
          {partners && (
            <p>
              <strong>Parteneri:</strong> {partners}
            </p>
          )}
          {implementationPeriod && (
            <p>
              <strong>Perioada de implementare:</strong> {implementationPeriod}
            </p>
          )}
          <p>
            <strong>Descriere proiect:</strong>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </p>
        </div>
      </div>
      <div className={styles.linkContainer}>
        {link && (
          <a href={link} target="_blank" className={styles.logo}>
            <FontAwesomeIcon
              icon={faGlobe}
              style={{ color: '#004992', width: '40px', height: '40px' }}
            />
          </a>
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
                placeholder="Responsabil proiect (opțional)"
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
                placeholder="Membri proiectului (opțional)"
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
                placeholder="Axă de finanțare (opțional)"
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
                placeholder="Buget (opțional)"
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
                placeholder="Universitate gazdă (opțional)"
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
                placeholder="Parteneri (opțional)"
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
                status={errors.implementationPeriod ? 'error' : ''}
                placeholder="Perioada de implementare (opțional)"
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
                placeholder={errors.description?.message ?? 'Descriere proiect'}
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
                status={errors.link ? 'error' : ''}
                placeholder="Link (opțional)"
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
                  field.onChange(fileList);
                }}
                onRemove={file => {
                  // dacă fișierul e deja salvat (nu e nou adăugat)
                  if (!file.originFileObj && file.uid) {
                    setImagesToDelete(prev => [...prev, parseInt(file.uid)]);
                  }
                  return true;
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
    </div>
  );
};

export default KProjectsCard;
