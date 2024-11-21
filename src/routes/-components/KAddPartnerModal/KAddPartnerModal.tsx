import './styles.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Button, Input, Upload, UploadProps, Space, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';

const { Option } = Select;

interface PartnerForm {
  name: string;
  link: string;
  address: string;
  partnerLocation: string;
}

const addPartner = ({
  name,
  link,
  address,
  partnerLocation,
  pictureUrl,
}: PartnerForm & { pictureUrl: File }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('partnerLocation', partnerLocation);
  formData.append('pictureUrl', pictureUrl);
  formData.append('link', link);
  formData.append('address', address);

  return axios
    .post(`/partners`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

export const KAddPartnerModal = ({
  setIsOpen,
  isModalOpen,
  handleCancel,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  handleCancel: () => void;
}) => {
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<File[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PartnerForm & { pictureUrl: File }) => {
      await addPartner({
        name: data.name,
        link: data.link,
        address: data.address,
        partnerLocation: data.partnerLocation,
        pictureUrl: data.pictureUrl,
      });
    },
    onError: () => toast.error('Nu s-a putut adăuga partnerul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['partners'] });
      setIsOpen(false);
      toast.success('Partnerul a fost adăugat cu succes.');
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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 2MB');
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
  } = useForm<PartnerForm>({
    defaultValues: {
      name: '',
      link: '',
      address: '',
      partnerLocation: '',
    },
  });

  const onSubmit: SubmitHandler<PartnerForm> = async data => {
    if (!fileList[0]) {
      toast.error('Adaugă o imagine înainte de a salva!');
      return;
    }
    if (!selectedLocation) {
      toast.error('Selectează o locație pentru partener!');
      return;
    }
    await mutateAsync({
      ...data,
      pictureUrl: fileList[0],
      partnerLocation: selectedLocation,
    });
  };

  const onCancelHandler = () => {
    handleCancel();
  };

  return (
    <Modal
      title="Adaugă un nou partener"
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
          disabled={isEmpty(fileList) || !isValid || !selectedLocation}
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

        <Controller
          name="address"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              size="large"
              placeholder="Adresa partenerului"
              allowClear
            />
          )}
        />

        <Select
          placeholder="Selectează locația partenerului"
          onChange={value => setSelectedLocation(value)}
          value={selectedLocation}
          size="large">
          <Option value="CENTRAL_EASTERN_EUROPE">
            Europa Centrală și de Est
          </Option>
          <Option value="WESTERN_EUROPE">Europa de Vest</Option>
          <Option value="NORTH_AMERICA">America de Nord</Option>
          <Option value="CENTRAL_SOUTH_AMERICA">
            America Centrală și de Sud
          </Option>
          <Option value="AFRICA">Africa</Option>
          <Option value="ASIA">Asia</Option>
        </Select>

        <Upload {...uploadFileProps}>
          <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
        </Upload>
      </Space>
    </Modal>
  );
};
