import { Button, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TextEditor from '../KTextEditor/KTextEditor.tsx';

type EditPageButtonProps = {
  label?: string;
  modalTitle: string;
  value: string;
  onSave: (content: string) => Promise<unknown>;
  isSaving?: boolean;
};

export const EditPageButton = ({
  label = 'Editează pagina',
  modalTitle,
  value,
  onSave,
  isSaving = false,
}: EditPageButtonProps) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleOpen = () => {
    setDraft(value);
    setOpen(true);
  };

  const handleSave = async () => {
    await onSave(draft);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={handleOpen}
        style={{ marginBottom: 16 }}>
        {label}
      </Button>
      <Modal
        title={modalTitle}
        open={open}
        onCancel={() => setOpen(false)}
        width={900}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Renunță
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSaving}
            onClick={handleSave}>
            Salvează
          </Button>,
        ]}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <TextEditor
            value={draft}
            onChange={setDraft}
            placeholder="Conținut"
          />
        </Space>
      </Modal>
    </>
  );
};
