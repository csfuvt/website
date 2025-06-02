import styles from './KPublicationCard.module.css';
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
  UploadOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextEditor from '../KTextEditor/KTextEditor.tsx';
import { BASE_URL } from '../../../constants.ts';
import { UploadFileStatus } from 'antd/es/upload/interface';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import { MemberPublication } from '../../research_/publications_/members-publications/-publication.ts';

interface MemberPublicationForm {
  title: string;
  author?: string;
  publishingHouse: string;
  publicationYear: string;
  bionota?: string;
  description: string;
  images?: (UploadFile | { id: number; path: string; projectId: number })[];
  pdf: string;
}

const editMemberPublication = async ({
  id,
  ...data
}: MemberPublicationForm & { id: number }) => {
  const res = await axios.post<MemberPublication>(
    `/members-publications/${id}`,
    data
  );
  return res.data;
};

const deleteMemberPublication = (id: number) =>
  axios.delete(`/members-publications/${id}`).then(res => res.data);

const uploadImages = async (id: number, formData: FormData) => {
  try {
    await axios.post(`/members-publications/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Imaginile au fost încărcate cu succes!');
  } catch (error) {
    toast.error('A apărut o eroare la încărcarea imaginilor.');
  }
};

export const KPublicationCard = ({
  id,
  title,
  author,
  publishingHouse,
  publicationYear,
  bionota,
  description,
  images,
  pdf,
}: {
  id: number;
  title: string;
  author: string;
  publishingHouse: string;
  publicationYear: string;
  bionota?: string;
  description: string;
  pdf: string;
  images?: { id: number; path: string; memberId: number }[];
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteMemberPublication,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['publications'],
      });
      toast.success('Publicația a fost ștearsă cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere publicație',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți această publicație?',
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
  const [isPdfPresent, setIsPdfPresent] = useState(!!pdf);

  const handleDeletePdf = async () => {
    try {
      await axios.post(`/members-publications/${id}/delete-pdf`);
      toast.success('PDF-ul a fost șters');
      setIsPdfPresent(false);
      resetForm({ ...getValues(), pdf: '' });
      const updated = await axios.get<MemberPublication>(
        `/members-publications/${id}`
      );
      queryClient.setQueryData<MemberPublication[]>(['publications'], old => {
        if (!old) return [updated.data];
        return old.map(p => (p.id === id ? updated.data : p));
      });
    } catch (err) {
      toast.error('Eroare la ștergerea PDF-ului');
    }
  };

  // am facut alta implementare si nu mai e nevoie de asta
  //
  // useEffect(() => {
  //   if (images && images.length > 0) {
  //     const formattedImages: UploadFile[] = images.map(img => ({
  //       uid: img.id.toString(),
  //       name: img.path,
  //       status: 'done' as UploadFileStatus,
  //       url: `${BASE_URL}/files/publication-images/${img.path}`,
  //     }));
  //     setFileList(formattedImages);
  //   }
  // }, [images]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showEditModal = () => {
    if (images && images.length > 0) {
      const formattedImages: UploadFile[] = images.map(img => ({
        uid: img.id.toString(),
        name: img.path,
        status: 'done' as UploadFileStatus,
        url: `${BASE_URL}/files/publication-images/${img.path}`,
      }));
      setFileList(formattedImages);
    } else {
      setFileList([]); // goli lista dacă nu sunt imagini
    }

    setImagesToDelete([]);
    resetForm({
      title,
      author,
      publishingHouse,
      publicationYear,
      bionota,
      description,
      images: images || [],
      pdf,
    });

    setIsPdfPresent(!!pdf);
    setIsEditModalOpen(true);
  };

  const handleCancelForEdit = () => {
    setIsEditModalOpen(false);
    setFileList([]);
    setImagesToDelete([]);
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
    getValues,
    formState: { errors, isValid },
    control,
  } = useForm<MemberPublicationForm>({
    defaultValues: {
      title,
      author,
      publishingHouse,
      publicationYear,
      bionota,
      description,
      images: images || [],
      pdf,
    },
  });

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editMemberPublication,
    onSuccess: async data => {
      await queryClient.invalidateQueries({ queryKey: ['publication'] });
      toast.success('Publicația a fost editată cu succes');
      const formValues = data;
      resetForm(formValues);
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  const onSubmit: SubmitHandler<MemberPublicationForm> = async data => {
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
        author: data.author,
        publishingHouse: data.publishingHouse,
        publicationYear: data.publicationYear,
        bionota: data.bionota,
        description: data.description,
        pdf: data.pdf,
      }); // POST /projects/:id

      if (imagesToDelete.length > 0) {
        await axios.post(`/members-publications/${id}/delete-images`, {
          imageIds: imagesToDelete,
        }); // POST /projects/:id/delete-images
      }

      const updated = await axios.get<MemberPublication>(
        `/members-publications/${id}`
      );

      queryClient.setQueryData<MemberPublication[]>(['publications'], old => {
        if (!old) return [updated.data];
        return old.map(p => (p.id === id ? updated.data : p));
      });

      await queryClient.invalidateQueries({
        queryKey: ['publications'],
      });
      toast.success('Publicația a fost editată cu succes.');
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
                  src={`${BASE_URL}/files/publication-images/${img.path}`}
                  alt={`Publicație imagine ${index + 1}`}
                  // width={index === 0 ? 200 : 0}
                  style={index === 0 ? {} : { display: 'none' }}
                  onClick={
                    index === 0 ? () => setPreviewVisible(true) : undefined
                  }
                  className={styles.publicationImage}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.title}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          {author && (
            <p>
              <strong>Autor:</strong> {author}
            </p>
          )}
          {publishingHouse && (
            <p>
              <strong>Editura: </strong>
              {publishingHouse}
            </p>
          )}
          {publicationYear && (
            <p>
              <strong>Anul publicării: </strong>
              {publicationYear}
            </p>
          )}
          {bionota && (
            <p>
              <strong>Bionotă:</strong> {bionota}
            </p>
          )}
          {description && (
            <p>
              <strong>Descriere proiect:</strong>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </p>
          )}
          {pdf && (
            <Button
              type="link"
              className={styles.cuprinsButton}
              href={`${BASE_URL}/files/publication-pdfs/${pdf}`}
              target="_blank"
              rel="noopener noreferrer">
              Cuprins
            </Button>
          )}
        </div>
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
        title="Editează publicația"
        open={isEditModalOpen}
        onCancel={handleCancelForEdit}
        footer={[
          <Button key="cancel" onClick={handleCancelForEdit}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!isValid}
            loading={isEditPending}
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
              <TextEditor
                status={errors.title ? 'error' : ''}
                placeholder={errors.title?.message ?? 'Titlul publicației'}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="author"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Autor(i)"
                value={field.value}
                onChange={field.onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="publishingHouse"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Editura"
                value={field.value}
                onChange={field.onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="publicationYear"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Anul publicării"
                value={field.value}
                onChange={field.onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="bionota"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Bionotă (opțional)"
                value={field.value}
                onChange={field.onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Descrierea este obligatorie' }}
            render={({ field }) => (
              <TextEditor
                status={errors.description ? 'error' : ''}
                placeholder={errors.description?.message ?? 'Descriere'}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="pdf"
            control={control}
            // rules={{ required: 'PDF-ul este obligatoriu' }}
            render={({ field }) => (
              <Space.Compact block>
                <Upload
                  accept=".pdf"
                  showUploadList={false}
                  beforeUpload={async file => {
                    const formData = new FormData();
                    formData.append('pdf', file);

                    try {
                      const response = await axios.post(
                        `${BASE_URL}/members-publications/upload/pdf`,
                        formData,
                        {
                          headers: { 'Content-Type': 'multipart/form-data' },
                        }
                      );
                      const uploadedUrl = response.data.url;
                      field.onChange(uploadedUrl);
                      setIsPdfPresent(true);
                      toast.success('PDF-ul a fost încărcat cu succes');
                    } catch (error) {
                      toast.error('Eroare la încărcarea PDF-ului');
                    }

                    return false;
                  }}>
                  <Button
                    icon={<UploadOutlined />}
                    block
                    style={{ width: '100%' }}
                    disabled={isPdfPresent}>
                    Selectează PDF
                  </Button>
                </Upload>
                {isPdfPresent && (
                  <Button danger onClick={handleDeletePdf}>
                    Șterge PDF
                  </Button>
                )}
              </Space.Compact>
            )}
          />
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => {
                  setFileList(fileList);
                  field.onChange(fileList);
                }}
                onRemove={file => {
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

export default KPublicationCard;
