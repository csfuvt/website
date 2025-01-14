import './styles.css';
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal, Form, Input, Upload } from 'antd';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../constants.ts';

const deleteIndex = (id: number, publicationType: string) =>
  axios.delete(`/indexes/${id}/${publicationType}`).then(res => res.data);

const updateIndex = (id: number, formData: FormData) =>
  axios.post(`/indexes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const KIndex = ({
  id,
  name,
  pictureUrl,
  link,
  publicationType,
}: {
  id: number;
  name: string;
  pictureUrl?: string;
  link?: string;
  publicationType: 'DIALOGUES_FRANCOPHONE' | 'AGAPES_FRANCOPHONE';
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteIndex(id, publicationType),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['indexes', publicationType],
      });
      toast.success('Indexarea a fost ștearsă cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const { mutate: editMutate, isPending: isEditing } = useMutation({
    mutationFn: (formData: FormData) => updateIndex(id, formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['indexes', publicationType],
      });
      toast.success('Indexarea a fost actualizată cu succes');
      setEditModalVisible(false);
    },
    onError: () => toast.error('A apărut o eroare în momentul actualizării'),
  });

  const handleEdit = (values: { name: string; link: string }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('link', values.link);
    formData.append('publicationType', publicationType);

    // Adăugăm fișierul dacă există
    if (file) {
      formData.append('pictureUrl', file);
    }

    editMutate(formData);
  };

  const handleUpload = (file: File) => {
    setFile(file); // Stocăm fișierul selectat
    return false; // Prevenim upload-ul automat
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => {
          setEditModalVisible(true);
          form.setFieldsValue({ name, link });
        }}>
        Editare
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => deleteMutate()}
        danger>
        Ștergere
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container-index">
      <div className="index-item">
        <img
          src={`${BASE_URL}/pics/indexes/${pictureUrl}`}
          alt={name}
          className="image"
          onClick={() => {
            if (link) {
              window.open(link, '_blank', 'noopener,noreferrer');
            }
          }}
          style={{ cursor: link ? 'pointer' : 'default' }}
        />
        {link ? (
          <div className="text-container-index">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </div>
        ) : (
          <div className="text-container-index">{name}</div>
        )}
      </div>
      {isLoggedIn && (
        <div className="delete">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <Button type="primary" icon={<MoreOutlined />} shape="circle" />
          </Dropdown>
        </div>
      )}

      <Modal
        title="Editare Index"
        visible={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        confirmLoading={isEditing}
        footer={null}>
        <Form
          form={form}
          initialValues={{ name: '', link: '' }}
          onFinish={handleEdit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <Form.Item
            label=""
            name="name"
            rules={[{ required: true, message: 'Numele este obligatoriu' }]}
            style={{ width: '100%' }}>
            <Input placeholder="Nume" allowClear />
          </Form.Item>

          <Form.Item label="" name="link" style={{ width: '100%' }}>
            <Input placeholder="Link" allowClear />
          </Form.Item>

          <Form.Item>
            <Upload beforeUpload={handleUpload} showUploadList={true}>
              <Button icon={<UploadOutlined />}>Modifică fotografie</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
              }}>
              <Button onClick={() => setEditModalVisible(false)}>
                Anulează
              </Button>
              <Button type="primary" htmlType="submit">
                Salvează
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KIndex;
