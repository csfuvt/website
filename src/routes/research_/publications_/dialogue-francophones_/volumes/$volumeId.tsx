import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { Volume } from './-volumes.model.ts';
import { useQuery } from '@tanstack/react-query';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { Spin } from 'antd';
import { isEmpty } from 'lodash-es';
import { KChapter } from '../../../../-components/KChapter/KChapter.tsx';
import { KSubtitle } from '../../../../-components/KSubtitle/KSubtitle.tsx';
import './styles.css';

const getVolumeById = (id: string) =>
  axios.get<Volume>(`/volumes/${id}`).then(res => res.data);

const VolumePage = () => {
  const { volumeId } = Route.useParams();
  const {
    data: volume,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [volumeId],
    queryFn: () => getVolumeById(volumeId),
  });
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
        <span>Nu există volumul.</span>
      ) : (
        <div>
          <KBanner label={`Dialogues Francophones - NO ${volume.title}`} />
          <div className="volumeContainer">
            <div className="left">
              <img
                src={volume.cover}
                className="cover"
                width={200}
                height={290}
                alt="cover"
              />
              <div className="volumeUrl">
                <span className="label">Volum</span>
                <a href={volume.pdf}>{volume.title}</a>
              </div>
            </div>
            <div className="right">
              {volume.articles.map(article => (
                <div className="space-20">
                  <KSubtitle label={article.title} />
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
