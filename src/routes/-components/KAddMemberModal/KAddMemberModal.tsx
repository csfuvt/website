import './styles.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Button, Input, Upload, UploadProps, Space, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

interface MemberForm {
  name: string;
  description: string;
  role: string;
  link: string;
  memberCategory: string;
}

const addMember = ({
  name,
  description,
  role,
  link,
  memberCategory,
  pictureUrl,
  documentUrl,
  links,
}: MemberForm & {
  pictureUrl: File;
  documentUrl: File;
  links: { label: string; pageUrl: string }[];
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('role', role);
  formData.append('link', link);
  formData.append('memberCategory', memberCategory);
  formData.append('pictureUrl', pictureUrl);
  formData.append('documentUrl', documentUrl);

  formData.append('links', JSON.stringify(links));

  return axios
    .post(`/members`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

export const KAddMemberModal = ({
  setIsOpen,
  isModalOpen,
  handleCancel,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  handleCancel: () => void;
}) => {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [selectedMemberCategory, setMemberCategory] = useState<string | null>(
    null
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      data: MemberForm & {
        pictureUrl: File;
        documentUrl: File;
        links: { label: string; pageUrl: string }[];
      }
    ) => {
      await addMember({
        name: data.name,
        description: data.description,
        role: data.role,
        link: data.link,
        memberCategory: data.memberCategory,
        pictureUrl: data.pictureUrl,
        documentUrl: data.documentUrl,
        links: data.links,
      });
    },
    onError: () => toast.error('Nu s-a putut adăuga membrul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['members'] });
      setIsOpen(false);
      toast.success('Membrul a fost adăugat cu succes.');
    },
  });

  const uploadImgProps: UploadProps = {
    onRemove: () => setImageFile(null),
    beforeUpload: file => {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg';
      if (!isJpgOrPng) {
        toast.error('Se pot adăuga doar fișiere JPG / PNG');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 30;
      if (!isLt10M) {
        toast.error('Se pot adăuga doar fișiere până în 30MB');
        return false;
      }
      setImageFile(file);
      return false;
    },
    fileList: imageFile
      ? [
          {
            uid: imageFile.name,
            name: imageFile.name,
            status: 'done',
            url: URL.createObjectURL(imageFile),
          },
        ]
      : [],
  };

  const uploadPdfProps: UploadProps = {
    onRemove: () => setDocumentFile(null),
    beforeUpload: file => {
      const isPdf = file.type === 'application/pdf';
      if (!isPdf) {
        toast.error('Se pot adăuga doar fișiere PDF!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 30;
      if (!isLt10M) {
        toast.error('Se pot adăuga doar fișiere până în 30MB');
        return false;
      }
      setDocumentFile(file);
      return false;
    },
    fileList: documentFile
      ? [
          {
            uid: documentFile.name,
            name: documentFile.name,
            status: 'done',
            url: URL.createObjectURL(documentFile),
          },
        ]
      : [],
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<MemberForm & { links: { label: string; pageUrl: string }[] }>({
    defaultValues: {
      name: '',
      description: '',
      role: '',
      link: '',
      memberCategory: '',
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const onSubmit: SubmitHandler<
    MemberForm & { links: { label: string; pageUrl: string }[] }
  > = async data => {
    /*
    if (!fileList[0]) {
      toast.error('Adaugă un fisier înainte de a salva!');
      return;
    }*/
    if (!selectedMemberCategory) {
      toast.error('Selectează o locație pentru partener!');
      return;
    }
    await mutateAsync({
      ...data,
      pictureUrl: imageFile as File,
      documentUrl: documentFile as File,
      memberCategory: selectedMemberCategory,
    });
  };

  const onCancelHandler = () => {
    handleCancel();
  };

  return (
    <Modal
      title="Adaugă un nou membru"
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
          disabled={!isValid || !selectedMemberCategory}
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
          name="description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.TextArea
              value={value}
              onChange={onChange}
              placeholder="Descriere"
              allowClear
            />
          )}
        />

        <Controller
          name="role"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Rolul membrului"
              allowClear
            />
          )}
        />

        {/*<Controller*/}
        {/*  name="link"*/}
        {/*  defaultValue=""*/}
        {/*  control={control}*/}
        {/*  render={({ field: { onChange, value } }) => (*/}
        {/*    <Input*/}
        {/*      value={value}*/}
        {/*      onChange={onChange}*/}
        {/*      placeholder="Link (opțional)"*/}
        {/*      allowClear*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}

        {fields.map((field, index) => (
          <Space
            key={field.id}
            style={{ display: 'flex', marginBottom: 8 }}
            align="baseline">
            <Controller
              name={`links.${index}.label`}
              control={control}
              rules={{ required: 'Denumire link este obligatoriu' }}
              render={({ field }) => (
                <Input {...field} placeholder="Label (denumire link)" />
              )}
            />
            <Controller
              name={`links.${index}.pageUrl`}
              control={control}
              rules={{ required: 'Link-ul este obligatoriu' }}
              render={({ field }) => <Input {...field} placeholder="Link" />}
            />
            <MinusCircleOutlined onClick={() => remove(index)} />
          </Space>
        ))}

        <Button
          type="dashed"
          onClick={() => append({ label: '', pageUrl: '' })}
          block
          icon={<PlusOutlined />}>
          Adaugă link
        </Button>

        <Select
          placeholder="Selectează categoria membrului"
          onChange={value => setMemberCategory(value)}
          value={selectedMemberCategory}
          size="large">
          <Option value="FOUNDER">Fondator</Option>
          <Option value="BASE_TEAM">Echipa de bază</Option>
          <Option value="STUDENTS">Doctoranzi și studenți</Option>
          <Option value="ASSOCIATE_MEMBER">Membri asociați</Option>
          <Option value="COLLABORATOR">Colaboratori</Option>
        </Select>

        <Upload {...uploadImgProps}>
          <Button icon={<UploadOutlined />}>Selectează imaginea</Button>
        </Upload>
        <Upload {...uploadPdfProps}>
          <Button icon={<UploadOutlined />}>Selectează CV-ul/documentul</Button>
        </Upload>
      </Space>
    </Modal>
  );
};
