import {
  Modal,
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { Translation } from '../../research_/publications_/translations/-translation.model.ts';
import { isEmpty } from 'lodash-es';

interface TranslationForm {
  label: string;
  author: string;
  translator: string;
  editura: string;
  year: number;
  bionote: string;
  description: string;
  url?: string;
}

const addTranslation = ({
  label,
  author,
  translator,
  editura,
  year,
  bionote,
  description,
  url,
  file,
}: TranslationForm & { file: UploadFile }) => {
  const formData = new FormData();
  formData.append('cover', file as unknown as Blob);
  formData.append('label', label);
  formData.append('author', author);
  formData.append('description', description);
  formData.append('translator', translator);
  if (url) {
    formData.append('url', url);
  }
  if (editura) {
    formData.append('editura', editura);
  }
  if (year) {
    formData.append('year', year.toString());
  }
  if (bionote) {
    formData.append('bionote', bionote);
  }
  return axios
    .post<Translation>(`/translations`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

export const KAddTranslationModal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addTranslation,
    onError: () => toast.error('Nu s-a putut adăuga traducerea!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['translations'] });
      setIsOpen(false);
      toast.success('Traducerea a fost adăugată cu succes.');
    },
  });

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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
    if (isEmpty(fileList)) {
      toast.error('Selectează un fișier înainte de a salva!');
      return;
    }
    mutate({ ...values, file: fileList[0] });
  };

  return (
    <Modal
      title="Adaugă o nouă traducere"
      open={true}
      onCancel={() => setIsOpen(false)}
      footer={null}
      centered>
      <Form
        form={form}
        onFinish={handleFinish}
        initialValues={{ description: '', url: '' }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <Form.Item
          label=""
          name="label"
          rules={[{ required: true, message: 'Titlul este obligatoriu' }]}
          style={{ width: '100%' }}>
          <TextArea
            placeholder="Titlu (obligatoriu)"
            autoSize={{ minRows: 2, maxRows: 4 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label=""
          name="author"
          rules={[{ required: true, message: 'Autorul este obligatoriu' }]}
          style={{ width: '100%' }}>
          <TextArea
            placeholder="Autor (obligatoriu)"
            autoSize={{ minRows: 2, maxRows: 4 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label=""
          name="translator"
          style={{ width: '100%' }}
          rules={[
            { required: true, message: 'Traducătorul este obligatoriu' },
          ]}>
          <TextArea
            placeholder="Translator (obligatoriu)"
            autoSize={{ minRows: 1, maxRows: 2 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="" name="editura" style={{ width: '100%' }}>
          <TextArea
            placeholder="Editura (opțional)"
            autoSize={{ minRows: 1, maxRows: 2 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="" name="year" style={{ width: '100%' }}>
          <TextArea
            placeholder="Anul apariției (opțional)"
            autoSize={{ minRows: 1, maxRows: 2 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="" name="bionote" style={{ width: '100%' }}>
          <TextArea
            placeholder="Bionotă (opțional)"
            autoSize={{ minRows: 2, maxRows: 4 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label=""
          name="description"
          rules={[{ required: true, message: 'Descrierea este obligatorie' }]}
          style={{ width: '100%' }}>
          <TextArea
            placeholder="Descriere (obligatoriu)"
            autoSize={{ minRows: 2, maxRows: 4 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="" name="url" style={{ width: '100%' }}>
          <Input placeholder="url (opțional)" allowClear />
        </Form.Item>

        <Form.Item label="" style={{ width: '100%' }}>
          <Upload {...uploadFileProps}>
            <Button icon={<UploadOutlined />}>Selectează fișier</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}>
            <Button onClick={() => setIsOpen(false)}>Anulează</Button>
            <Button type="primary" htmlType="submit">
              Salvează
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
