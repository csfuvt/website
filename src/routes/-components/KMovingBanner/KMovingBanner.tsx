import styles from './KMovingBanner.module.css';
import Slider from 'react-slick';
import image1 from 'C:\\Users\\Alesia\\Desktop\\website\\website\\public\\1.png';
import image2 from '../../../../public/2.png';
import image3 from '../../../../public/3.png';

const images = [image1, image2, image3];

const KMovingBanner = ({ label }: { label: string }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.gradientSection}>
      <h2>{label}</h2>
      <div className={styles.overlay}></div>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default KMovingBanner;
