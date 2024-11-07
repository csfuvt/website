import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faBookOpen,
  faInfo,
  faBullseye,
  faUserGroup,
  faComments,
  faGraduationCap,
  faEllipsis,
  faNewspaper,
  faDiagramProject,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';

type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconProp;
};

export const menuItemsData: MenuItem[] = [
  {
    title: 'Acasă',
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
      {
        title: 'Parteneri',
        url: '/about/partners',
        icon: faHandshake,
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
                title: 'CIEFT 2025',
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
                    url: '/events/conferences/cieft/current-year/info',
                  },
                ],
              },
              {
                title: 'Ediții anterioare',
                url: '/events/conferences/francophones-studies/current-year/info',
              },
            ],
          },
          {
            title: 'Colocviile franco-române de lingvistică',
            url: '/events/conferences/lingvistic-francophones',
          },
          {
            title: 'Colocviul studențesc de studii francofone',
            submenu: [
              {
                title: '2024',
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
              },
              {
                title: 'Ediții anterioare',
                url: '/events/conferences/cieft/previous-editions',
              },
            ],
          },
        ],
        icon: faComments,
      },
      {
        title: 'Mese rotunde',
        url: '/events/round-tables',
        icon: faDiscourse,
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
              },
              {
                title: 'Comitete',
                url: '/research/publications/dialogue-francophones/committees',
              },
              {
                title: 'Politica editorială',
                url: '/research/publications/dialogue-francophones/editorial-policy',
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
              },
              {
                title: 'Volume',
                url: '/research/publications/dialogue-francophones/volumes',
              },
              {
                title: 'Fișa de înscriere',
                url: '/research/publications/dialogue-francophones/registration/registration',
              },
              {
                title: 'Indexare',
                url: '/research/publications/dialogue-francophones/indexing',
              },
            ],
          },
          {
            title: 'Agapes Francophones',
            submenu: [
              {
                title: 'Despre noi',
                url: '/research/publications/agapes-francophones/about',
              },
              {
                title: 'Comitete',
                url: '/research/publications/agapes-francophones/committees',
              },
              {
                title: 'Politica editorială',
                url: '/research/publications/agapes-francophones/editorial-policy',
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
              },
              {
                title: 'Volume',
                url: '/research/publications/agapes-francophones/volumes',
              },
              {
                title: 'Indexare',
                url: '/research/publications/agapes-francophones/indexing',
              },
            ],
          },
          {
            title: 'Actele colocviilor franco-române de lingvistică',
            url: '/research/publications/lingvistic-conferences',
          },
          {
            title: 'Publicațiile membrilor',
            url: '/research/publications/members-publications',
          },
          {
            title: 'Traduceri',
            url: '/research/publications/translations',
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
