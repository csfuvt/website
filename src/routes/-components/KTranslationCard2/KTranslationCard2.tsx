import styles from './KTranslationCard2.module.css';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth.ts';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Modal,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Translation } from '../../research_/publications_/translations/-translation.model.ts';
import { useState } from 'react';
import { ActionableButton } from '../KChapter/KChapter.tsx';
import { Controller, useForm } from 'react-hook-form';
import TextArea from 'antd/es/input/TextArea';
import { BASE_URL } from '../../../constants.ts';

const deleteTranslation = (id: number) =>
  axios.delete(`/translations/${id}`).then(res => res.data);

interface TranslationForm {
  title: string;
  description: string;
  link?: string;
  author?: string;
  translator: string;
  bionote?: string;
  editura?: string;
  year?: string;
  bookImage: File;
}

const editTranslation = async ({
  id,
  formData,
}: {
  id: number;
  formData: FormData;
}) => {
  const res = await axios.post<Translation>(`/translations/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export const KTranslationCard2 = ({
  id,
  title,
  description,
  link,
  author,
  translator,
  bionote,
  editura,
  year,
  bookImage,
  invalidateCache,
}: {
  id: number;
  title: string;
  description: string;
  link?: string;
  author?: string;
  translator: string;
  bionote?: string;
  editura?: string;
  year?: string;
  bookImage: string;
  invalidateCache: () => void;
}) => {
  const { isLoggedIn } = useAuth();

  const [imageSrc, setImageSrc] = useState(bookImage);

  const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
    mutationFn: deleteTranslation,
    onSuccess: () => {
      toast.success('Traducerea a fost ștearsă cu succes!');
      invalidateCache();
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { confirm } = Modal;
  const showPropsConfirm = () => {
    confirm({
      title: 'Ștergere traducere',
      icon: <ExclamationCircleFilled />,
      content: 'Sigur doriți să ștergeți această traducere?',
      okText: 'Șterge',
      okType: 'danger',
      cancelText: 'Renunță',
      onOk() {
        deleteMutation(id);
      },
    });
  };

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
    formState: { errors },
    control,
  } = useForm<TranslationForm>({
    defaultValues: {
      title,
      description,
      link,
      author,
      translator,
      bionote,
      editura,
      year,
    },
  });

  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);

  const uploadFileProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        toast.error('Se pot adăuga doar fișiere JPG / PNG!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 30;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 30MB');
        return false;
      }
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleFinish = (values: TranslationForm) => {
    const file = fileList[0];
    const rawFile = file?.originFileObj ?? (file as unknown as File);

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('translator', values.translator);
    if (values.link) formData.append('link', values.link);
    if (values.author) formData.append('author', values.author);
    if (values.bionote) formData.append('bionote', values.bionote);
    if (values.editura) formData.append('editura', values.editura);
    if (values.year) formData.append('year', values.year);

    if (rawFile) {
      formData.append('cover', rawFile);
    }

    editMutation({ id, formData });
  };

  const { mutate: editMutation, isPending: isEditPending } = useMutation({
    mutationFn: editTranslation,
    onSuccess: updatedData => {
      toast.success('Traducerea a fost editată cu succes');
      invalidateCache();
      const timestamp = new Date().getTime();
      const newImageUrl = `${BASE_URL}/pics/translations/${updatedData.id}${updatedData.coverExtension}?t=${timestamp}`;
      setImageSrc(newImageUrl);
      resetForm({
        title: updatedData.links[0].label,
        description: updatedData.description,
        link: updatedData.links[0].url,
        author: updatedData.links[0].author,
        translator: updatedData.translator,
        bionote: updatedData.links[0].bionote,
        editura: updatedData.links[0].editura,
        year: updatedData.links[0].year,
      });
      handleCancelForEdit();
    },
    onError: () => toast.error('A apărut o eroare în momentul editării'),
  });

  return (
    <div className={styles.acteColocviiContainer}>
      <div className={styles.card}>
        {}
        <img
          src={imageSrc}
          className={styles.cardImage}
          alt={title}
          // onClick={() => {
          //   if (link) {
          //     window.open(link, '_blank');
          //   }
          // }}
        />

        {isLoggedIn && (
          <div className="delete">
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
          title="Editează traducerea"
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
              onClick={handleSubmit(handleFinish)}>
              Salvează
            </Button>,
          ]}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Titlul este obligatoriu' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Titlul (obligatoriu)"
                  status={errors.title ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="author"
              control={control}
              rules={{ required: 'Autorul este obligatoriu' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Autorul (obligatoriu)"
                  status={errors.author ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="translator"
              control={control}
              rules={{ required: 'Traducătorul este obligatoriu' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Traducător"
                  status={errors.translator ? 'error' : ''}
                />
              )}
            />

            <Controller
              name="editura"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Editura"
                  status={errors.editura ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Anul apariției"
                  status={errors.year ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="bionote"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Bionota"
                  status={errors.bionote ? 'error' : ''}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Descrierea este obligatorie' }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Descriere (obligatoriu)"
                  status={errors.title ? 'error' : ''}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              )}
            />
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Url"
                  status={errors.link ? 'error' : ''}
                />
              )}
            />

            <Form.Item label="" style={{ width: '100%' }}>
              <Upload {...uploadFileProps}>
                <Button icon={<UploadOutlined />}>Selectează fișier</Button>
              </Upload>
            </Form.Item>
          </Space>
        </Modal>
        <div className={styles.cardContent}>
          {}
          <div className={styles.title}>{title}</div>
          {author && (
            <div className={styles.description}>
              <b>Autor:</b> {author}
            </div>
          )}

          {translator && (
            <div className={styles.description}>
              <b>Traducător:</b> {translator}
            </div>
          )}
          {editura && (
            <div className={styles.description}>
              <b>Editura:</b> {editura}
            </div>
          )}
          {year && (
            <div className={styles.description}>
              <b>Anul apariției:</b> {year}
            </div>
          )}
          {bionote && (
            <div className={styles.description}>
              <b>Bionotă:</b> {bionote}
            </div>
          )}
          <div className={styles.description}>{description}</div>
          <div className={styles.colocviiDetails}>
            {link && (
              <a href={link} target={'_blank'}>
                <strong>
                  <i>
                    <u>Editură</u>
                  </i>
                </strong>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KTranslationCard2;
