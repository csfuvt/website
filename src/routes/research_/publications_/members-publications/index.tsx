import styles from './MemberPublicationPage.module.css';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import type { UploadFile } from 'antd/es/upload/interface';
import { Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { MemberPublication } from './-publication.ts';
import KPublicationCard from '../../../-components/KPublication/KPublicationCard.tsx';
import { useAuth } from '../../../../hooks/useAuth.ts';
import { KBanner } from '../../../-components/KBanner/KBanner.tsx';
import { KAddButton } from '../../../-components/KAddButton/KAddButton.tsx';
import TextEditor from '../../../-components/KTextEditor/KTextEditor.tsx';
import { BASE_URL } from '../../../../constants.ts';

export interface MemberPublicationForm {
  title: string;
  author: string;
  publishingHouse: string;
  publicationYear: string;
  bionota: string;
  description: string;
  images: UploadFile[];
  pdf: string;
}

const useFileUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return {
    fileList,
    resetFileList: () => setFileList([]),
    uploadFileProps: {
      fileList,
      onChange: ({ fileList }: { fileList: UploadFile[] }) =>
        setFileList(fileList),
      beforeUpload: () => false,
    },
  };
};

const uploadImages = async (membersId: number, images: UploadFile[]) => {
  const formData = new FormData();
  images.forEach(file => {
    if (file.originFileObj) {
      formData.append('images', file.originFileObj);
    }
  });

  const res = await axios.post<{ fileNames: string[] }>(
    `/members-publications/${membersId}/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data?.fileNames ?? []; // fallback empty array
};

const addMemberPublication = ({
  title,
  author,
  publishingHouse,
  publicationYear,
  bionota,
  description,
  pdf,
}: Omit<MemberPublication, 'id' | 'images'>) => {
  return axios
    .post<MemberPublication>(`${BASE_URL}/members-publications`, {
      title,
      author,
      publishingHouse,
      publicationYear,
      bionota,
      description,
      pdf,
    })
    .then(res => res.data);
};

const getMemberPublication = () =>
  axios
    .get<MemberPublication[]>('/members-publications')
    .then(res => res.data.reverse());

const MemberPublicationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const { resetFileList: resetPdfList } = useFileUpload();

  const {
    data: publications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['publications'],
    queryFn: getMemberPublication,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    // watch,
  } = useForm<MemberPublicationForm>({
    defaultValues: {
      title: '',
      author: '',
      publishingHouse: '',
      publicationYear: '',
      bionota: '',
      description: '',
      images: [],
      pdf: '',
    },
  });

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    reset();
    setFileList([]);
    resetPdfList();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addMemberPublication,
    onError: () => toast.error('Nu s-a putut adăuga proiectul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['publications'] });
      toast.success('Proiectul a fost adăugat cu succes.');
    },
  });

  const onSubmit: SubmitHandler<MemberPublicationForm> = async data => {
    const rest = data;

    try {
      const createdMemberPublication = await mutateAsync(rest);

      if (fileList.length > 0) {
        const savedImageNames = await uploadImages(
          createdMemberPublication.id,
          fileList
        );

        await axios.post(
          `/members-publications/${createdMemberPublication.id}`,
          {
            images: savedImageNames,
          }
        );

        const updated = await axios.get<MemberPublication>(
          `/members-publications/${createdMemberPublication.id}`
        );

        queryClient.setQueryData<MemberPublication[]>(['publications'], old => {
          if (!old) return [updated.data];
          return [updated.data, ...old.filter(p => p.id !== updated.data.id)];
        });
      }

      resetForm();
      setIsModalOpen(false);
      toast.success('Proiectul a fost adăugat cu succes.');
    } catch (err) {
      console.error(err);
      toast.error('A apărut o eroare la adăugarea proiectului.');
    }
  };

  // const pdfValue = watch('pdf');

  return (
    <div className={styles.page}>
      <KBanner label="PUBLICAȚIILE MEMBRILOR" />
      <div className={styles.section}>
        <div className={styles.cardsContainer}>
          {isLoggedIn && (
            <KAddButton className={'position'} onClick={showModal} />
          )}
          <Modal
            title="Creează o publicație"
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
                disabled={!isValid} // || !pdfValue
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
                  required: 'Titlul publicației este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextEditor
                    status={errors.title ? 'error' : ''}
                    placeholder={errors.title?.message ?? 'Titlul publicației'}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Autor (opțional)"
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
                render={({ field }) => (
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
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          }
                        );

                        const uploadedUrl = response.data.url;

                        field.onChange(uploadedUrl);
                        toast.success('PDF-ul a fost încărcat cu succes');
                      } catch (error) {
                        toast.error('Eroare la încărcarea PDF-ului');
                      }

                      return false; // împiedică auto-upload
                    }}>
                    <Button icon={<UploadOutlined />} block>
                      Selectează PDF (opțional)
                    </Button>
                  </Upload>
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
                    onRemove={() => {
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
          <div className="flex">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Publicațiile nu pot fi afișate momentan. Reveniți mai târziu!
              </span>
            ) : isEmpty(publications) ? (
              <div className="flex">
                <span>Nu există publicații momentan.</span>
              </div>
            ) : (
              publications?.map(MemberPublication => {
                return (
                  <KPublicationCard
                    key={MemberPublication.id}
                    id={MemberPublication.id}
                    title={MemberPublication.title}
                    author={MemberPublication.author ?? ''}
                    publishingHouse={MemberPublication.publishingHouse}
                    publicationYear={MemberPublication.publicationYear}
                    bionota={MemberPublication.bionota}
                    description={MemberPublication.description}
                    images={MemberPublication.images}
                    pdf={MemberPublication.pdf}
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

export const Route = createFileRoute(
  '/research/publications/members-publications/'
)({
  component: MemberPublicationPage,
});

export default MemberPublicationPage;
