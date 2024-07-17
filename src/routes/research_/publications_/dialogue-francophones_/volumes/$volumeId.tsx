import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { Article, Volume } from './-volumes.model.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { Button, Input, Modal, Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import { KChapter } from '../../../../-components/KChapter/KChapter.tsx';
import { KArticle } from '../../../../-components/KArticle/KArticle.tsx';
import './styles.css';
import { useAuth } from '../../../../../hooks/useAuth.ts';
import { BASE_URL } from '../../../../../constants.ts';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const getVolumeById = (id: string) =>
  axios.get<Volume>(`/volumes/${id}`).then(res => res.data);

interface ArticleForm {
  title: string;
}

const addArticle = ({ title, id }: ArticleForm & { id: number }) => {
  return axios
    .post<Article>(`/volumes/${id}/article`, { title })
    .then(res => res.data);
};

const VolumePage = () => {
  const { isLoggedIn } = useAuth();

  const { volumeId } = Route.useParams();

  const {
    data: volume,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`volume/${volumeId}`],
    queryFn: () => getVolumeById(volumeId),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addArticle,
    onError: () => toast.error('Nu s-a putut adăuga articolul!'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [`volume/${volumeId}`] });
      setIsModalOpen(false);
      toast.success('Articolul a fost adăugat cu succes.');
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

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<ArticleForm>({
    defaultValues: {
      title: '',
    },
  });
  const onSubmit: SubmitHandler<ArticleForm> = data => {
    mutate({ ...data, id: parseInt(volumeId) });
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex">
          <Spin />
        </div>
      ) : isError ? (
        <div className="flex">
          <span>Volumul nu poate fi afișat momentan. Reveniți mai târziu!</span>
        </div>
      ) : isEmpty(volume) ? (
        <div className="flex">
          <span>Nu există volumul.</span>
        </div>
      ) : (
        <div>
          <KBanner label={`Dialogues Francophones - NO ${volume.title}`} />
          {isModalOpen && (
            <form>
              <Modal
                title="Adaugă un articol"
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
                    disabled={!isValid}
                    onClick={handleSubmit(onSubmit)}>
                    Salvează
                  </Button>,
                ]}>
                <Controller
                  name="title"
                  defaultValue=""
                  control={control}
                  rules={{
                    required: 'Titlul articolului este un câmp obligatoriu',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      status={errors.title ? 'error' : ''}
                      placeholder={
                        errors.title?.message ?? 'Titlul articolului'
                      }
                      value={value}
                      onChange={onChange}
                      allowClear
                    />
                  )}
                />
              </Modal>
            </form>
          )}
          <div className="volumeContainer">
            <div className="left">
              <img
                src={BASE_URL + `/files/volumes/${volume.cover}`}
                className="cover"
                width={200}
                height={290}
                alt="cover"
              />
              <div className="volumeUrl">
                <span className="label">Volum</span>
                <a
                  href={BASE_URL + `/files/volumes/${volume.pdf}`}
                  className="url">
                  {volume.title}
                </a>
              </div>
            </div>
            <div className="right">
              {isLoggedIn && (
                <Button type="primary" size="large" onClick={showModal}>
                  Adaugă un articol
                </Button>
              )}
              {volume.articles.map(article => (
                <div className="space-20">
                  <KArticle label={article.title} />
                  {article.chapters.map(chapter => (
                    <KChapter
                      title={chapter.title}
                      url={chapter.pdf}
                      description={chapter.description}
                      pageStart={chapter.pageStart}
                      pageEnd={chapter.pageEnd}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/volumes/$volumeId'
)({
  component: VolumePage,
});
