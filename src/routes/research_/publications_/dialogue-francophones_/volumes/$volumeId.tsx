import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner.tsx';
import { volumes } from '../../../../-constants/mock.data.ts';
import './styles.css';
import { KSubtitle } from '../../../../-components/KSubtitle/KSubtitle.tsx';
import { KChapter } from '../../../../-components/KChapter/KChapter.tsx';
export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/volumes/$volumeId'
)({
  component: Volume,
});

function Volume() {
  const { volumeId } = Route.useParams();
  return (
    <div>
      <KBanner
        label={`Dialogues Francophones - NO ${volumes.find(volume => volume.id === parseInt(volumeId))!.issueNumber}`}
      />
      <div className="volumeContainer">
        <div className="left">
          <img
            src={
              volumes.find(volume => volume.id === parseInt(volumeId))!.coverUrl
            }
            className="cover"
            width={200}
            height={290}
            alt="cover"
          />
          <div className="volumeUrl">
            <span className="label">Volum</span>
            <a
              href={
                volumes.find(volume => volume.id === parseInt(volumeId))!
                  .volumeUrl
              }>
              {
                volumes.find(volume => volume.id === parseInt(volumeId))!
                  .issueNumber
              }
            </a>
          </div>
        </div>
        <div className="right">
          {volumes
            .find(volume => volume.id === parseInt(volumeId))!
            .articles.map(article => (
              <div className="space-20">
                <KSubtitle label={article.title} />
                {article.chapters.map(chapter => (
                  <KChapter
                    title={chapter.title}
                    url={chapter.url}
                    description={chapter.description}
                    pages={chapter.pages}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
