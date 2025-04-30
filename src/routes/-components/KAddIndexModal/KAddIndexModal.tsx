import './styles.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Button, Input, Upload, UploadProps, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';

interface IndexForm {
  name: string;
  link: string;
  publicationType: string;
}

const addIndex = ({
  name,
  link,
  publicationType,
  pictureUrl,
}: IndexForm & { pictureUrl: File }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('publicationType', publicationType);
  formData.append('pictureUrl', pictureUrl);
  formData.append('link', link);

  return axios
    .post(`/indexes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

export const KAddIndexModal = ({
  setIsOpen,
  publicationType,
  isModalOpen,
  handleCancel,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  publicationType: 'DIALOGUES_FRANCOPHONE' | 'AGAPES_FRANCOPHONE';
  isModalOpen: boolean;
  handleCancel: () => void;
}) => {
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<File[]>([]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: IndexForm & { pictureUrl: File }) => {
      await addIndex({
        name: data.name,
        link: data.link,
        publicationType,
        pictureUrl: data.pictureUrl,
      });
    },
    onError: () => toast.error('Nu s-a putut adăuga indexul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['indexes'] });
      setIsOpen(false);
      toast.success('Indexul a fost adăugat cu succes.');
    },
  });

  const uploadFileProps: UploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: file => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg';
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
    fileList: fileList.map(file => ({
      uid: file.name,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file),
    })),
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<IndexForm>({
    defaultValues: {
      name: '',
      link: '',
    },
  });

  const onSubmit: SubmitHandler<IndexForm> = async data => {
    if (!fileList[0]) {
      toast.error('Adaugă o imagine înainte de a salva!');
      return;
    }
    await mutateAsync({ ...data, pictureUrl: fileList[0] });
  };

  const onCancelHandler = () => {
    handleCancel();
  };

  return (
    <Modal
      title="Adauga un nou index"
      open={isModalOpen}
      onCancel={onCancelHandler}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Renunță
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isPending}
          disabled={isEmpty(fileList) || !isValid}
          onClick={handleSubmit(onSubmit)}>
          Salvează
        </Button>,
      ]}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{
            required: 'Numele este un câmp obligatoriu',
          }}
          render={({ field: { onChange, value } }) => (
            <TextArea
              status={errors.name ? 'error' : ''}
              value={value}
              onChange={onChange}
              placeholder={errors.name?.message ?? 'Nume'}
              autoSize={{ minRows: 1, maxRows: 3 }}
              allowClear
            />
          )}
        />

        <Controller
          name="link"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              size="large"
              placeholder="Link"
              allowClear
            />
          )}
        />

        <Upload {...uploadFileProps}>
          <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
        </Upload>
      </Space>
    </Modal>
  );
};
