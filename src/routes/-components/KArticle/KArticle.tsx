import './styles.css';
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
  Upload,
  UploadFile,
} from 'antd';
import { useAuth } from '../../../hooks/useAuth.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
} from '@ant-design/icons';
import {
  AntDFileType,
  FileType,
  useFileUpload,
} from '../../../hooks/useFileUpload.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import {
  Article,
  Chapter,
} from '../../research_/publications_/dialogue-francophones_/volumes/-volumes.model.ts';
import {
  ArticleForm,
  Route,
} from '../../research_/publications_/dialogue-francophones_/volumes/$volumeId.tsx';
import { isEmpty } from 'lodash-es';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextEditor from '../KTextEditor/KTextEditor.tsx';

export interface ChapterForm {
  title: string;
  authors: string;
  pageStart: number;
  pageEnd: number;
}

const addChapter = async ({
  title,
  id,
  pdf,
  authors,
  pageStart,
  pageEnd,
}: ChapterForm & { id: number; pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('pdf', pdf as AntDFileType);
  formData.append('title', title);
  formData.append('authors', authors);
  formData.append('pageStart', pageStart.toString());
  formData.append('pageEnd', pageEnd.toString());
  const res = await axios.post<Chapter>(`/articles/${id}/chapter`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const deleteArticle = (id: number) =>
  axios.delete(`/articles/${id}`).then(res => res.data);

const editArticle = async ({ title, id }: ArticleForm & { id: number }) => {
  const res = await axios.post<Article>(`/articles/${id}`, { title });
  return res.data;
};
export const KArticle = ({
  label,
  articleId,
}: {
  label?: string;
  articleId: number;
}) => {
  const { isLoggedIn } = useAuth();

  const {
    fileList: pdfList,
    resetFileList,
    uploadFileProps: uploadPdfProps,
  } = useFileUpload(FileType.PDF);

  const schema = yup.object().shape({
    title: yup.string().required(),
    authors: yup.string().required(),
    pageStart: yup.number().positive().required(),
    pageEnd: yup.number().positive().min(yup.ref('pageStart')).required(),
  });

  const {
    handleSubmit: handleChapterSubmit,
    formState: { errors: chapterErrors, isValid: isChapterValid },
    control: chapterControl,
    reset,
  } = useForm<ChapterForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      authors: '',
      pageStart: undefined,
      pageEnd: undefined,
    },
  });

  const resetAllForm = () => {
    reset();
    resetFileList();
  };

  const { volumeId } = Route.useParams();
  const queryClient = useQueryClient();
  const { mutate: addChapterMutation, isPending: isChapterPending } =
    useMutation({
      mutationFn: addChapter,
      onError: () => toast.error('Nu s-a putut adăuga articolul!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsAddChapterModalOpen(false);
        resetAllForm();
        toast.success('Articolul a fost adăugat cu succes.');
      },
    });

  const onChapterSubmit: SubmitHandler<ChapterForm> = data => {
    addChapterMutation({ ...data, pdf: pdfList[0], id: articleId });
  };

  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);

  const handleCancelForAddChapter = () => {
    setIsAddChapterModalOpen(false);
    resetAllForm();
  };

  const [isEditArticleModalOpen, setIsEditArticleModalOpen] = useState(false);
  const showEditArticleModal = () => {
    setIsEditArticleModalOpen(true);
  };

  const handleCancelForEditArticle = () => {
    setIsEditArticleModalOpen(false);
    resetArticleForm();
  };

  const {
    handleSubmit: handleArticleSubmit,
    reset: resetArticleForm,
    formState: { errors: articleErrors, isValid: isArticleValid },
    control: articleControl,
  } = useForm<ArticleForm>({
    defaultValues: {
      title: label,
    },
  });

  const { mutate: editArticleMutation, isPending: isEditArticlePending } =
    useMutation({
      mutationFn: editArticle,
      onSuccess: async data => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Secțiunea a fost editată cu succes');
        resetArticleForm({ title: data.title });
        handleCancelForEditArticle();
      },
      onError: () => toast.error('A apărut o eroare în momentul editării'),
    });

  const onSubmit: SubmitHandler<ArticleForm> = data => {
    editArticleMutation({ ...data, id: articleId });
  };

  const { mutate: deleteArticleMutation, isPending: isDeleteArticlePending } =
    useMutation({
      mutationFn: deleteArticle,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Secțiunea a fost ștearsă cu succes');
      },
      onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
    });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere secțiune',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți secțiunea?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteArticleMutation(articleId);
      },
    });
  };
  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === ActionableButton.DELETE) {
      showPropsConfirm();
    } else if (e.key === ActionableButton.EDIT) {
      showEditArticleModal();
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Editează secțiunea',
      key: ActionableButton.EDIT,
      icon: <EditOutlined />,
    },
    {
      label: 'Șterge secțiunea',
      key: ActionableButton.DELETE,
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
    loading: isDeleteArticlePending,
  };

  return (
    <div className="subtitle">
      <div dangerouslySetInnerHTML={{ __html: label ?? '' }} />
      {isLoggedIn && (
        <Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
          <Dropdown.Button
            type="primary"
            size="large"
            menu={menuProps}
            onClick={() => setIsAddChapterModalOpen(true)}
            trigger={['click']}>
            <FontAwesomeIcon icon={faPlus} />
            Adaugă un articol
          </Dropdown.Button>
        </Space>
      )}
      <Modal
        title="Adaugă un articol"
        open={isAddChapterModalOpen}
        onCancel={handleCancelForAddChapter}
        footer={[
          <Button key="back" onClick={handleCancelForAddChapter}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isChapterPending}
            disabled={isEmpty(pdfList) || !isChapterValid}
            onClick={handleChapterSubmit(onChapterSubmit)}>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="title"
            defaultValue=""
            control={chapterControl}
            rules={{
              required: 'Titlul articolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <TextEditor
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ?? 'Titlul articolului'
                }
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="authors"
            defaultValue=""
            control={chapterControl}
            rules={{
              required: 'Autorii articolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <TextEditor
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ?? 'Autorii articolului'
                }
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="pageStart"
            control={chapterControl}
            rules={{
              required:
                'Pagina de start a articolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ??
                  'Pagina de start a articolului'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="pageEnd"
            control={chapterControl}
            rules={{
              required:
                'Pagina de sfârșit a articolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ??
                  'Pagina de sfârșit a articolului'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}></Controller>
          <Upload {...uploadPdfProps}>
            <Button icon={<UploadOutlined />}>Selectează pdf</Button>
          </Upload>
        </Space>
      </Modal>
      <Modal
        title="Editează secțiunea"
        open={isEditArticleModalOpen}
        onCancel={handleCancelForEditArticle}
        footer={[
          <Button key="back" onClick={handleCancelForEditArticle}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isEditArticlePending}
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
              placeholder={articleErrors.title?.message ?? 'Titlul secțiunii'}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Modal>
    </div>
  );
};
