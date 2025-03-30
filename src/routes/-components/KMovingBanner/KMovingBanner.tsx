import React, { useEffect, useState } from 'react';
import { Carousel, ConfigProvider, Spin, Alert } from 'antd';
import styles from './KMovingBanner.module.css';
import axios from 'axios';
import { BASE_URL } from '../../../constants.ts';

interface BannerImage {
  id: number;
  imageUrl: string;
  order: number;
}

export const KMovingBanner: React.FC = () => {
  const [images, setImages] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBannerImages = async (attempts = 3) => {
    try {
      const response = await axios.get<BannerImage[]>(`${BASE_URL}/banner`);
      const sorted = response.data.sort((a, b) => a.order - b.order);
      setImages(sorted);
      setError(null);
    } catch (err) {
      if (attempts > 1) {
        setTimeout(() => fetchBannerImages(attempts - 1), 1000); // încearcă din nou după 1s
      } else {
        console.error('Eroare la încărcarea imaginilor:', err);
        setError('Nu s-au putut încărca imaginile din banner.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerImages();
  }, []);

  if (loading) return <Spin />;

  if (error) {
    return (
      <Alert
        message="Eroare"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px auto', maxWidth: '600px' }}
      />
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            arrowSize: 30,
          },
        },
      }}>
      <Carousel autoplay arrows infinite>
        {images.map((image, index) => (
          <div key={image.id ?? index}>
            <div
              className={styles.carouselItem}
              style={{
                backgroundImage: `url(${BASE_URL}${image.imageUrl})`,
              }}
            />
          </div>
        ))}
      </Carousel>
    </ConfigProvider>
  );
};

export default KMovingBanner;
