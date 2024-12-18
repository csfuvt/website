import './styles.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Button, Input, Upload, UploadProps, Space } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';

interface PostersForm {
  type?: string;
}

const addPoster = ({
  pictureUrl,
  programDocUrl,
  rezumatDocUrl,
  type,
}: PostersForm & {
  pictureUrl: File;
  programDocUrl: File;
  rezumatDocUrl: File;
}) => {
  const formData = new FormData();
  if (type) formData.append('type', type);
  formData.append('pictureUrl', pictureUrl);
  formData.append('programDocUrl', programDocUrl);
  formData.append('rezumatDocUrl', rezumatDocUrl);

  return axios
    .post(`/event-posters`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

export const KAddPostersModal = ({
  setIsOpen,
  isModalOpen,
  handleCancel,
  targetPage,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  handleCancel: () => void;
  targetPage?: 'CIEFT' | 'COLOCVIU';
}) => {
  const queryClient = useQueryClient();
  const [pictureFileList, setPictureFileList] = useState<File[]>([]);
  const [programDocFileList, setProgramDocFileList] = useState<File[]>([]);
  const [rezumatDocFileList, setRezumatDocFileList] = useState<File[]>([]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      data: PostersForm & {
        pictureUrl: File;
        programDocUrl: File;
        rezumatDocUrl: File;
      }
    ) => {
      await addPoster({
        type: data.type || '',
        pictureUrl: data.pictureUrl,
        programDocUrl: data.programDocUrl,
        rezumatDocUrl: data.rezumatDocUrl,
      });
    },
    onError: () => toast.error('Nu s-a putut adăuga posterul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['event-posters'] });
      setIsOpen(false);
      toast.success('Posterul a fost adăugat cu succes.');
    },
  });

  const uploadFilePropsPIC: UploadProps = {
    onRemove: () => setPictureFileList([]),
    beforeUpload: file => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg';
      if (!isJpgOrPng) {
        toast.error('Se pot adăuga doar fișiere JPG / PNG!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 5MB');
        return false;
      }
      setPictureFileList([file]);
      return false;
    },
    fileList: pictureFileList.map(file => ({
      uid: file.name,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file),
    })),
  };

  const uploadFilePropsProgramDoc: UploadProps = {
    onRemove: () => setProgramDocFileList([]),
    beforeUpload: file => {
      if (file.type !== 'application/pdf') {
        toast.error('Se pot adăuga doar fișiere PDF!');
        return false;
      }
      setProgramDocFileList([file]);
      return false;
    },
    fileList: programDocFileList.map(file => ({
      uid: file.name,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file),
    })),
  };

  const uploadFilePropsRezumatDoc: UploadProps = {
    onRemove: () => setRezumatDocFileList([]),
    beforeUpload: file => {
      if (file.type !== 'application/pdf') {
        toast.error('Se pot adăuga doar fișiere PDF!');
        return false;
      }
      setRezumatDocFileList([file]);
      return false;
    },
    fileList: rezumatDocFileList.map(file => ({
      uid: file.name,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file),
    })),
  };

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm<PostersForm>({
    defaultValues: {
      type:
        targetPage === 'CIEFT'
          ? 'CIEFT'
          : targetPage === 'COLOCVIU'
            ? 'COLOCVIU'
            : undefined,
    },
  });

  const onSubmit: SubmitHandler<PostersForm> = async data => {
    if (
      !pictureFileList[0] ||
      !programDocFileList[0] ||
      !rezumatDocFileList[0]
    ) {
      toast.error('Adaugă toate fișierele înainte de a salva!');
      return;
    }

    await mutateAsync({
      ...data,
      pictureUrl: pictureFileList[0],
      programDocUrl: programDocFileList[0],
      rezumatDocUrl: rezumatDocFileList[0],
    });
  };

  const renderForm = () => {
    return (
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input type="hidden" value={value} onChange={onChange} />
          )}
        />
        <Upload {...uploadFilePropsPIC}>
          <Button icon={<UploadOutlined />}>
            Selectează imaginea pentru poster
          </Button>
        </Upload>
        <Upload {...uploadFilePropsProgramDoc}>
          <Button icon={<UploadOutlined />}>
            Selectează documentul pentru program
          </Button>
        </Upload>
        <Upload {...uploadFilePropsRezumatDoc}>
          <Button icon={<UploadOutlined />}>
            Selectează documentul pentru rezumat
          </Button>
        </Upload>
      </Space>
    );
  };

  return (
    <Modal
      title={`Adaugă un poster pentru ${targetPage}`}
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
          disabled={
            isEmpty(pictureFileList) ||
            isEmpty(programDocFileList) ||
            isEmpty(rezumatDocFileList) ||
            !isValid
          }
          onClick={handleSubmit(onSubmit)}>
          Salvează
        </Button>,
      ]}>
      {renderForm()}
    </Modal>
  );
};
