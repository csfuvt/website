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
import { Chapter } from '../../research_/publications_/dialogue-francophones_/volumes/-volumes.model.ts';
import { Route } from '../../research_/publications_/dialogue-francophones_/volumes/$volumeId.tsx';
import { isEmpty } from 'lodash-es';
import { ActionableButton } from '../KChapter/KChapter.tsx';

interface ChapterForm {
  title: string;
  authors: string;
  pageStart: string;
  pageEnd: string;
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
  formData.append('pageStart', pageStart);
  formData.append('pageEnd', pageEnd);
  const res = await axios.post<Chapter>(`/articles/${id}/chapter`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const deleteArticle = (id: number) =>
  axios.delete(`/articles/${id}`).then(res => res.data);

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

  const {
    handleSubmit: handleChapterSubmit,
    formState: { errors: chapterErrors, isValid: isChapterValid },
    control: chapterControl,
    reset,
  } = useForm<ChapterForm>({
    defaultValues: {
      title: '',
      authors: '',
      pageStart: '',
      pageEnd: '',
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
      onError: () => toast.error('Nu s-a putut adăuga capitolul!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsAddChapterModalOpen(false);
        resetAllForm();
        toast.success('Capitolul a fost adăugat cu succes.');
      },
    });

  const onChapterSubmit: SubmitHandler<ChapterForm> = data => {
    addChapterMutation({ ...data, pdf: pdfList[0], id: articleId });
  };

  const [isAddChapterModalOpen, setIsAddChapterModalOpen] = useState(false);

  const handleOkForAddChapter = () => {
    setIsAddChapterModalOpen(false);
  };

  const handleCancelForAddChapter = () => {
    setIsAddChapterModalOpen(false);
    resetAllForm();
  };

  const { mutate: deleteArticleMutation, isPending: isDeleteArticlePending } =
    useMutation({
      mutationFn: deleteArticle,
      onSuccess: async () => {
        `volume/${volumeId}`;
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Articolul a fost șters cu succes');
      },
      onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
    });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere articol',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți articolul?',
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
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Editează articolul',
      key: ActionableButton.EDIT,
      icon: <EditOutlined />,
    },
    {
      label: 'Șterge articolul',
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
      {label}
      {isLoggedIn && (
        <Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
          <Dropdown.Button
            type="primary"
            size="large"
            menu={menuProps}
            onClick={() => setIsAddChapterModalOpen(true)}
            trigger={['click']}>
            <FontAwesomeIcon icon={faPlus} />
            Adaugă un capitol
          </Dropdown.Button>
        </Space>
      )}
      <Modal
        title="Adaugă un capitol"
        open={isAddChapterModalOpen}
        onOk={handleOkForAddChapter}
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
              required: 'Titlul capitolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ?? 'Titlul capitolului'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="authors"
            defaultValue=""
            control={chapterControl}
            rules={{
              required: 'Autorii capitolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ?? 'Autorii capitolului'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="pageStart"
            defaultValue=""
            control={chapterControl}
            rules={{
              required:
                'Pagina de start a capitolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ??
                  'Pagina de start a capitolului'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="pageEnd"
            defaultValue=""
            control={chapterControl}
            rules={{
              required:
                'Pagina de sfârșit a capitolului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={chapterErrors.title ? 'error' : ''}
                placeholder={
                  chapterErrors.title?.message ??
                  'Pagina de sfârșit a capitolului'
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
    </div>
  );
};
