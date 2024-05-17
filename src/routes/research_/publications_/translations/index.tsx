import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../-components/KBanner/KBanner';
import { KTranslationCard } from '../../../-components/KTranslationCard/KTranslationCard';
import styles from './TranslationPage.module.css';

const TranslationPage = () => {
  const items = [
    {
      details: 'Corneliu Mircea, Traité de lEsprit, ',

      //  link: '/details/1',
      bookImage: '../../../../../public/TraduceriPics/corneliu_mircea.png',
    },

    {
      details:
        'Vlad Gaivoronschi, Rudolf Gräf, Otilia Hedeşan (éds.), Projet 5060. Université de l Ouest de Timişoara, traduit du roumain par Andreea Gheorghiu et Adriana Maria Cândea. Timişoara, Editura Universităţii de Vest, 2014,103 p. ISSN 978-973-125-411-1.',
      // link: '/details/2',
      bookImage: '../../../../../public/TraduceriPics/5060.png',
    },

    {
      details:
        'Ewa Bogalska Martin, Între memorie şi uitare. Destinul comun al eroilor şi al victimelor, traducere, prefaţă şi note de Adia Chermeleu şi Mariana Pitar. Editura Universităţii de Vest, Timişoara, 2014, 350 p. ISBN : 978-973-125-422-7.',
      //link: '/details/3',
      bookImage: '../../../../../public/TraduceriPics/intre-memorie-uitare.png',
    },

    {
      details:
        'Coleta De Sabata. La Culture technique du Banat. Traducere coordonată de Georgiana I. Badea (Lungu-Badea), traducători: Erwin Kretz, Ileana Neli Eiben, Bianca Stoenescu, Lucia Udrescu. Timișoara, Editura Excelsior Art, 2014, 336 p. ISBN 973-592-320-3, 978-973-592-320-4.',
      //link: '/details/4',
      bookImage: '../../../../../public/TraduceriPics/sabata.png',
    },

    {
      details:
        'Traducere în limba română: Alina Bîrdeanu (p.253-281), Mircea Moşneanu (p.38-54), Roxana R. Bucur (p.84-110), Alina Pelea (p.186-196, 281-321), Andreea Natalia Ciolacu (p.54-73), Anne Poda (p.66-73, 166-173, 175-186, 343-346), Adina Hornoiu (p.75-84, 322-341), Diana Rotaru (p.132-154), Ioana Giurginca (p.196-253), Simona Tomescu (p.110-132), Florina Măneţoiu (p.19-54), Nicoleta Zbăgan (p.154-173).',
      //link: '/details/5',
      bookImage: '../../../../../public/TraduceriPics/numeleproprii.png',
    },

    {
      details:
        'Traducere în limba română: Viviana Cotuţ, Ecaterina Cucu, Ruxandra Filip, Diana Gabor, Cristina Georgescu, Andreea M. Gheorghiu, Ioana M. Giurginca, Minodora Giurgiu, Georgiana Lungu-Badea, Raluca Mădăras, Ariana-Maria Mihuţ, Adina Popa, Andrea Sisak, Alexandra Sofronescu, Adriana Tamba, Diana Voinescu.',
      //link: '/details/6',
      bookImage: '../../../../../public/TraduceriPics/traducatoriinistorie.png',
    },

    {
      details:
        'Details 6Adriana Babeţi, Cécile Kovacshazy (éds.), Le Banat : un Eldorado aux confins, traduction collective plurilingue. Cultures d Europe Centrale, Hors série No 4, Centre Interdisciplinaire de Recherches Centre-Européennes, Université de Paris-Sorbonne (Paris IV), 2007, 372 p. ISBN 978-2-917374-00-9.',
      //link: '/details/7',
      bookImage: '../../../../../public/TraduceriPics/lebanat.png',
    },

    {
      details:
        'Radu Ciobotea, Une guerre sans vainqueur. Yougoslavie 1991-1999, traduit du roumain par Andrea Gheorghiu et Mirela Pârău. Paris, Editions Paris-Méditerranée, 2003, 234 p. ISBN 2-84272-172-1.',
      //link: '/details/8',
      bookImage: '../../../../../public/TraduceriPics/uneguerresans.png',
    },
  ];

  return (
    <div className={styles.container}>
      <KBanner label="TRADUCERI" />
      <div className={styles.grid}>
        {items.map((item, index) => (
          <KTranslationCard
            key={index}
            summaryText={item.details}
            // link={item.link}
            translationImage={item.bookImage}
          />
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/research/publications/translations/')({
  component: TranslationPage,
});

export default TranslationPage;
