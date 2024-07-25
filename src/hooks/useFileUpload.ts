import { useState } from 'react';
import { GetProp, UploadFile, UploadProps } from 'antd';
import { toast } from 'react-toastify';
import { RcFile } from 'antd/es/upload';

export type AntDFileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export enum FileType {
  PDF,
  IMAGE,
}

const fileIsOfType = (file: RcFile, type: FileType) => {
  if (type === FileType.PDF) {
    return file.type === 'application/pdf';
  } else if (type === FileType.IMAGE) {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  }
  return false;
};

const FileDisplayType = {
  [FileType.PDF]: 'PDF',
  [FileType.IMAGE]: 'JPG / PNG',
};

export const useFileUpload = (type: FileType) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadFileProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      if (!fileIsOfType(file, type)) {
        toast.error(`Se pot adăuga doar fișiere ${FileDisplayType[type]}`);
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

  const resetFileList = () => {
    setFileList([]);
  };

  return { fileList, resetFileList, uploadFileProps };
};
