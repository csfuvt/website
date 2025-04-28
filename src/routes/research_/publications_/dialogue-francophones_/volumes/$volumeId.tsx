import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { Article, Volume } from './-volumes.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { Button, Modal, Space, Spin, Upload, UploadFile } from 'antd';
import { isEmpty } from 'lodash-es';
import { KChapter } from '../../../../-components/KChapter/KChapter.tsx';
import { KArticle } from '../../../../-components/KArticle/KArticle.tsx';
import './styles.css';
import { useAuth } from '../../../../../hooks/useAuth.ts';
import { BASE_URL } from '../../../../../constants.ts';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  AntDFileType,
  FileType,
  useFileUpload,
} from '../../../../../hooks/useFileUpload.ts';
import { VolumeForm } from './index.tsx';
import _ from 'lodash';
import TextEditor from '../../../../-components/KTextEditor/KTextEditor.tsx';

const getVolumeById = (id: string) =>
  axios.get<Volume>(`/volumes/${id}`).then(res => res.data);

export interface ArticleForm {
  title: string;
}

const addArticle = ({ title, id }: ArticleForm & { id: number }) => {
  return axios
    .post<Article>(`/volumes/${id}/article`, { title })
    .then(res => res.data);
};

const updateCover = async ({
  id,
  cover,
}: {
  id: number;
  cover: UploadFile;
}) => {
  const formData = new FormData();
  formData.append('cover', cover as AntDFileType);
  const res = await axios.post<Volume>(`/volumes/${id}/cover`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const updatePdf = async ({ id, pdf }: { id: number; pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('pdf', pdf as AntDFileType);
  const res = await axios.post<Volume>(`/volumes/${id}/pdf`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const VolumePage = () => {
  const { isLoggedIn } = useAuth();

  const { volumeId } = Route.useParams();

  const {
    data: volume,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`volume/${volumeId}`],
    queryFn: () => getVolumeById(volumeId),
  });

  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);

  // Stare pentru modalul de editare a tematicii
  const [isTematicaModalOpen, setIsTematicaModalOpen] = useState(false);
  const [tematica, setTematica] = useState(volume?.tematica || '');

  const { mutate: updateTematicaMutation } = useMutation({
    mutationFn: async ({ id, tematica }: { id: number; tematica: string }) => {
      return axios.post(`/volumes/${id}/tematica`, { tematica });
    },
    onError: () => toast.error('Eroare la actualizarea tematicii!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`volume/${volumeId}`] });
      setIsTematicaModalOpen(false);
      toast.success('Tematica a fost actualizată cu succes!');
    },
  });

  const handleSaveTematica = () => {
    updateTematicaMutation({ id: parseInt(volumeId), tematica });
  };

  const showArticleModal = () => {
    setIsAddArticleModalOpen(true);
  };

  const handleCancelForAddArticle = () => {
    setIsAddArticleModalOpen(false);
    resetArticleForm();
  };

  const {
    handleSubmit: handleArticleSubmit,
    reset: resetArticleForm,
    formState: { errors: articleErrors, isValid: isArticleValid },
    control: articleControl,
  } = useForm<ArticleForm>({
    defaultValues: {
      title: '',
    },
  });

  const queryClient = useQueryClient();
  const { mutate: addArticleMutation, isPending: isArticlePending } =
    useMutation({
      mutationFn: addArticle,
      onError: () => toast.error('Nu s-a putut adăuga secțiunea!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsAddArticleModalOpen(false);
        resetArticleForm();
        toast.success('Secțiunea a fost adăugată cu succes.');
      },
    });

  const onSubmit: SubmitHandler<ArticleForm> = data => {
    addArticleMutation({ ...data, id: parseInt(volumeId) });
  };

  const [isChangeCoverModalOpen, setIsChangeCoverModalOpen] = useState(false);

  const showChangeCoverModal = () => {
    setIsChangeCoverModalOpen(true);
  };

  const {
    fileList: coverList,
    resetFileList: resetCoverList,
    uploadFileProps: uploadCoverProps,
  } = useFileUpload(FileType.IMAGE);

  const { handleSubmit } = useForm<VolumeForm>();

  const handleCancelForEditCover = () => {
    setIsChangeCoverModalOpen(false);
    resetCoverList();
  };

  const { mutate: updateCoverMutation, isPending: isUpdateCoverPending } =
    useMutation({
      mutationFn: updateCover,
      onError: () => toast.error('Nu s-a putut edita coperta!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        await queryClient.invalidateQueries({ queryKey: ['volumes'] });
        setIsChangeCoverModalOpen(false);
        resetCoverList();
        toast.success('Volumul a fost adăugat cu succes.');
      },
    });

  const onSubmitCover = () => {
    updateCoverMutation({ id: parseInt(volumeId), cover: coverList[0] });
  };

  const [isChangePdfModalOpen, setIsChangePdfModalOpen] = useState(false);

  const showChangePdfModal = () => {
    setIsChangePdfModalOpen(true);
  };

  const {
    fileList: pdfList,
    resetFileList: resetPdfList,
    uploadFileProps: uploadPdfProps,
  } = useFileUpload([FileType.PDF, FileType.IMAGE]);

  const handleCancelForEditPdf = () => {
    setIsChangePdfModalOpen(false);
    resetPdfList();
  };

  const { mutate: updatePdfMutation, isPending: isUpdatePdfPending } =
    useMutation({
      mutationFn: updatePdf,
      onError: () => toast.error('Nu s-a putut edita sumarul!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsChangePdfModalOpen(false);
        resetPdfList();
        toast.success('Sumarul a fost editat cu succes!');
      },
    });

  const onSubmitPdf = () => {
    updatePdfMutation({ id: parseInt(volumeId), pdf: pdfList[0] });
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex">
          <Spin />
        </div>
      ) : isError ? (
        <div className="flex">
          <span>Volumul nu poate fi afișat momentan. Reveniți mai târziu!</span>
        </div>
      ) : isEmpty(volume) ? (
        <div className="flex">
          <span>Nu există volumul.</span>
        </div>
      ) : (
        <div>
          <KBanner label={`Dialogues Francophones - no. ${volume.title}`} />
          <Modal
            title="Adaugă o secțiune"
            open={isAddArticleModalOpen}
            onCancel={handleCancelForAddArticle}
            footer={[
              <Button key="back" onClick={handleCancelForAddArticle}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isArticlePending}
                disabled={!isArticleValid}
                onClick={handleArticleSubmit(onSubmit)}>
                Salvează
              </Button>,
            ]}>
            <Controller
              name="title"
              defaultValue=""
              control={articleControl}
              rules={{
                required: 'Titlul secțiunii este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <TextEditor
                  status={articleErrors.title ? 'error' : ''}
                  placeholder={
                    articleErrors.title?.message ?? 'Titlul secțiunii'
                  }
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Modal>
          <Modal
            title="Schimbă coperta volumului"
            open={isChangeCoverModalOpen}
            onCancel={handleCancelForEditCover}
            footer={[
              <Button key="back" onClick={handleCancelForEditCover}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isUpdateCoverPending}
                disabled={isEmpty(coverList)}
                onClick={handleSubmit(onSubmitCover)}>
                Salvează
              </Button>,
            ]}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}>
              <Upload {...uploadCoverProps}>
                <Button icon={<UploadOutlined />}>Selectează coperta</Button>
              </Upload>
            </Space>
          </Modal>
          <Modal
            title="Schimbă sumarul volumului"
            open={isChangePdfModalOpen}
            onCancel={handleCancelForEditPdf}
            footer={[
              <Button key="back" onClick={handleCancelForEditPdf}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isUpdatePdfPending}
                disabled={isEmpty(pdfList)}
                onClick={handleSubmit(onSubmitPdf)}>
                Salvează
              </Button>,
            ]}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}>
              <Upload {...uploadPdfProps}>
                <Button icon={<UploadOutlined />}>
                  Selectează pdf/jpg/png/jpeg
                </Button>
              </Upload>
            </Space>
          </Modal>

          <Modal
            title="Modifică tematica volumului"
            open={isTematicaModalOpen}
            onCancel={() => setIsTematicaModalOpen(false)}
            footer={[
              <Button key="back" onClick={() => setIsTematicaModalOpen(false)}>
                Renunță
              </Button>,
              <Button key="submit" type="primary" onClick={handleSaveTematica}>
                Salvează
              </Button>,
            ]}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}>
              <TextEditor
                status={articleErrors.title ? 'error' : ''}
                placeholder="Introduceți noua tematică"
                value={tematica}
                onChange={value => setTematica(value)}
              />
            </Space>
          </Modal>

          <div className="volumeContainer">
            <div className="left">
              <div className="cover-with-options">
                <img
                  src={BASE_URL + `/files/volumes/${volume.cover}`}
                  className="cover"
                  width={200}
                  height={290}
                  alt="cover"
                />
                {isLoggedIn && (
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={showChangeCoverModal}>
                    Schimbă coperta
                  </Button>
                )}
              </div>

              {(isLoggedIn || volume.tematica) && (
                <div className="volumeUrl">
                  <span className="label">Tematica</span>
                  <div className="volumeTematicaContainer">
                    <div
                      dangerouslySetInnerHTML={{ __html: volume.tematica }}
                    />
                  </div>
                  {isLoggedIn && (
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setTematica(volume.tematica || '');
                        setIsTematicaModalOpen(true);
                      }}>
                      Modifică tematica
                    </Button>
                  )}
                </div>
              )}

              <div className="volumeUrl">
                <span className="label">Sumar</span>
                <a
                  href={BASE_URL + `/files/volumes/${volume.pdf}`}
                  className="url"
                  target="_blank"
                  rel="noopener noreferrer">
                  {volume.title}
                </a>
                {isLoggedIn && (
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={showChangePdfModal}>
                    Modifică sumar
                  </Button>
                )}
              </div>
            </div>
            <div className="right">
              {isLoggedIn && (
                <Button type="primary" size="large" onClick={showArticleModal}>
                  Adaugă o secțiune
                </Button>
              )}
              {volume.articles.map(article => (
                <div className="space-20">
                  <div className="article-title"></div>
                  <KArticle label={article.title} articleId={article.id} />
                  {_.sortBy(article.chapters, [a => a.pageStart]).map(
                    chapter => (
                      <KChapter
                        key={chapter.id}
                        chapterId={chapter.id}
                        title={chapter.title}
                        url={BASE_URL + `/files/chapters/${chapter.pdf}`}
                        authors={chapter.authors}
                        pageStart={chapter.pageStart}
                        pageEnd={chapter.pageEnd}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/volumes/$volumeId'
)({
  component: VolumePage,
});
