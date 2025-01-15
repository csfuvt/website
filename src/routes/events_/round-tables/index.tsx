import { KBanner } from '../../-components/KBanner/KBanner';
import styles from './RoundTablesPage.module.css';
import axios from 'axios';
import { EventRoundTable } from './-round-tables.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import { createFileRoute } from '@tanstack/react-router';
import { KAddButton } from '../../-components/KAddButton/KAddButton.tsx';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth.ts';
import { toast } from 'react-toastify';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import KRoundTablesCard from '../../-components/KRoundTablesCard/KRoundTablesCard.tsx';

export interface RoundTableForm {
  title: string;
  organizers: string;
  meetingDate: string;
  members: string;
  links: string;
}

const addRoundTable = ({
  title,
  organizers,
  meetingDate,
  members,
  links,
}: RoundTableForm) => {
  return axios
    .post<EventRoundTable>(`/round-tables`, {
      title,
      organizers,
      meetingDate,
      members,
      links,
    })
    .then(res => res.data);
};

const getRoundTables = () =>
  axios.get<EventRoundTable[]>('/round-tables').then(res => res.data.reverse());

const RoundTablesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const {
    data: roundTables,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['roundTables'],
    queryFn: getRoundTables,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<RoundTableForm>({
    defaultValues: {
      title: '',
      organizers: '',
      meetingDate: '',
      members: '',
      links: '',
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    reset();
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addRoundTable,
    onError: () => toast.error('Nu s-a putut adăuga masa rotundă!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roundTables'] });
      setIsModalOpen(false);
      resetForm();
      toast.success('Masa rotundă a fost adăugată cu succes.');
    },
  });

  const onSubmit: SubmitHandler<RoundTableForm> = data => {
    mutate(data);
  };

  const handleCacheInvalidation = () => {
    queryClient.invalidateQueries({ queryKey: ['roundTables'] });
  };

  return (
    <div className={styles.page}>
      <KBanner label="MESE ROTUNDE" />
      <div className={styles.section}>
        <div className={styles.cardsContainer}>
          {isLoggedIn && (
            <KAddButton className={'position'} onClick={showModal} />
          )}
          <Modal
            title="Creează o masă rotundă"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isPending}
                disabled={!isValid}
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
                control={control}
                rules={{
                  required: 'Titlul este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.title ? 'error' : ''}
                    placeholder={
                      errors.title?.message ?? 'Titlul mesei rotunde'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="organizers"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.organizers ? 'error' : ''}
                    placeholder={
                      errors.organizers?.message ?? 'Organizatori (opțional)'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="meetingDate"
                control={control}
                rules={{
                  required: 'Data întâlnirii este un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="date"
                    status={errors.meetingDate ? 'error' : ''}
                    placeholder={
                      errors.meetingDate?.message ?? 'Data întâlnirii'
                    }
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="members"
                control={control}
                rules={{
                  required: 'Participanții sunt un câmp obligatoriu',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.members ? 'error' : ''}
                    placeholder={errors.members?.message ?? 'Participanți'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
              <Controller
                name="links"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    status={errors.links ? 'error' : ''}
                    placeholder={errors.links?.message ?? 'Linkuri (opțional)'}
                    value={value}
                    onChange={onChange}
                    allowClear
                  />
                )}
              />
            </Space>
          </Modal>
          <div className="flex">
            {isLoading ? (
              <Spin />
            ) : isError ? (
              <span>
                Mesele rotunde nu pot fi afișate momentan. Reveniți mai târziu!
              </span>
            ) : isEmpty(roundTables) ? (
              <div className="flex">
                <span>Nu există mese rotunde momentan.</span>
              </div>
            ) : (
              roundTables?.map(eventRoundTable => {
                const meetingDate = new Date(eventRoundTable.meetingDate);
                return (
                  <KRoundTablesCard
                    key={eventRoundTable.id}
                    id={eventRoundTable.id}
                    title={eventRoundTable.title}
                    organizers={eventRoundTable.organizers}
                    meetingDate={meetingDate.toISOString()}
                    members={eventRoundTable.members}
                    links={eventRoundTable.links}
                    invalidateCache={handleCacheInvalidation}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/events/round-tables/')({
  component: RoundTablesPage,
});

export default RoundTablesPage;
