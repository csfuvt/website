import React, { useState, useEffect } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Image } from 'antd';
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
import { BASE_URL } from '../../../constants.ts';

interface BannerImageJos {
  id: number;
  imageUrl: string;
  order: number;
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

const EditKMovingBannerJos: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<BannerImageJos[]>([]);
  const [editingKey, setEditingKey] = useState<number | ''>('');

  useEffect(() => {
    axios.get(BASE_URL + '/bannerjos').then(res => setData(res.data));
  }, []);

  const isEditing = (record: BannerImageJos) => record.id === editingKey;

  // const edit = (record: Partial<BannerImageJos> & { id: number }) => {
  //     form.setFieldsValue({ ...record });
  //     setEditingKey(record.id);
  // };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as BannerImageJos;

      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');

        await axios.put(`${BASE_URL}/bannerjos/${id}`, row);
        toast.success('Imaginea a fost actualizată cu succes.');
      }
    } catch (errInfo) {
      console.error('Eroare la validare:', errInfo);
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/bannerjos/${id}`);
      setData(data.filter(item => item.id !== id));
      toast.success('Imaginea a fost ștearsă cu succes.');
    } catch (error) {
      console.error('Eroare la ștergere:', error);
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
        const reorderedImages = updatedData.map((item, index) => ({
          id: item.id,
          order: index,
        }));

        setData(updatedData.map((item, index) => ({ ...item, order: index })));

        await axios.post(`${BASE_URL}/bannerjos/reorder`, {
          images: reorderedImages,
        });
        toast.success('Ordinea imaginilor a fost actualizată.');
      } catch (error) {
        console.error('Eroare la actualizarea ordinii:', error);
        toast.error('Eroare la actualizarea ordinii.');
      }
    }
  };

  const columns = [
    {
      title: 'Previzualizare',
      dataIndex: 'imageUrl',
      width: '70%',
      render: (url: string) => (
        <>
          <center>
            <Image src={`${BASE_URL}${url}`} alt="banner" width={70} />
          </center>
        </>
      ),
    },
    // {
    //     title: 'Ordine',
    //     dataIndex: 'order',
    //     editable: true,
    // },
    {
      title: 'Operațiuni',
      dataIndex: 'operation',
      render: (_: any, record: BannerImageJos) => {
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
            {/*<Typography.Link*/}
            {/*    disabled={editingKey !== ''}*/}
            {/*    onClick={() => edit(record)}*/}
            {/*    style={{ marginRight: 8 }}>*/}
            {/*    Editează*/}
            {/*</Typography.Link>*/}
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
    // if (!col.editable) {
    //     return col;
    // }
    return {
      ...col,
      onCell: (record: BannerImageJos) => ({
        record,
        inputType: 'number',
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
                    inputType === 'number' ? <Input /> : <Input />;
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
            scroll={{ y: 400 }}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
      </SortableContext>
    </DndContext>
  );
};

export default EditKMovingBannerJos;
