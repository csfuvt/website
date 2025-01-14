import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EditorialCommitteeMember {
  id: number;
  name: string;
  email: string;
  role: string;
  link?: string;
  category: string;
}

const Row: React.FC<{
  'data-row-key': string;
  style?: React.CSSProperties;
}> = props => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

const EditCEditCRedactie: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<EditorialCommitteeMember[]>([]);
  const [editingKey, setEditingKey] = useState<number | ''>('');

  useEffect(() => {
    // Fetch initial data
    axios.get('/committee/EDITORIAL').then(res => setData(res.data));
  }, []);

  const isEditing = (record: EditorialCommitteeMember) =>
    record.id === editingKey;

  const edit = (record: Partial<EditorialCommitteeMember> & { id: number }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as EditorialCommitteeMember;

      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');

        // Update on the server
        await axios.put(`/committee/${id}`, row);
        toast.success('Persoana a fost actualizată cu succes.');
      }
    } catch (errInfo) {
      console.error('Eroare la validare:', errInfo);
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      // Delete from server
      await axios.delete(`/committee/${id}`);

      // Update local state
      setData(data.filter(item => item.id !== id));
      toast.success('Persoana a fost ștearsă cu succes.');
    } catch (error) {
      console.error('Eroare la ștergerea persoanei:', error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const updatedData = arrayMove(
        data,
        data.findIndex(i => i.id.toString() === active.id),
        data.findIndex(i => i.id.toString() === over?.id)
      );
      setData(updatedData);

      try {
        const reorderedIds = updatedData.map(item => item.id);
        await axios.put('/committee/reorder', { reorderedIds });
        toast.success('Ordinea a fost actualizată cu succes.');
      } catch (error) {
        console.error('Eroare la actualizarea ordinii:', error);
        toast.error('Eroare la actualizarea ordinii.');
      }
    }
  };

  const columns = [
    {
      title: 'Nume',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: '25%',
      editable: true,
    },
    {
      title: 'Rol în redacție',
      dataIndex: 'role',
      width: '15%',
      editable: true,
    },
    {
      title: 'Link',
      dataIndex: 'link',
      width: '15%',
      editable: true,
      render: (value: string | null) =>
        value ? (
          <a href={value} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        ) : (
          'Nu există'
        ),
    },
    {
      title: 'Operațiuni',
      dataIndex: 'operation',
      render: (_: any, record: EditorialCommitteeMember) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}>
              Salvează
            </Typography.Link>
            <Popconfirm title="Sigur vrei să anulezi?" onConfirm={cancel}>
              <a>Anulează</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}>
              Editează
            </Typography.Link>
            <Popconfirm
              title="Sigur vrei să ștergi?"
              onConfirm={() => deleteRecord(record.id)}>
              <a>Șterge</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: EditorialCommitteeMember) => ({
        record,
        inputType: col.dataIndex === 'email' ? 'text' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext
        items={data.map(item => item.id.toString())}
        strategy={verticalListSortingStrategy}>
        <Form form={form} component={false}>
          <Table
            rowKey={record => record.id.toString()}
            components={{
              body: {
                row: Row,
                cell: (props: any) => {
                  const {
                    editing,
                    dataIndex,
                    title,
                    inputType,
                    children,
                    ...restProps
                  } = props;
                  const inputNode =
                    inputType === 'number' ? <InputNumber /> : <Input />;
                  return (
                    <td {...restProps}>
                      {editing ? (
                        <Form.Item
                          name={dataIndex}
                          style={{ margin: 0 }}
                          rules={[
                            {
                              required: false,
                              message: `Introduceți ${title}!`,
                            },
                          ]}>
                          {inputNode}
                        </Form.Item>
                      ) : (
                        children
                      )}
                    </td>
                  );
                },
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            scroll={{ y: 510 }}
            rowClassName="editable-row"
            pagination={{ onChange: cancel }}
          />
        </Form>
      </SortableContext>
    </DndContext>
  );
};

export default EditCEditCRedactie;
