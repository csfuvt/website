import React from 'react';
import { Carousel, ConfigProvider } from 'antd';
import styles from './KMovingBanner.module.css';

import image1 from '../../../../public/MovingBanner1.png';
import image2 from '../../../../public/MovingBanner2.png';
import image3 from '../../../../public/MovingBanner3.png';
import image4 from '../../../../public/MovingBanner4.png';
import image5 from '../../../../public/MovingBanner5.png';
import image6 from '../../../../public/MovingBanner6.png';
import image7 from '../../../../public/MovingBanner7.png';

export const KMovingBanner: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 30
          }
        }
      }}
    >
    <Carousel autoplay arrows infinite={true}>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image1})` }} />
        </div>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image2})` }} />
        </div>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image3})` }} />
        </div>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image4})` }} />
        </div>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image5})` }} />
        </div>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image6})` }} />
        </div>
        <div>
          <div
            className={styles.carouselItem}
            style={{ backgroundImage: `url(${image7})` }} />
        </div>
      </Carousel>
    </ConfigProvider>
  );
};

export default KMovingBanner;
