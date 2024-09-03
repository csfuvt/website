import './styles.css';
import { Link } from '@tanstack/react-router';
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
import { useAuth } from '../../../hooks/useAuth.ts';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
} from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isEmpty } from 'lodash-es';
import { yupResolver } from '@hookform/resolvers/yup';
import { CallForm } from '../../research_/publications_/dialogue-francophones_/calls_/future';
import * as yup from 'yup';
import {
  AntDFileType,
  FileType,
  useFileUpload,
} from '../../../hooks/useFileUpload.ts';
import { CallType } from '../../research_/publications_/dialogue-francophones_/calls_/-calls.model.ts';

const deleteCall = (id: number) =>
  axios.delete(`/contribution-calls/${id}`).then(res => res.data);

const updateCall = async ({
  id,
  title,
  year,
}: CallForm & {
  id: number;
}) => {
  const res = await axios.post<CallType>(`/contribution-calls/${id}`, {
    title,
    year,
  });
  return res.data;
};

const updatePdf = async ({ id, pdf }: { id: number; pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('pdf', pdf as AntDFileType);
  const res = await axios.post<CallType>(
    `/contribution-calls/${id}/pdf`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return res.data;
};

export const KArchiveSection = ({
  title,
  year,
  url,
  id,
}: {
  title: string;
  year: string;
  url: string;
  id: number;
}) => {
  const { isLoggedIn } = useAuth();
  const [isEditCallModalOpen, setIsEditCallModalOpen] = useState(false);
  const [isChangePdfModalOpen, setIsChangePdfModalOpen] = useState(false);

  const showEditChapterModal = () => {
    resetEditCallForm({
      title: title,
      year: year,
    });
    setIsEditCallModalOpen(true);
  };

  const showChangePdfModal = () => {
    setIsChangePdfModalOpen(true);
  };

  const items: MenuProps['items'] = [
    {
      key: ActionableButton.EDIT,
      label: 'Editează apelul',
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
      label: 'Șterge apelul',
      icon: <DeleteOutlined />,
    },
  ];

  const queryClient = useQueryClient();
  const { mutate: deleteCallMutation, isPending: isDeleteCallPending } =
    useMutation({
      mutationFn: deleteCall,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`calls`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`calls/${id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`latestCall`],
        });
        toast.success('Apelul a fost șters cu succes');
      },
      onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
    });

  const { mutate: editCallMutation, isPending: isEditCallPending } =
    useMutation({
      mutationFn: updateCall,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`calls`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`calls/${id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`latestCall`],
        });
        toast.success('Apelul a fost editat cu succes');
        resetEditCallForm();
        handleCancelForEditChapter();
      },
      onError: () => toast.error('A apărut o eroare în momentul editării'),
    });

  const { mutate: updatePdfMutation, isPending: isUpdatePdfPending } =
    useMutation({
      mutationFn: updatePdf,
      onError: () => toast.error('Nu s-a putut edita pdf-ul!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`calls`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`calls/${id}`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`latestCall`],
        });
        setIsChangePdfModalOpen(false);
        resetPdfList();
        toast.success('Pdf-ul a fost editat cu succes.');
      },
    });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere apel',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți apelul?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteCallMutation(id);
      },
    });
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

  const menuProps = {
    items,
    onClick: handleMenuClick,
    loading: isDeleteCallPending,
  };

  const schema = yup.object().shape({
    title: yup.string().required(),
    year: yup.string().required(),
  });

  const {
    handleSubmit: handleEditCallSubmit,
    reset: resetEditCallForm,
    formState: { errors: editCallErrors, isValid: isEditChapterValid },
    control: editCallControl,
  } = useForm<CallForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title,
      year: year,
    },
  });
  const handleCancelForEditChapter = () => {
    setIsEditCallModalOpen(false);
    resetEditCallForm();
  };

  const handleCancelForEditPdf = () => {
    setIsChangePdfModalOpen(false);
    resetPdfList();
  };

  const {
    fileList: pdfList,
    resetFileList: resetPdfList,
    uploadFileProps: uploadPdfProps,
  } = useFileUpload(FileType.PDF);

  const { handleSubmit } = useForm<CallForm>();
  const onSubmit: SubmitHandler<CallForm> = data => {
    editCallMutation({ ...data, id: id });
  };

  const onSubmitPdf = () => {
    updatePdfMutation({ id: id, pdf: pdfList[0] });
  };

  return (
    <>
      <div className="call">
        <Link to={url} className="information">
          <div className="archive">
            <span className="link">Dialogues Francophones NO. {title}</span>
            <span className="description">{year}</span>
          </div>
        </Link>
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
      <Modal
        title="Editează apelul"
        open={isEditCallModalOpen}
        onCancel={handleCancelForEditChapter}
        footer={[
          <Button key="back" onClick={handleCancelForEditChapter}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isEditCallPending}
            disabled={!isEditChapterValid}
            onClick={handleEditCallSubmit(onSubmit)}>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="title"
            defaultValue=""
            control={editCallControl}
            rules={{
              required: 'Numărul apelului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={editCallErrors.title ? 'error' : ''}
                placeholder={
                  editCallErrors.title?.message ?? 'Numărul apelului'
                }
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="year"
            defaultValue=""
            control={editCallControl}
            rules={{
              required: 'Anul apelului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={editCallErrors.title ? 'error' : ''}
                placeholder={editCallErrors.title?.message ?? 'Anul apelului'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
        </Space>
      </Modal>

      <Modal
        title="Schimbă pdf-ul apelului"
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
    </>
  );
};
