import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KTitle } from '../../../../../-components/KTitle/KTitle.tsx';
import './styles.css';
import axios from 'axios';
import { CommitteeIndex } from './-committee-model.ts';
import { useAuth } from '../../../../../../hooks/useAuth.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Input, Modal, Space, Spin } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import EditCStiintificCEEF from '../../../../../-components/KTabeleCommittees/EditCStiintificCEEF.tsx';
import EditCRedactieCEEF from '../../../../../-components/KTabeleCommittees/EditCRedactieCEEF.tsx';

const getCommittees = () =>
  axios.get<CommitteeIndex[]>('/committee').then(res => res.data);

const ComiteteTest = () => {
  interface CommitteeMember {
    id: number;
    name: string;
    university: string;
    country: string;
    role: string;
    email: string;
    link: string;
    category: string;
  }

  const { isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: committees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['committee'],
    queryFn: getCommittees,
  });

  const scientificCommitteeMembers =
    committees?.filter(member => member.category === 'SCIENTIFIC_CEEF') || [];

  const editorialCommitteeMembers =
    committees?.filter(member => member.category === 'EDITORIAL_CEEF') || [];

  // ========= COMITET ȘTIINȚIFIC =========

  const [isAddComitetStiintificModalOpen, setIsAddComitetStiintificModalOpen] =
    useState(false);

  const showComitetStiintificModal = () => {
    setIsAddComitetStiintificModalOpen(true);
  };

  const handleCancelForAddComitetStiintific = () => {
    setIsAddComitetStiintificModalOpen(false);
    resetComitetStiintificForm();
  };

  const {
    handleSubmit: handleComitetStiintificSubmit,
    reset: resetComitetStiintificForm,
    formState: {
      errors: comitetStiintificErrors,
      isValid: isComitetStiintificValid,
    },
    control: comitetStiintificControl,
  } = useForm<CommitteeMember>({
    defaultValues: {
      name: '',
      category: 'SCIENTIFIC_CEEF',
    },
  });

  const addComitetStiintific = (formData: CommitteeMember) => {
    return axios.post('/committee', { ...formData }).then(res => res.data);
  };

  const {
    mutate: addComitetStiintificMutation,
    isPending: isComitetStiintificPending,
  } = useMutation({
    mutationFn: addComitetStiintific,
    onError: () => toast.error('Nu s-a putut adăuga persoana!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['committee'] });
      setIsAddComitetStiintificModalOpen(false);
      resetComitetStiintificForm();
      toast.success('Persoana a fost adăugată cu succes.');
    },
  });

  const onSubmitCS: SubmitHandler<CommitteeMember> = data => {
    addComitetStiintificMutation({ ...data });
  };

  // ========= COMITET ȘTIINȚIFIC =========

  // ========= COMITET DE REDACȚIE =========

  const [isAddComitetRedactieModalOpen, setIsAddComitetRedactieModalOpen] =
    useState(false);

  const showComitetRedactieModal = () => {
    setIsAddComitetRedactieModalOpen(true);
  };

  const handleCancelForAddComitetRedactie = () => {
    setIsAddComitetRedactieModalOpen(false);
    resetComitetRedactieForm();
  };

  const {
    handleSubmit: handleComitetRedactieSubmit,
    reset: resetComitetRedactieForm,
    formState: {
      errors: comitetRedactieErrors,
      isValid: isComitetRedactieValid,
    },
    control: comitetRedactieControl,
  } = useForm<CommitteeMember>({
    defaultValues: {
      name: '',
      category: 'EDITORIAL_CEEF',
    },
  });

  const addComitetRedactie = (formData: CommitteeMember) => {
    return axios.post('/committee', { ...formData }).then(res => res.data);
  };

  const {
    mutate: addComitetRedactieMutation,
    isPending: isComitetRedactiePending,
  } = useMutation({
    mutationFn: addComitetRedactie,
    onError: () => toast.error('Nu s-a putut adăuga persoana!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['committee'] });
      setIsAddComitetRedactieModalOpen(false);
      resetComitetRedactieForm();
      toast.success('Persoana a fost adăugată cu succes.');
    },
  });

  const onSubmitCR: SubmitHandler<CommitteeMember> = data => {
    addComitetRedactieMutation({ ...data });
  };

  // ========= COMITET DE REDACȚIE =========

  // =============

  const [isEditModalOpenCS, setIsEditModalOpenCS] = useState(false);

  const showEditModalCS = () => {
    setIsEditModalOpenCS(true);
  };

  const handleEditModalCancelCS = async () => {
    setIsEditModalOpenCS(false);
    await queryClient.invalidateQueries({ queryKey: ['committee'] });
  };

  // =============

  const [isEditModalOpenCR, setIsEditModalOpenCR] = useState(false);

  const showEditModalCR = () => {
    setIsEditModalOpenCR(true);
  };

  const handleEditModalCancelCR = async () => {
    setIsEditModalOpenCR(false);
    await queryClient.invalidateQueries({ queryKey: ['committee'] });
  };

  return (
    <>
      <div>
        <KBanner label="COMITETE - CEEF" />

        <Modal
          title="Adaugă persoană - Comitet științific"
          open={isAddComitetStiintificModalOpen}
          onCancel={handleCancelForAddComitetStiintific}
          footer={[
            <Button key="back" onClick={handleCancelForAddComitetStiintific}>
              Renunță
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isComitetStiintificPending}
              disabled={!isComitetStiintificValid}
              onClick={handleComitetStiintificSubmit(onSubmitCS)}>
              Adaugă
            </Button>,
          ]}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              name="name"
              defaultValue=""
              control={comitetStiintificControl}
              rules={{
                required: 'Numele persoanei este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetStiintificErrors.name ? 'error' : ''}
                  placeholder={
                    comitetStiintificErrors.name?.message ?? 'Numele persoanei'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="university"
              defaultValue=""
              control={comitetStiintificControl}
              rules={{
                required: 'Universitatea / Rol este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetStiintificErrors.name ? 'error' : ''}
                  placeholder={
                    comitetStiintificErrors.name?.message ??
                    'Universitatea / Rol'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="country"
              defaultValue=""
              control={comitetStiintificControl}
              rules={{
                required: 'Tara este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetStiintificErrors.name ? 'error' : ''}
                  placeholder={comitetStiintificErrors.name?.message ?? 'Tara'}
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="link"
              defaultValue=""
              control={comitetStiintificControl}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetStiintificErrors.name ? 'error' : ''}
                  placeholder={
                    comitetStiintificErrors.name?.message ?? 'Link (opțional)'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="category"
              defaultValue="SCIENTIFIC_CEEF"
              control={comitetStiintificControl}
              render={({ field }) => <input type="hidden" {...field} />}
            />
          </Space>
        </Modal>

        <Modal
          title="Adaugă persoană - Comitet de organizare"
          open={isAddComitetRedactieModalOpen}
          onCancel={handleCancelForAddComitetRedactie}
          footer={[
            <Button key="back" onClick={handleCancelForAddComitetRedactie}>
              Renunță
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isComitetRedactiePending}
              disabled={!isComitetRedactieValid}
              onClick={handleComitetRedactieSubmit(onSubmitCR)}>
              Adaugă
            </Button>,
          ]}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              name="name"
              defaultValue=""
              control={comitetRedactieControl}
              rules={{
                required: 'Numele persoanei este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetRedactieErrors.name ? 'error' : ''}
                  placeholder={
                    comitetRedactieErrors.name?.message ?? 'Numele persoanei'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="email"
              defaultValue=""
              control={comitetRedactieControl}
              rules={{
                required: 'E-mailul este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetRedactieErrors.name ? 'error' : ''}
                  placeholder={comitetRedactieErrors.name?.message ?? 'E-mail'}
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="role"
              defaultValue=""
              control={comitetRedactieControl}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetRedactieErrors.name ? 'error' : ''}
                  placeholder={
                    comitetRedactieErrors.name?.message ??
                    'Rolul în redacție (opțional)'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="link"
              defaultValue=""
              control={comitetRedactieControl}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={comitetRedactieErrors.name ? 'error' : ''}
                  placeholder={
                    comitetRedactieErrors.name?.message ?? 'Link (opțional)'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
            <Controller
              name="category"
              defaultValue="EDITORIAL_CEEF"
              control={comitetRedactieControl}
              render={({ field }) => <input type="hidden" {...field} />}
            />
          </Space>
        </Modal>

        <Modal
          title="Editează persoanele din Comitetul Științific"
          open={isEditModalOpenCS}
          onCancel={handleEditModalCancelCS}
          footer={null}
          width={1200}>
          <EditCStiintificCEEF />
        </Modal>
        <Modal
          title="Editează persoanele din Comitetul de Organizare"
          open={isEditModalOpenCR}
          onCancel={handleEditModalCancelCR}
          footer={null}
          width={1200}>
          <EditCRedactieCEEF />
        </Modal>
        {isLoading ? (
          <div className="flex">
            <Spin />
          </div>
        ) : isError ? (
          <div className="flex">
            <span>
              Comitetele nu pot fi afișate momentan. Reveniți mai târziu!
            </span>
          </div>
        ) : (
          <div className="committees">
            <div className="committee">
              <KTitle label="Comitet științific" />
              {isLoggedIn && (
                <>
                  <Button
                    type="primary"
                    size="large"
                    onClick={showComitetStiintificModal}>
                    Adaugă persoană
                  </Button>
                  <Button type="default" size="large" onClick={showEditModalCS}>
                    Editează persoane
                  </Button>
                </>
              )}
              <div className="line">
                <ul>
                  <ul>
                    {scientificCommitteeMembers.map(committee => (
                      <li className="lineP" key={committee.id}>
                        {committee.link ? (
                          <a
                            href={committee.link}
                            target="_blank"
                            rel="noopener noreferrer">
                            <u>{committee.name}</u>
                          </a>
                        ) : (
                          committee.name
                        )}
                        , {committee.university}, {committee.country}
                      </li>
                    ))}
                  </ul>
                </ul>
              </div>
            </div>
            <div className="committee">
              <KTitle label="Comitet de organizare" />
              {isLoggedIn && (
                <>
                  <Button
                    type="primary"
                    size="large"
                    onClick={showComitetRedactieModal}>
                    Adaugă persoană
                  </Button>
                  <Button type="default" size="large" onClick={showEditModalCR}>
                    Editează persoane
                  </Button>
                </>
              )}

              {editorialCommitteeMembers.map(committee => (
                <div className="line" key={committee.id}>
                  <div>{committee.role}</div>
                  <ul>
                    <li className="lineP">
                      {committee.link ? (
                        <a
                          href={committee.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          <u>{committee.name}</u>
                        </a>
                      ) : (
                        committee.name
                      )}
                      , e-mail:{' '}
                      <a
                        href={`mailto:${committee.email}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {committee.email}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const Route = createFileRoute(
  '/events/conferences/francophones-studies/current-year/committee/scientific-committee'
)({
  component: ComiteteTest,
});

export default ComiteteTest;
