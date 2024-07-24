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

export interface ArticleForm {
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

  const [isAddArticleModalOpen, setIsAddArticleModalOpen] = useState(false);

  const showArticleModal = () => {
    setIsAddArticleModalOpen(true);
  };

  const handleCancelForAddArticle = () => {
    setIsAddArticleModalOpen(false);
    resetArticleForm();
  };

  const {
    handleSubmit: handleArticleSubmit,
    reset: resetArticleForm,
    formState: { errors: articleErrors, isValid: isArticleValid },
    control: articleControl,
  } = useForm<ArticleForm>({
    defaultValues: {
      title: '',
    },
  });

  const queryClient = useQueryClient();
  const { mutate: addArticleMutation, isPending: isArticlePending } =
    useMutation({
      mutationFn: addArticle,
      onError: () => toast.error('Nu s-a putut adăuga articolul!'),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [`volume/${volumeId}`],
        });
        setIsAddArticleModalOpen(false);
        resetArticleForm();
        toast.success('Articolul a fost adăugat cu succes.');
      },
    });

  const onSubmit: SubmitHandler<ArticleForm> = data => {
    addArticleMutation({ ...data, id: parseInt(volumeId) });
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
          <Modal
            title="Adaugă un articol"
            open={isAddArticleModalOpen}
            onCancel={handleCancelForAddArticle}
            footer={[
              <Button key="back" onClick={handleCancelForAddArticle}>
                Renunță
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isArticlePending}
                disabled={!isArticleValid}
                onClick={handleArticleSubmit(onSubmit)}>
                Salvează
              </Button>,
            ]}>
            <Controller
              name="title"
              defaultValue=""
              control={articleControl}
              rules={{
                required: 'Titlul articolului este un câmp obligatoriu',
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  status={articleErrors.title ? 'error' : ''}
                  placeholder={
                    articleErrors.title?.message ?? 'Titlul articolului'
                  }
                  value={value}
                  onChange={onChange}
                  allowClear
                />
              )}
            />
          </Modal>
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
                <Button type="primary" size="large" onClick={showArticleModal}>
                  Adaugă un articol
                </Button>
              )}
              {volume.articles.map(article => (
                <div className="space-20">
                  <KArticle label={article.title} articleId={article.id} />
                  {article.chapters.map(chapter => (
                    <KChapter
                      chapterId={chapter.id}
                      title={chapter.title}
                      url={BASE_URL + `/files/chapters/${chapter.pdf}`}
                      authors={chapter.authors}
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
