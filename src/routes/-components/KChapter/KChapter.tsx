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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Route } from '../../research_/publications_/dialogue-francophones_/volumes/$volumeId.tsx';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ChapterForm } from '../KArticle/KArticle.tsx';
import { Chapter } from '../../research_/publications_/dialogue-francophones_/volumes/-volumes.model.ts';
import {
  AntDFileType,
  FileType,
  useFileUpload,
} from '../../../hooks/useFileUpload.ts';
import { isEmpty } from 'lodash-es';
import { VolumeForm } from '../../research_/publications_/dialogue-francophones_/volumes';

const updateChapter = async ({
  id,
  title,
  authors,
  pageStart,
  pageEnd,
}: ChapterForm & {
  id: number;
}) => {
  const res = await axios.post<Chapter>(`/chapters/${id}`, {
    title,
    authors,
    pageStart,
    pageEnd,
  });
  return res.data;
};

const updatePdf = async ({ id, pdf }: { id: number; pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('pdf', pdf as AntDFileType);
  const res = await axios.post<Chapter>(`/chapters/${id}/pdf`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

const deleteChapter = (id: number) =>
  axios.delete(`/chapters/${id}`).then(res => res.data);

export enum ActionableButton {
  DELETE = 'delete',
  EDIT = 'edit',
  EDIT_PDF = 'edit-pdf',
}

export const KChapter = ({
  chapterId,
  title,
  url,
  authors,
  pageStart,
  pageEnd,
}: {
  chapterId: number;
  title: string;
  url: string;
  authors: string;
  pageStart: number;
  pageEnd: number;
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const { volumeId } = Route.useParams();

  const { mutate: deleteChapterMutation, isPending: isDeleteChapterPending } =
    useMutation({
      mutationFn: deleteChapter,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Capitolul a fost șters cu succes');
      },
      onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
    });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere capitol',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți capitolul?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteChapterMutation(chapterId);
      },
    });
  };

  const {
    handleSubmit: handleEditChapterSubmit,
    reset: resetEditChapterForm,
    formState: { errors: editChapterErrors, isValid: isEditChapterValid },
    control: editChapterControl,
  } = useForm<ChapterForm>({
    defaultValues: {
      title: title,
      authors: authors,
      pageStart: `${pageStart}`,
      pageEnd: `${pageEnd}`,
    },
  });

  const [isEditChapterModalOpen, setIsEditChapterModalOpen] = useState(false);
  const showEditChapterModal = () => {
    setIsEditChapterModalOpen(true);
  };

  const handleCancelForEditChapter = () => {
    setIsEditChapterModalOpen(false);
    resetEditChapterForm();
  };

  const [isChangePdfModalOpen, setIsChangePdfModalOpen] = useState(false);

  const showChangePdfModal = () => {
    setIsChangePdfModalOpen(true);
  };

  const {
    fileList: pdfList,
    resetFileList: resetPdfList,
    uploadFileProps: uploadPdfProps,
  } = useFileUpload(FileType.PDF);

  const handleCancelForEditPdf = () => {
    setIsChangePdfModalOpen(false);
    resetPdfList();
  };

  const { mutate: updatePdfMutation, isPending: isUpdatePdfPending } =
    useMutation({
      mutationFn: updatePdf,
      onError: () => toast.error('Nu s-a putut edita pdf-ul!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsChangePdfModalOpen(false);
        resetPdfList();
        toast.success('Pdf-ul a fost editat cu succes.');
      },
    });

  const onSubmitPdf = () => {
    updatePdfMutation({ id: chapterId, pdf: pdfList[0] });
  };
  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === ActionableButton.DELETE) {
      showPropsConfirm();
    } else if (e.key === ActionableButton.EDIT) {
      showEditChapterModal();
    } else if (e.key === ActionableButton.EDIT_PDF) {
      showChangePdfModal();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: ActionableButton.EDIT,
      label: 'Editează capitolul',
      icon: <EditOutlined />,
    },
    {
      key: ActionableButton.EDIT_PDF,
      label: 'Schimba pdf',
      icon: <EditOutlined />,
    },
    {
      key: ActionableButton.DELETE,
      danger: true,
      label: 'Șterge capitolul',
      icon: <DeleteOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
    loading: isDeleteChapterPending,
  };
  const handleContainerClick = () => {
    window.location.href = url;
  };

  const { handleSubmit } = useForm<VolumeForm>();

  const { mutate: editChapterMutation, isPending: isEditChapterPending } =
    useMutation({
      mutationFn: updateChapter,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        toast.success('Capitolul a fost editat cu succes');
        resetEditChapterForm();
        handleCancelForEditChapter();
      },
      onError: () => toast.error('A apărut o eroare în momentul editării'),
    });

  const onSubmit: SubmitHandler<ChapterForm> = data => {
    editChapterMutation({ ...data, id: chapterId });
  };
  return (
    <div className="chapterContainer">
      <div className="details" onClick={handleContainerClick}>
        <span className="chapterTitle">{title}</span>
        <span className="desc">{authors}</span>
      </div>
      <div className="pages">
        <span>
          pag. {pageStart} - {pageEnd}
        </span>
        <Modal
          title="Adaugă un capitol"
          open={isEditChapterModalOpen}
          onCancel={handleCancelForEditChapter}
          footer={[
            <Button key="back" onClick={handleCancelForEditChapter}>
              Renunță
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isEditChapterPending}
              disabled={!isEditChapterValid}
              onClick={handleEditChapterSubmit(onSubmit)}>
              Salvează
            </Button>,
          ]}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              name="title"
              defaultValue=""
              control={editChapterControl}
              rules={{
                required: 'Titlul capitolului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={editChapterErrors.title ? 'error' : ''}
                  placeholder={
                    editChapterErrors.title?.message ?? 'Titlul capitolului'
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
              control={editChapterControl}
              rules={{
                required: 'Autorii capitolului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={editChapterErrors.title ? 'error' : ''}
                  placeholder={
                    editChapterErrors.title?.message ?? 'Autorii capitolului'
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
              control={editChapterControl}
              rules={{
                required:
                  'Pagina de start a capitolului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={editChapterErrors.title ? 'error' : ''}
                  placeholder={
                    editChapterErrors.title?.message ??
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
              control={editChapterControl}
              rules={{
                required:
                  'Pagina de sfârșit a capitolului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={editChapterErrors.title ? 'error' : ''}
                  placeholder={
                    editChapterErrors.title?.message ??
                    'Pagina de sfârșit a capitolului'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}></Controller>
          </Space>
        </Modal>

        <Modal
          title="Schimbă pdf-ul capitolului"
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
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Upload {...uploadPdfProps}>
              <Button icon={<UploadOutlined />}>Selectează pdf</Button>
            </Upload>
          </Space>
        </Modal>
        {isLoggedIn && (
          <Dropdown
            menu={menuProps}
            placement="bottomLeft"
            arrow
            trigger={['click']}>
            <Button type="primary" size="large">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
          </Dropdown>
        )}
      </div>
    </div>
  );
};
