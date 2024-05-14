import { createFileRoute } from '@tanstack/react-router';
import styles from './Indexing.module.css';
import { KBanner } from '../../../../-components/KBanner/KBanner';

import fabula from '/Fabula.png';
import erihPlus from '/Erihplus.png';
import indexCopernicus from '/Indexcopernicus.png';
import sciendo from '/Sciendo.png';
import worldCat from '/Worldcat.png';

const IndexingPage = () => {
  return (
    <div>
      <KBanner label="Dialogues Francophones - INDEXARE" />
      <div className={styles.page}>
        <div className={styles.text}>
          <span className={styles.title}>Dialogue Francophones</span> este
          indexată în următoarele baze de date internaționale:
        </div>
        <div className={styles.imgsection}>
          <div className={styles.imgcontainer}>
            <img src={fabula} alt="Fabula" />
            <div>Fabula</div>
          </div>
          <div className={styles.imgcontainer}>
            <img src={erihPlus} alt="ERIH PLUS" />
            <div>ERIH PLUS</div>
          </div>
          <div className={styles.imgcontainer}>
            <img src={indexCopernicus} alt="Index Copernicus" />
            <div>Index Copernicus</div>
          </div>
          <div className={styles.imgcontainer}>
            <img src={sciendo} alt="Sciendo" />
            <div>Sciendo</div>
          </div>
          <div className={styles.imgcontainer}>
            <img src={worldCat} alt="WorldCat" />
            <div>WorldCat</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/indexing/'
)({
  component: IndexingPage,
});

export default IndexingPage;
