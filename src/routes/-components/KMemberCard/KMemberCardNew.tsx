import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  MoreOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Modal, Input, Upload, Dropdown, Menu, Space } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks/useAuth.ts';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../constants.ts';
import styles from './KMemberCardNew.module.css';
import Tooltip from '../KHoverTip/KHoverTip.tsx';
import { useEffect, useState } from 'react';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

interface MemberForm {
  name: string;
  description: string;
  role: string;
  link: string;
  links: { label: string; pageUrl: string }[];
}

const updateMemberInfo = (id: number, data: any) =>
  axios.post(`/members/${id}`, data).then(res => res.data);

const updateMemberFile = (
  id: number,
  file: File | null,
  type: 'pictureUrl' | 'documentUrl'
) => {
  const formData = new FormData();

  if (file) {
    formData.append(type, file);
  } else {
    return axios.delete(`/members/${id}/${type}`).then(res => res.data);
  }

  return axios
    .post(`/members/${id}/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data);
};

const deleteIndex = (id: number, memberCategory: string) =>
  axios.delete(`/members/${id}/${memberCategory}`).then(res => res.data);

export const KMemberCardNew = ({
  id,
  name,
  description,
  role,
  link,
  documentUrl,
  pictureUrl,
  memberCategory,
  isOpen,
  toggleDescription,
  links = [],
}: {
  id: number;
  name: string;
  description: string;
  role: string;
  link: string;
  documentUrl?: string;
  pictureUrl?: string;
  memberCategory:
    | 'FOUNDER'
    | 'MANAGEMENT'
    | 'BASE_TEAM'
    | 'COLLABORATOR'
    | 'STUDENTS'
    | 'ASSOCIATE_MEMBER';
  isOpen: boolean;
  toggleDescription: () => void;
  links?: { label: string; pageUrl: string }[];
}) => {
  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [fileModalOpen, setFileModalOpen] = useState<
    'pictureUrl' | 'documentUrl' | null
  >(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MemberForm>({
    defaultValues: {
      name,
      description,
      role,
      link,
      links: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'links',
  });

  useEffect(() => {
    if (editModalOpen) {
      const validLinks =
        links?.filter(link => !!link.label || !!link.pageUrl) ?? [];
      replace(validLinks);
    }
  }, [editModalOpen]);

  const { mutate: updateInfo } = useMutation({
    mutationFn: (data: any) => {
      const payload = {
        ...data,
        links: data.links || [],
      };
      return updateMemberInfo(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members', memberCategory] });
      toast.success('Informațiile membrului au fost actualizate');
      setEditModalOpen(false);
    },
    onError: () =>
      toast.error('A apărut o eroare la actualizarea informațiilor'),
  });

  const { mutate: updateFile } = useMutation({
    mutationFn: ({
      file,
      type,
    }: {
      file: File | null;
      type: 'pictureUrl' | 'documentUrl';
    }) => updateMemberFile(id, file, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members', memberCategory] });
      toast.success('Fișierul a fost actualizat');
      setFileModalOpen(null);
    },
    onError: () => toast.error('A apărut o eroare la actualizarea fișierului'),
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: () => deleteIndex(id, memberCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members', memberCategory] });
      toast.success('Membrul a fost șters cu succes');
    },
    onError: () => toast.error('A apărut o eroare în momentul ștergerii'),
  });

  const defaultImage = `/public/profile.png`;
  const profileImageUrl = pictureUrl
    ? `${BASE_URL}/files/members/${pictureUrl}`
    : defaultImage;

  const handleDeleteFile = (type: 'pictureUrl' | 'documentUrl') => {
    updateFile({ file: null, type });
    if (type === 'pictureUrl') {
      setFileModalOpen(null);
    } else if (type === 'documentUrl') {
      setFileModalOpen(null);
    }
  };

  const handleFileUpload = ({ file }: { file: File }) => {
    if (fileModalOpen) {
      updateFile({ file, type: fileModalOpen as 'pictureUrl' | 'documentUrl' });
      setFileModalOpen(null);
    }
  };

  const handleEditOpen = () => {
    const validLinks =
      links?.filter(link => !!link.label || !!link.pageUrl) ?? [];

    setEditModalOpen(true);

    setTimeout(() => {
      reset({
        name,
        description,
        role,
        link,
        links: validLinks,
      });
      replace(validLinks);
    }, 0);
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={handleEditOpen}>
        Modifică Informațiile
      </Menu.Item>
      <Menu.Item
        key="pictureUrl"
        icon={<UploadOutlined />}
        onClick={() => setFileModalOpen('pictureUrl')}>
        {pictureUrl ? 'Modifică / Șterge Imaginea' : 'Adaugă Imagine'}
      </Menu.Item>
      <Menu.Item
        key="documentUrl"
        icon={<UploadOutlined />}
        onClick={() => setFileModalOpen('documentUrl')}>
        {documentUrl ? 'Modifică / Șterge CV-ul' : 'Adaugă CV'}
      </Menu.Item>
      <Menu.Item
        key="delete"
        danger
        icon={<DeleteOutlined />}
        onClick={() => deleteMember()}>
        Șterge Membrul
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.card}>
      {isOpen && (
        <div className={styles.overlay} onClick={toggleDescription}></div>
      )}
      <div className={styles.blueSection} onClick={toggleDescription}>
        <div
          className={styles.profileImage}
          style={{ backgroundImage: `url(${profileImageUrl})` }}></div>
      </div>
      <div className={styles.textSection}>
        <Tooltip description={description}>
          <div className={styles.name}>{name}</div>
        </Tooltip>
        <div className={styles.title}>{role}</div>
      </div>
      {isOpen && (
        <div className={styles.descriptionContainer}>
          <button className={styles.closeButton} onClick={toggleDescription}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <h3 className={styles.descriptionName}>{name}</h3>
          <p>{description}</p>
          <Space direction="horizontal" size="middle" wrap>
            {documentUrl && (
              <a
                href={`${BASE_URL}/files/members/${documentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cvButton}>
                CV
              </a>
            )}
            {/*{link && (*/}
            {/*  <a*/}
            {/*    href={`${link}`}*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*    className={styles.cvButton}>*/}
            {/*    Link*/}
            {/*  </a>*/}
            {/*)}*/}
            {links?.map((l, index) => (
              <a
                key={index}
                href={l.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cvButton}>
                {l.label}
              </a>
            ))}
          </Space>
        </div>
      )}
      {isLoggedIn && (
        <div className={styles.actions}>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            arrow
            trigger={['click']}>
            <Button type="primary" icon={<MoreOutlined />} shape="circle" />
          </Dropdown>
        </div>
      )}

      <Modal
        title="Editare Informații"
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          reset({ name, description, role, link, links });
        }}
        footer={[
          <Button key="cancel" onClick={() => setEditModalOpen(false)}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(data => updateInfo(data))}>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Numele este obligatoriu' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nume"
                status={errors.name ? 'error' : ''}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Descriere"
                status={errors.description ? 'error' : ''}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Rol"
                status={errors.role ? 'error' : ''}
              />
            )}
          />
          {/*<Controller*/}
          {/*    name="link"*/}
          {/*    control={control}*/}
          {/*    render={({ field }) => (*/}
          {/*        <Input {...field} placeholder="Link" status={errors.link ? 'error' : ''} />*/}
          {/*    )}*/}
          {/*/>*/}

          {fields.map((field, index) => (
            <Space key={field.id} style={{ display: 'flex' }} align="baseline">
              <Controller
                name={`links.${index}.label` as const}
                control={control}
                rules={{ required: 'Denumirea este obligatorie' }}
                render={({ field }) => (
                  <Input {...field} placeholder="Denumire link" />
                )}
              />
              <Controller
                name={`links.${index}.pageUrl` as const}
                control={control}
                rules={{ required: 'Link-ul este obligatoriu' }}
                render={({ field }) => <Input {...field} placeholder="URL" />}
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
        </Space>
      </Modal>

      <Modal
        title={`Modifică ${fileModalOpen === 'pictureUrl' ? 'Imaginea' : 'CV-ul'}`}
        visible={!!fileModalOpen}
        onCancel={() => setFileModalOpen(null)}
        footer={null}>
        {fileModalOpen === 'pictureUrl' && pictureUrl && (
          <>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteFile('pictureUrl')}
              style={{ marginBottom: '10px' }}>
              Șterge Imaginea
            </Button>
            <br />
          </>
        )}
        {fileModalOpen === 'documentUrl' && documentUrl && (
          <>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteFile('documentUrl')}
              style={{ marginBottom: '10px' }}>
              Șterge CV-ul
            </Button>
            <br />
          </>
        )}
        <Upload
          beforeUpload={file => {
            handleFileUpload({ file });
            return false;
          }}
          accept={
            fileModalOpen === 'pictureUrl' ? 'image/*' : '.pdf,.doc,.docx'
          }>
          <Button icon={<UploadOutlined />}>
            Selectează {fileModalOpen === 'pictureUrl' ? 'imaginea' : 'CV-ul'}
          </Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default KMemberCardNew;
