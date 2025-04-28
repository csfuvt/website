import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KTitle } from '../../../../../-components/KTitle/KTitle.tsx';
import './styles.css';
import axios from 'axios';
import { CallType } from './-calls.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Space,
  Spin,
  Upload,
  UploadFile,
} from 'antd';
import { isEmpty } from 'lodash-es';
import { BASE_URL } from '../../../../../../constants.ts';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../../hooks/useAuth.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { KAddButton } from '../../../../../-components/KAddButton/KAddButton.tsx';
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
} from '../../../../../../hooks/useFileUpload.ts';
import { ActionableButton } from '../../../../../-components/KChapter/KChapter.tsx';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export interface CallForm {
  title: string;
  year: string;
  publicationType: string;
}

const addCall = ({
  title,
  year,
  publicationType = 'CIEFT',
  pdf,
}: CallForm & { pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('pdf', pdf as AntDFileType);
  formData.append('title', title);
  formData.append('year', year);
  formData.append('publicationType', publicationType);
  return axios
    .post<CallType>(`/contribution-calls`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

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

export const getLatestCall = () =>
  axios
    .get<CallType>('/contribution-calls/type/CIEFT/latest')
    .then(res => res.data);

export const Route = createFileRoute(
  '/events/conferences/cieft/current-year/calls/archive'
)({
  component: Calls,
});

function Calls() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['calls'],
    queryFn: getLatestCall,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    refetch().then(() => setIsFetching(false));
  }, [refetch]);

  useEffect(() => {
    console.log('Data:', data);
  }, [data]);

  const {
    fileList: pdfList,
    resetFileList: resetPdfList,
    uploadFileProps: uploadPdfProps,
  } = useFileUpload(FileType.PDF);

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<CallForm>({
    defaultValues: {
      title: '',
      year: '',
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetAllForm();
  };

  const resetAllForm = () => {
    reset();
    resetPdfList();
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addCall,
    onError: () => toast.error('Nu s-a putut adăuga apelul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['calls'] });
      await queryClient.invalidateQueries({ queryKey: ['latestCall'] });
      setIsModalOpen(false);
      resetAllForm();
      toast.success('Apelul a fost adăugat cu succes.');
    },
  });

  const onSubmitAddCall: SubmitHandler<CallForm> = data => {
    mutate({ ...data, pdf: pdfList[0] });
  };

  const [isEditCallModalOpen, setIsEditCallModalOpen] = useState(false);
  const [isChangePdfModalOpen, setIsChangePdfModalOpen] = useState(false);

  const showEditChapterModal = () => {
    resetEditCallForm({
      title: data?.title,
      year: data?.year,
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

  const { mutate: deleteCallMutation, isPending: isDeleteCallPending } =
    useMutation({
      mutationFn: deleteCall,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`calls`],
        });
        await queryClient.invalidateQueries({
          queryKey: [`calls/${data?.id}`],
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
          queryKey: [`calls/${data?.id}`],
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
          queryKey: [`calls/${data?.id}`],
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
      content: 'Sigur doriți să ștergeți apelul ?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteCallMutation(data!.id);
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
    publicationType: yup.string().default('CIEFT'),
  });

  const {
    handleSubmit: handleEditCallSubmit,
    formState: { errors: editCallErrors, isValid: isEditChapterValid },
    control: editCallControl,
    reset: resetEditCallForm,
  } = useForm<CallForm>({
    defaultValues: {
      title: '',
      year: '',
      publicationType: 'CIEFT',
    },
    resolver: yupResolver(schema),
  });

  const handleCancelForEditChapter = () => {
    setIsEditCallModalOpen(false);
  };

  const handleCancelForEditPdf = () => {
    setIsChangePdfModalOpen(false);
    resetPdfList();
  };

  const onSubmitEditCall: SubmitHandler<CallForm> = calls => {
    editCallMutation({ ...calls, id: data!.id });
  };
  return (
    <div>
      {isLoggedIn && isEmpty(data) && (
        <KAddButton className={'position'} onClick={showModal} />
      )}
      {isLoading || isFetching ? (
        <Spin />
      ) : isError ? (
        <span>Apelul nu poate fi afișat momentan. Reveniți mai târziu!</span>
      ) : isEmpty(data) ? (
        <div className="flex">
          <span>Nu există un apel momentan.</span>
        </div>
      ) : (
        <div>
          <KBanner
            label={`Arhivă - Apel la comunicări CIEFT - ${data.title}`}
          />
          <div className="iframeContainer">
            <div className="calls-operations">
              <KTitle label={`Ediția ${data.year}`} />
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
            <iframe
              src={BASE_URL + `/files/contribution-calls/${data.pdf}`}
              className="iframe"
            />
          </div>
        </div>
      )}
      <Modal
        title="Creează un apel nou pentru CIEFT"
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
            disabled={isEmpty(pdfList) || !isValid}
            onClick={handleSubmit(onSubmitAddCall)}>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="title"
            defaultValue=""
            control={control}
            rules={{
              required: 'Nr. apelului este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.title ? 'error' : ''}
                placeholder={errors.title?.message ?? 'Titlu apel '}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Controller
            name="year"
            defaultValue=""
            control={control}
            rules={{
              required: 'Anul ediției este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.title ? 'error' : ''}
                placeholder={errors.title?.message ?? 'Ediție apel (an)'}
                value={value}
                onChange={onChange}
                allowClear
              />
            )}
          />
          <Upload {...uploadPdfProps}>
            <Button icon={<UploadOutlined />}>Selectează pdf</Button>
          </Upload>
        </Space>
      </Modal>
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
            onClick={handleEditCallSubmit(onSubmitEditCall)}>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="title"
            defaultValue=""
            control={editCallControl}
            rules={{
              required: 'Titlu apel este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={editCallErrors.title ? 'error' : ''}
                placeholder={editCallErrors.title?.message ?? 'Titlu apel'}
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
              required: 'Anul ediției este un câmp obligatoriu',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={editCallErrors.title ? 'error' : ''}
                placeholder={editCallErrors.title?.message ?? 'Anul ediției'}
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
            onClick={() =>
              updatePdfMutation({ id: data!.id, pdf: pdfList[0] })
            }>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Upload {...uploadPdfProps}>
            <Button icon={<UploadOutlined />}>Selectează pdf</Button>
          </Upload>
        </Space>
      </Modal>
    </div>
  );
}
