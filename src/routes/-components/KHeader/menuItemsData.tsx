import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faBookOpen,
  faInfo,
  faBullseye,
  faUserGroup,
  faComments,
  faAddressBook,
  faGraduationCap,
  faEllipsis,
  faNewspaper,
  faDiagramProject,
} from '@fortawesome/free-solid-svg-icons';

type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconProp;
};

export const menuItemsData: MenuItem[] = [
  {
    title: 'Acasa',
    url: '/',
    icon: faHome,
  },
  {
    title: 'Despre noi',
    submenu: [
      {
        title: 'Istoric',
        url: '/about/history',
        icon: faBookOpen,
      },
      {
        title: 'Descriere și obiective',
        url: '/about/description-and-objectives',
        icon: faBullseye,
      },
      {
        title: 'Membri',
        url: '/about/members',
        icon: faUserGroup,
      },
    ],
  },
  {
    title: 'Evenimente',
    submenu: [
      {
        title: 'Colocvii',
        submenu: [
          {
            title: 'CIEFT',
            submenu: [
              {
                title: 'CIEFT 2024',
                submenu: [
                  {
                    title: 'Apel la comunicări',
                    url: '/events/conferences/cieft/current-year/calls',
                  },
                  {
                    title: 'Fișa de înscriere',
                    url: '/events/conferences/cieft/current-year/registration',
                  },
                  {
                    title: 'Organizatori și parteneri',
                    url: '/events/conferences/cieft/current-year/organizers-and-partners',
                  },
                  {
                    title: 'Comitet științific',
                    url: '/events/conferences/cieft/current-year/scientific-committee',
                  },
                  {
                    title: 'Informații utile',
                    url: '/evenimente/colocvii/cieft-2024/informatii-utile',
                  },
                ],
                icon: faBookOpen,
              },
              {
                title: 'Ediții anterioare',
                url: '/events/conferences/francophones-studies/current-year/info',
                icon: faBookOpen,
              },
            ],
            icon: faComments,
          },
          {
            title: 'Colocviile franco-române de lingvistică',
            url: '/events/conferences/lingvistic-francophones',
            icon: faComments,
          },
          {
            title: 'Colocviul studențesc de studii francofone',
            submenu: [
              {
                title: '2024',
                url: '/evenimente/colocvii/studentesc-2024',
                submenu: [
                  {
                    title: 'Apel la comunicări',
                    url: '/events/conferences/francophones-studies/current-year/calls',
                  },
                  {
                    title: 'Fișa de înscriere',
                    url: '/events/conferences/francophones-studies/current-year/registration',
                  },
                  {
                    title: 'Organizatori și parteneri',
                    url: '/events/conferences/francophones-studies/current-year/organizers-and-partners',
                  },
                  {
                    title: 'Comitet științific',
                    url: '/events/conferences/francophones-studies/current-year/scientific-committee',
                  },
                  {
                    title: 'Informații utile',
                    url: '/events/conferences/francophones-studies/current-year/info',
                  },
                ],
                icon: faBookOpen,
              },
              {
                title: 'Ediții anterioare',
                url: '/events/conferences/cieft/previous-editions',
                icon: faBookOpen,
              },
            ],
            icon: faComments,
          },
        ],
        icon: faComments,
      },
      {
        title: 'Mese rotunde',
        url: '/events/round-tables',
        icon: faAddressBook,
      },
      {
        title: 'Susțineri de teze doctorale',
        url: '/events/phd-theses',
        icon: faGraduationCap,
      },
      {
        title: 'Alte evenimente',
        url: '/events/other-events',
        icon: faEllipsis,
      },
    ],
  },
  {
    title: 'Cercetare',
    url: '/cercetare',
    submenu: [
      {
        title: 'Publicații',
        submenu: [
          {
            title: 'Dialogues Francophones',
            submenu: [
              {
                title: 'Despre noi',
                url: '/research/publications/dialogue-francophones/about',
                icon: faInfo,
              },
              {
                title: 'Comitete',
                url: '/research/publications/dialogue-francophones/committees',
                icon: faInfo,
              },
              {
                title: 'Politica editorială',
                url: '/research/publications/dialogue-francophones/editorial-policy',
                icon: faInfo,
              },
              {
                title: 'Apel la contribuții',
                submenu: [
                  {
                    title: '2024',
                    url: '/research/publications/dialogue-francophones/calls/future',
                  },
                  {
                    title: 'Apeluri trecute',
                    url: '/research/publications/dialogue-francophones/calls/past',
                  },
                ],
                icon: faInfo,
              },
              {
                title: 'Volume',
                url: '/research/publications/dialogue-francophones/volumes',
                icon: faInfo,
              },
              {
                title: 'Indexare',
                url: '/research/publications/dialogue-francophones/indexing',
                icon: faInfo,
              },
            ],
            icon: faNewspaper,
          },
          {
            title: 'Agapes Francophones',
            submenu: [
              {
                title: 'Despre noi',
                url: '/research/publications/agapes-francophones/about',
                icon: faInfo,
              },
              {
                title: 'Comitete',
                url: '/research/publications/agapes-francophones/committees',
                icon: faInfo,
              },
              {
                title: 'Politica editorială',
                url: '/research/publications/agapes-francophones/editorial-policy',
                icon: faInfo,
              },
              {
                title: 'Apel la contribuții',
                submenu: [
                  {
                    title: 'Apeluri viitoare',
                    url: '/research/publications/agapes-francophones/calls/future',
                  },
                  {
                    title: 'Apeluri trecute',
                    url: '/research/publications/agapes-francophones/calls/past',
                  },
                ],
                icon: faInfo,
              },
              {
                title: 'Volume',
                url: '/research/publications/agapes-francophones/volumes',
                icon: faInfo,
              },
              {
                title: 'Indexare',
                url: '/research/publications/agapes-francophones/indexing',
                icon: faInfo,
              },
            ],
            icon: faNewspaper,
          },
          {
            title: 'Actele colocviilor franco-române de lingvistică',
            url: '/research/publications/lingvistic-conferences',
            icon: faNewspaper,
          },
          {
            title: 'Publicațiile membrilor',
            url: '/research/publications/members-publications',
            icon: faNewspaper,
          },
          {
            title: 'Traduceri',
            url: '/research/publications/translations',
            icon: faNewspaper,
          },
        ],
        icon: faNewspaper,
      },
      {
        title: 'Proiecte',
        url: '/research/projects',
        icon: faDiagramProject,
      },
    ],
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: faInfo,
  },
];
