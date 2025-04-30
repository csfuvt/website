import { useState } from 'react';
import { GetProp, UploadFile, UploadProps } from 'antd';
import { toast } from 'react-toastify';
import { RcFile } from 'antd/es/upload';

export type AntDFileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export enum FileType {
  PDF,
  IMAGE,
}

const fileIsOfType = (file: RcFile, types: FileType[]) => {
  return types.some(type => {
    if (type === FileType.PDF) {
      return file.type === 'application/pdf';
    } else if (type === FileType.IMAGE) {
      return file.type === 'image/jpeg' || file.type === 'image/png';
    }
    return false;
  });
};

const FileDisplayType = {
  [FileType.PDF]: 'PDF',
  [FileType.IMAGE]: 'JPG / PNG',
};

export const useFileUpload = (types: FileType | FileType[]) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const normalizedTypes = Array.isArray(types) ? types : [types];

  const uploadFileProps: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      if (!fileIsOfType(file, normalizedTypes)) {
        const allowedTypes = normalizedTypes
          .map(type => FileDisplayType[type])
          .join(', ');
        toast.error(`Se pot adăuga doar fișiere ${allowedTypes}`);
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

  const resetFileList = () => {
    setFileList([]);
  };

  return { fileList, resetFileList, uploadFileProps };
};
