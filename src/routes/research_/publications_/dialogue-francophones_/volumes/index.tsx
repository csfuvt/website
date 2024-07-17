import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KVolumeCard } from '../../../../-components/KVolumeCard/KVolumeCard';
import styles from './VolumePage.module.css';
import axios from 'axios';
import { Volume } from './-volumes.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  GetProp,
  Input,
  Modal,
  Space,
  Spin,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';
import { KAddButton } from '../../../../-components/KAddButton/KAddButton.tsx';
import { useState } from 'react';
import { useAuth } from '../../../../../hooks/useAuth.ts';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../../../constants.ts';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface VolumeForm {
  title: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const addVolume = ({
  title,
  cover,
  pdf,
}: VolumeForm & { cover: UploadFile; pdf: UploadFile }) => {
  const formData = new FormData();
  formData.append('cover', cover as FileType);
  formData.append('pdf', pdf as FileType);
  formData.append('title', title);
  return axios
    .post<Volume>(`/volumes`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data);
};

const getVolumes = () =>
  axios
    .get<Volume[]>('/volumes/type/DIALOGUES_FRANCOPHONE')
    .then(res => res.data.reverse());

const VolumesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addVolume,
    onError: () => toast.error('Nu s-a putut adăuga volumul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['volumes'] });
      setIsModalOpen(false);
      toast.success('Volumul a fost adăugat cu succes.');
    },
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { isLoggedIn } = useAuth();

  const {
    data: volumes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['volumes'],
    queryFn: getVolumes,
  });

  const [coverList, setCoverList] = useState<UploadFile[]>([]);

  const uploadCoverProps: UploadProps = {
    onRemove: file => {
      const index = coverList.indexOf(file);
      const newFileList = coverList.slice();
      newFileList.splice(index, 1);
      setCoverList(newFileList);
    },
    beforeUpload: file => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        toast.error('Se pot adăuga doar fișiere JPG / PNG!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 2MB');
        return false;
      }
      setCoverList([file]);
      return false;
    },
    fileList: coverList,
  };

  const [pdfList, setPdfList] = useState<UploadFile[]>([]);

  const uploadPdfProps: UploadProps = {
    onRemove: file => {
      const index = pdfList.indexOf(file);
      const newFileList = pdfList.slice();
      newFileList.splice(index, 1);
      setPdfList(newFileList);
    },
    beforeUpload: file => {
      const isPdf = file.type === 'application/pdf';
      if (!isPdf) {
        toast.error('Se pot adăuga doar fișiere PDF!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 2MB');
        return false;
      }
      setPdfList([file]);
      return false;
    },
    fileList: pdfList,
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<VolumeForm>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<VolumeForm> = data => {
    mutate({ ...data, cover: coverList[0], pdf: pdfList[0] });
  };

  return (
    <div>
      <KBanner label="Dialogues Francophones - VOLUME" />
      <div className={styles.cardsContainer}>
        {isLoggedIn && (
          <KAddButton className={'position'} onClick={showModal} />
        )}
        {isModalOpen && (
          <form>
            <Modal
              title="Creează un volum"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Renunță
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={isPending}
                  disabled={isEmpty(coverList) || isEmpty(pdfList) || !isValid}
                  onClick={handleSubmit(onSubmit)}>
                  Salvează
                </Button>,
              ]}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}>
                <Controller
                  name="title"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Nr. și anul volumului este un câmp obligatoriu',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      status={errors.title ? 'error' : ''}
                      placeholder={
                        errors.title?.message ?? 'Număr volum / Anul volumului'
                      }
                      value={value}
                      onChange={onChange}
                      allowClear
                    />
                  )}
                />
                <Upload {...uploadCoverProps}>
                  <Button icon={<UploadOutlined />}>Selectează coperta</Button>
                </Upload>
                <Upload {...uploadPdfProps}>
                  <Button icon={<UploadOutlined />}>Selectează pdf</Button>
                </Upload>
              </Space>
            </Modal>
          </form>
        )}
        <div className="flex">
          {isLoading ? (
            <Spin />
          ) : isError ? (
            <span>
              Volumele nu pot fi afișate momentan. Reveniți mai târziu!
            </span>
          ) : isEmpty(volumes) ? (
            <div className="flex">
              <span>Nu există volume momentan.</span>
            </div>
          ) : (
            volumes?.map((volume, index) => (
              <KVolumeCard
                key={index}
                title={volume.title}
                buttonText="Deschide >"
                url={`/research/publications/dialogue-francophones/volumes/${volume.id}`}
                volumeImageUrl={BASE_URL + `/files/volumes/${volume.cover}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/volumes/'
)({
  component: VolumesPage,
});

export default VolumesPage;
