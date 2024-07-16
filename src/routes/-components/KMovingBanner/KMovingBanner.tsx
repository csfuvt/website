import React from 'react';
import { Carousel } from 'antd';
import styles from './KMovingBanner.module.css';

import image1 from '../../../../public/MovingBanner1.png';
import image2 from '../../../../public/MovingBanner2.png';
import image3 from '../../../../public/MovingBanner3.png';

export const KMovingBanner: React.FC = () => {
  return (
    <Carousel autoplay>
      <div>
        <div
          className={styles.carouselItem}
          style={{ backgroundImage: `url(${image1})` }}
        />
      </div>
      <div>
        <div
          className={styles.carouselItem}
          style={{ backgroundImage: `url(${image2})` }}
        />
      </div>
      <div>
        <div
          className={styles.carouselItem}
          style={{ backgroundImage: `url(${image3})` }}
        />
      </div>
    </Carousel>
  );
};

export default KMovingBanner;
