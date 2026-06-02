import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { Article, Volume } from './-volumes.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import {
  Button,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Upload,
  UploadFile,
} from 'antd';
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

const updateVolumeFullPdf = async ({
  id,
  volumePdf,
}: {
  id: number;
  volumePdf: UploadFile;
}) => {
  const formData = new FormData();
  formData.append('volumePdf', volumePdf as AntDFileType);
  const res = await axios.post<Volume>(`/volumes/${id}/volume-pdf`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const deleteVolumeFullPdf = (id: string) =>
  axios.delete<Volume>(`/volumes/${id}/volume-pdf`).then(res => res.data);

const updatePdf = async ({ id, pdf }: { id: number; pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('pdf', pdf as AntDFileType);
  const res = await axios.post<Volume>(`/volumes/${id}/pdf`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const updateRezumate = async ({
  id,
  rezumat1,
  rezumat2,
}: {
  id: number;
  rezumat1?: UploadFile;
  rezumat2?: UploadFile;
}) => {
  const formData = new FormData();
  if (rezumat1) formData.append('rezumat1', rezumat1 as AntDFileType);
  if (rezumat2) formData.append('rezumat2', rezumat2 as AntDFileType);
  const res = await axios.post<Volume>(`/volumes/${id}/rezumate`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const deleteVolumeRezumat1 = (id: string) =>
  axios.delete<Volume>(`/volumes/${id}/rezumat1`).then(res => res.data);

const deleteVolumeRezumat2 = (id: string) =>
  axios.delete<Volume>(`/volumes/${id}/rezumat2`).then(res => res.data);

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

  const [isChangeVolumePdfModalOpen, setIsChangeVolumePdfModalOpen] =
    useState(false);

  const showChangeVolumePdfModal = () => {
    setIsChangeVolumePdfModalOpen(true);
  };

  const {
    fileList: volumePdfList,
    resetFileList: resetVolumePdfList,
    uploadFileProps: uploadVolumePdfProps,
  } = useFileUpload(FileType.PDF);

  const handleCancelForEditVolumePdf = () => {
    setIsChangeVolumePdfModalOpen(false);
    resetVolumePdfList();
  };

  const {
    mutate: updateVolumeFullPdfMutation,
    isPending: isUpdateVolumeFullPdfPending,
  } = useMutation({
    mutationFn: updateVolumeFullPdf,
    onError: () => toast.error('Nu s-a putut încărca PDF-ul volumului!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`volume/${volumeId}`],
      });
      setIsChangeVolumePdfModalOpen(false);
      resetVolumePdfList();
      toast.success('PDF-ul volumului a fost încărcat cu succes.');
    },
  });

  const onSubmitVolumePdf = () => {
    updateVolumeFullPdfMutation({
      id: parseInt(volumeId),
      volumePdf: volumePdfList[0],
    });
  };

  const { mutate: deleteVolumePdfMutation, isPending: isDeletingVolumePdf } =
    useMutation({
      mutationFn: () => deleteVolumeFullPdf(volumeId),
      onError: () => toast.error('Nu s-a putut șterge PDF-ul volumului.'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('PDF-ul volumului a fost șters.');
      },
    });

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

  const [isChangeRezumateModalOpen, setIsChangeRezumateModalOpen] =
    useState(false);

  const {
    fileList: rezumat1List,
    resetFileList: resetRezumat1List,
    uploadFileProps: uploadRezumat1Props,
  } = useFileUpload(FileType.PDF);

  const {
    fileList: rezumat2List,
    resetFileList: resetRezumat2List,
    uploadFileProps: uploadRezumat2Props,
  } = useFileUpload(FileType.PDF);

  const showChangeRezumateModal = () => {
    setIsChangeRezumateModalOpen(true);
  };

  const handleCancelForEditRezumate = () => {
    setIsChangeRezumateModalOpen(false);
    resetRezumat1List();
    resetRezumat2List();
  };

  const { mutate: updateRezumateMutation, isPending: isUpdateRezumatePending } =
    useMutation({
      mutationFn: updateRezumate,
      onError: () => toast.error('Nu s-au putut încărca rezumatele!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsChangeRezumateModalOpen(false);
        resetRezumat1List();
        resetRezumat2List();
        toast.success('Rezumatele au fost actualizate cu succes.');
      },
    });

  const onSubmitRezumate = () => {
    updateRezumateMutation({
      id: parseInt(volumeId, 10),
      rezumat1: rezumat1List[0],
      rezumat2: rezumat2List[0],
    });
  };

  const { mutate: deleteRez1Mutation, isPending: isDeletingRez1 } = useMutation(
    {
      mutationFn: () => deleteVolumeRezumat1(volumeId),
      onError: () => toast.error('Nu s-a putut șterge rezumatul în franceză.'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Rezumatul în franceză a fost șters.');
      },
    }
  );

  const { mutate: deleteRez2Mutation, isPending: isDeletingRez2 } = useMutation(
    {
      mutationFn: () => deleteVolumeRezumat2(volumeId),
      onError: () => toast.error('Nu s-a putut șterge rezumatul în engleză.'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Rezumatul în engleză a fost șters.');
      },
    }
  );

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
            title="Încarcă PDF-ul volumului complet"
            open={isChangeVolumePdfModalOpen}
            onCancel={handleCancelForEditVolumePdf}
            footer={[
              <Button key="back" onClick={handleCancelForEditVolumePdf}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isUpdateVolumeFullPdfPending}
                disabled={isEmpty(volumePdfList)}
                onClick={onSubmitVolumePdf}>
                Salvează
              </Button>,
            ]}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}>
              <Upload {...uploadVolumePdfProps}>
                <Button icon={<UploadOutlined />}>
                  Selectează PDF — volum complet
                </Button>
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
            title="Încarcă rezumate PDF (franceză / engleză, opțional)"
            open={isChangeRezumateModalOpen}
            onCancel={handleCancelForEditRezumate}
            footer={[
              <Button key="back" onClick={handleCancelForEditRezumate}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isUpdateRezumatePending}
                disabled={isEmpty(rezumat1List) && isEmpty(rezumat2List)}
                onClick={onSubmitRezumate}>
                Salvează
              </Button>,
            ]}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}>
              <Upload {...uploadRezumat1Props}>
                <Button icon={<UploadOutlined />}>
                  Selectează PDF — rezumat în franceză
                </Button>
              </Upload>
              <Upload {...uploadRezumat2Props}>
                <Button icon={<UploadOutlined />}>
                  Selectează PDF — rezumat în engleză
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

              {(isLoggedIn || volume.volumePdf) && (
                <div className="volumeUrl">
                  <span className="label">Volum</span>
                  {volume.volumePdf ? (
                    <a
                      href={BASE_URL + `/files/volumes/${volume.volumePdf}`}
                      className="url"
                      target="_blank"
                      rel="noopener noreferrer">
                      Click pentru a vizualiza
                    </a>
                  ) : (
                    <span className="rezumat-slot__empty">Nu e încărcat</span>
                  )}
                  {isLoggedIn && (
                    <>
                      {volume.volumePdf && (
                        <Popconfirm
                          title="Ștergi PDF-ul volumului complet?"
                          description="Fișierul va fi eliminat de pe server."
                          okText="Da"
                          cancelText="Nu"
                          onConfirm={() => deleteVolumePdfMutation()}>
                          <Button
                            danger
                            size="small"
                            loading={isDeletingVolumePdf}>
                            Șterge
                          </Button>
                        </Popconfirm>
                      )}
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={showChangeVolumePdfModal}>
                        {volume.volumePdf
                          ? 'Modifică volumul'
                          : 'Încarcă volumul'}
                      </Button>
                    </>
                  )}
                </div>
              )}

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
                {volume.pdf ? (
                  <a
                    href={BASE_URL + `/files/volumes/${volume.pdf}`}
                    className="url"
                    target="_blank"
                    rel="noopener noreferrer">
                    {volume.title}
                  </a>
                ) : (
                  <span className="url">{volume.title}</span> // stil păstrat, dar neclickabil
                )}
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

              {(isLoggedIn ||
                Boolean(volume.rezumatPdf1) ||
                Boolean(volume.rezumatPdf2)) && (
                <div className="volumeUrl">
                  <span className="label">Rezumate</span>
                  {!isLoggedIn ? (
                    <>
                      {volume.rezumatPdf1 ? (
                        <a
                          href={
                            BASE_URL + `/files/volumes/${volume.rezumatPdf1}`
                          }
                          className="url"
                          target="_blank"
                          rel="noopener noreferrer">
                          Rezumate în franceză
                        </a>
                      ) : null}
                      {volume.rezumatPdf2 ? (
                        <a
                          href={
                            BASE_URL + `/files/volumes/${volume.rezumatPdf2}`
                          }
                          className="url"
                          target="_blank"
                          rel="noopener noreferrer">
                          Rezumate în engleză
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {(volume.rezumatPdf1 || isLoggedIn) && (
                        <div className="rezumat-slot">
                          {volume.rezumatPdf1 ? (
                            <>
                              <a
                                href={
                                  BASE_URL +
                                  `/files/volumes/${volume.rezumatPdf1}`
                                }
                                className="url"
                                target="_blank"
                                rel="noopener noreferrer">
                                Rezumate în franceză
                              </a>
                              <span className="rezumat-slot__badge">
                                PDF încărcat
                              </span>
                              <Popconfirm
                                title="Ștergi rezumatul în franceză?"
                                description="Fișierul va fi eliminat de pe server."
                                okText="Da"
                                cancelText="Nu"
                                onConfirm={() => deleteRez1Mutation()}>
                                <Button
                                  danger
                                  size="small"
                                  loading={isDeletingRez1}>
                                  Șterge
                                </Button>
                              </Popconfirm>
                            </>
                          ) : (
                            <span className="rezumat-slot__empty">
                              Nu e încărcat
                            </span>
                          )}
                        </div>
                      )}
                      {(volume.rezumatPdf2 || isLoggedIn) && (
                        <div className="rezumat-slot">
                          {volume.rezumatPdf2 ? (
                            <>
                              <a
                                href={
                                  BASE_URL +
                                  `/files/volumes/${volume.rezumatPdf2}`
                                }
                                className="url"
                                target="_blank"
                                rel="noopener noreferrer">
                                Rezumate în engleză
                              </a>
                              <span className="rezumat-slot__badge">
                                PDF încărcat
                              </span>
                              <Popconfirm
                                title="Ștergi rezumatul în engleză?"
                                description="Fișierul va fi eliminat de pe server."
                                okText="Da"
                                cancelText="Nu"
                                onConfirm={() => deleteRez2Mutation()}>
                                <Button
                                  danger
                                  size="small"
                                  loading={isDeletingRez2}>
                                  Șterge
                                </Button>
                              </Popconfirm>
                            </>
                          ) : (
                            <span className="rezumat-slot__empty">
                              Nu e încărcat
                            </span>
                          )}
                        </div>
                      )}
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={showChangeRezumateModal}>
                        Încarcă rezumate
                      </Button>
                    </>
                  )}
                </div>
              )}
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
                        url={
                          chapter.pdf
                            ? BASE_URL + `/files/chapters/${chapter.pdf}`
                            : ''
                        }
                        authors={chapter.authors}
                        pageStart={chapter.pageStart}
                        pageEnd={chapter.pageEnd}
                        pdf={chapter.pdf}
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
  '/research_/publications_/dialogue-francophones_/volumes/$volumeId'
)({
  component: VolumePage,
});
