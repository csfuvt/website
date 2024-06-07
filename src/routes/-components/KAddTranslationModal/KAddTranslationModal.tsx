import './styles.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { KTitle } from '../KTitle/KTitle.tsx';

import { Button, GetProp, Input, Upload, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Translation } from '../../research_/publications_/translations/-translation.model.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';

interface TranslationForm {
  description: string;
  link?: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const addTranslation = ({
  description,
  link,
  file,
}: TranslationForm & { file: UploadFile }) => {
  const formData = new FormData();
  formData.append('cover', file as FileType);
  formData.append('description', description);
  if (link) {
    formData.append('link', link);
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
  const { mutate, isPending } = useMutation({
    mutationFn: addTranslation,
    onError: () => toast.error('Nu s-a putut adăuga traducerea!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['translations'] });
      setIsOpen(false);
      toast.success('Traducerea a fost adăugată cu succes.');
    },
  });

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
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        toast.error('Se pot adăuga doar fișiere până în 2MB');
        return false;
      }
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<TranslationForm>({
    defaultValues: {
      description: '',
      link: '',
    },
  });

  const onSubmit: SubmitHandler<TranslationForm> = data => {
    mutate({ ...data, file: fileList[0] });
  };

  return (
    <div>
      <div className="modal">
        <KTitle label="Adauga o noua traducere" />
        <form>
          <div className="vertical">
            <div className="inputs">
              <Controller
                name="description"
                defaultValue=""
                control={control}
                rules={{
                  required: 'Descrierea este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <TextArea
                    status={errors.description ? 'error' : ''}
                    value={value}
                    onChange={onChange}
                    placeholder={errors.description?.message ?? 'Descriere'}
                    autoSize={{ minRows: 6, maxRows: 8 }}
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
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
              <div className="horizontal">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  onClick={handleSubmit(onSubmit)}
                  loading={isPending}
                  disabled={isEmpty(fileList) || !isValid}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
