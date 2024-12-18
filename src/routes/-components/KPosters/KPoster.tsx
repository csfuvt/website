import {
  UploadOutlined,
  MoreOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Button, Modal, Upload, Dropdown, Menu, Space } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../constants.ts';
import { useState } from 'react';
import styles from './KPoster.module.css';

const updatePosterFile = (
  id: number,
  file: File | null,
  type: 'pictureUrl' | 'programDocUrl' | 'rezumatDocUrl'
) => {
  const formData = new FormData();

  if (file) {
    formData.append(type, file);
  } else {
    return axios.delete(`/event-posters/${id}/${type}`).then(res => res.data);
  }

  return axios
    .post(`/event-posters/${id}/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

export const KPoster = ({
  id,
  pictureUrl,
  programDocUrl,
  rezumatDocUrl,
  type,
  isLoggedIn,
}: {
  id: number;
  pictureUrl?: string;
  programDocUrl?: string;
  rezumatDocUrl?: string;
  type: 'CIEFT' | 'COLOCVIU';
  isLoggedIn: boolean;
}) => {
  const queryClient = useQueryClient();
  const [fileModalOpen, setFileModalOpen] = useState<
    'pictureUrl' | 'programDocUrl' | 'rezumatDocUrl' | null
  >(null);

  const { mutate: updateFile } = useMutation({
    mutationFn: ({
      file,
      type,
    }: {
      file: File | null;
      type: 'pictureUrl' | 'programDocUrl' | 'rezumatDocUrl';
    }) => updatePosterFile(id, file, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-posters'] });
      toast.success('Fișierul a fost actualizat');
      setFileModalOpen(null);
    },
    onError: () => toast.error('A apărut o eroare la actualizarea fișierului'),
  });

  const deletePoster = (id: number) => {
    return axios.delete(`/event-posters/${id}/${type}`).then(res => res.data);
  };

  const { mutate: deleteFile } = useMutation({
    mutationFn: () => deletePoster(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-posters'] });
      toast.success('Posterul a fost șters');
    },
    onError: () => toast.error('A apărut o eroare la ștergerea posterului'),
  });

  const profileImageUrl = pictureUrl
    ? `${BASE_URL}/files/posters/${pictureUrl}`
    : 'https://via.placeholder.com/300x200?text=No+Image';

  const handleFileUpload = ({ file }: { file: File }) => {
    if (fileModalOpen) {
      updateFile({
        file,
        type: fileModalOpen as 'pictureUrl' | 'programDocUrl' | 'rezumatDocUrl',
      });
      setFileModalOpen(null);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="pictureUrl"
        icon={<UploadOutlined />}
        onClick={() => setFileModalOpen('pictureUrl')}>
        {pictureUrl ? 'Modifică Imaginea' : 'Adaugă Imagine'}
      </Menu.Item>
      <Menu.Item
        key="programDocUrl"
        icon={<UploadOutlined />}
        onClick={() => setFileModalOpen('programDocUrl')}>
        {programDocUrl ? 'Modifică Programul' : 'Adaugă Program'}
      </Menu.Item>
      <Menu.Item
        key="rezumatDocUrl"
        icon={<UploadOutlined />}
        onClick={() => setFileModalOpen('rezumatDocUrl')}>
        {rezumatDocUrl ? 'Modifică Rezumatul' : 'Adaugă Rezumat'}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="deletePoster"
        icon={<DeleteOutlined style={{ color: 'red' }} />}
        onClick={() => deleteFile()}>
        Șterge Posterul
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <center>
        <div>
          <img
            src={profileImageUrl}
            alt="Poster"
            className={styles.posterImage}
          />
        </div>
      </center>

      <Space direction="horizontal" size="middle">
        {programDocUrl && (
          <a
            href={`${BASE_URL}/files/posters/${programDocUrl}`}
            target="_blank"
            rel="noopener noreferrer">
            <Button type="primary">Vezi Program</Button>
          </a>
        )}
        {rezumatDocUrl && (
          <a
            href={`${BASE_URL}/files/posters/${rezumatDocUrl}`}
            target="_blank"
            rel="noopener noreferrer">
            <Button type="primary">Vezi Rezumat</Button>
          </a>
        )}
      </Space>

      {isLoggedIn && (
        <>
          <div style={{ marginTop: '15px' }}>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              trigger={['click']}>
              <Button type="default" icon={<MoreOutlined />}>
                Editare
              </Button>
            </Dropdown>
          </div>
        </>
      )}

      <Modal
        title={`Modifică ${
          fileModalOpen === 'pictureUrl' ? 'Imaginea' : 'Documentul'
        }`}
        open={!!fileModalOpen}
        onCancel={() => setFileModalOpen(null)}
        footer={null}>
        <Upload
          beforeUpload={file => {
            handleFileUpload({ file });
            return false;
          }}
          accept={fileModalOpen === 'pictureUrl' ? 'image/*' : '.pdf'}>
          <Button icon={<UploadOutlined />}>
            Selectează{' '}
            {fileModalOpen === 'pictureUrl' ? 'imaginea' : 'documentul'}
          </Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default KPoster;
