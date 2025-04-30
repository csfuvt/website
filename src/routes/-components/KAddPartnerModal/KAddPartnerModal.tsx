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
  partnerLocation?: string;
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
  formData.append('link', link);
  formData.append('address', address);
  if (partnerLocation) formData.append('partnerLocation', partnerLocation);
  formData.append('pictureUrl', pictureUrl);

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
  targetPage,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  handleCancel: () => void;
  targetPage?: 'CIEFT_PAGE' | 'COLOCVIU_PAGE';
}) => {
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<File[]>([]);
  //const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PartnerForm & { pictureUrl: File }) => {
      await addPartner({
        name: data.name,
        link: data.link,
        address: data.address,
        partnerLocation: data.partnerLocation || '',
        pictureUrl: data.pictureUrl,
      });
    },
    onError: () => toast.error('Nu s-a putut adăuga partenerul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['partners'] });
      setIsOpen(false);
      toast.success('Partenerul a fost adăugat cu succes.');
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
  } = useForm<PartnerForm>({
    defaultValues: {
      name: '',
      link: '',
      address: '',
      partnerLocation:
        targetPage === 'CIEFT_PAGE'
          ? 'CIEFT_PAGE'
          : targetPage === 'COLOCVIU_PAGE'
            ? 'COLOCVIU_PAGE'
            : 'CENTRAL_EASTERN_EUROPE',
    },
  });

  const onSubmit: SubmitHandler<PartnerForm> = async data => {
    if (!fileList[0]) {
      toast.error('Adaugă o imagine înainte de a salva!');
      return;
    }
    await mutateAsync({
      ...data,
      pictureUrl: fileList[0],
    });
  };

  const renderForm = () => {
    if (targetPage === 'CIEFT_PAGE') {
      return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{ required: 'Numele este obligatoriu' }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.name ? 'error' : ''}
                value={value}
                onChange={onChange}
                placeholder="Nume partener CIEFT"
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
                placeholder="Link partener CIEFT"
              />
            )}
          />
          <Controller
            name="partnerLocation"
            defaultValue="CIEFT_PAGE"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input type="hidden" value={value} onChange={onChange} />
            )}
          />
          <Upload {...uploadFileProps}>
            <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
          </Upload>
        </Space>
      );
    } else if (targetPage === 'COLOCVIU_PAGE') {
      return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="name"
            defaultValue=""
            control={control}
            rules={{ required: 'Numele este obligatoriu' }}
            render={({ field: { onChange, value } }) => (
              <Input
                status={errors.name ? 'error' : ''}
                value={value}
                onChange={onChange}
                placeholder="Nume partener Colocviu"
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
                placeholder="Link partener Colocviu"
              />
            )}
          />
          <Upload {...uploadFileProps}>
            <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
          </Upload>
        </Space>
      );
    }

    // Formular implicit cu dropdown pentru locații
    return (
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Controller
          name="name"
          defaultValue=""
          control={control}
          rules={{ required: 'Numele este obligatoriu' }}
          render={({ field: { onChange, value } }) => (
            <TextArea
              status={errors.name ? 'error' : ''}
              value={value}
              onChange={onChange}
              placeholder="Nume partener"
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
              placeholder="Link partener"
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
              placeholder="Adresă partener"
              allowClear
            />
          )}
        />

        <Controller
          name="partnerLocation"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value}
              onChange={onChange}
              size="large"
              placeholder="Selectează locația partenerului">
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
          )}
        />
        <Upload {...uploadFileProps}>
          <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
        </Upload>
      </Space>
    );
  };

  return (
    <Modal
      title={
        targetPage === 'CIEFT_PAGE'
          ? 'Adaugă un partener pentru CIEFT'
          : targetPage === 'COLOCVIU_PAGE'
            ? 'Adaugă un partener pentru Colocviu'
            : 'Adaugă un nou partener'
      }
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
          disabled={isEmpty(fileList) || !isValid}
          onClick={handleSubmit(onSubmit)}>
          Salvează
        </Button>,
      ]}>
      {renderForm()}
    </Modal>
  );
};
