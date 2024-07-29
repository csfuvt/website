import React from 'react';
import { Carousel, ConfigProvider } from 'antd';
import styles from './KMovingBanner.module.css';

import image1 from '../../../../public/MovingBanner1.png';
import image2 from '../../../../public/MovingBanner2.png';
import image3 from '../../../../public/MovingBanner3.png';

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
      </Carousel>
    </ConfigProvider>
  );
};

export default KMovingBanner;
