import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBookOpen, faInfo, faBullseye, faUserGroup, faHandshake, faComments, faAddressBook, faGraduationCap, faEllipsis, faNewspaper, faDiagramProject } from '@fortawesome/free-solid-svg-icons';

type MenuItem = {
  title: string;
  url?: string;
  submenu?: MenuItem[];
  icon?: IconProp;
};

export const menuItemsData: MenuItem[] = [
  {
    title: "Acasa",
    url: "/",
    icon: faHome,
  },
  {
    title: "Despre noi",
    url: "/despre-noi",
    submenu: [
      {
        title: "Istoric",
        url: "/despre-noi/istoric",
        icon: faBookOpen,
      },
      {
        title: "Descriere și obiective",
        url: "/despre-noi/descriere-obiective",
        icon: faBullseye,
      },
      {
        title: "Membri",
        url: "/despre-noi/membri",
        icon: faUserGroup,
      },
      {
        title: "Parteneri",
        url: "/despre-noi/parteneri",
        icon: faHandshake,
      }
    ]
  },
  {
    title: "Evenimente",
    url: "/evenimente",
    submenu: [
      {
        title: "Colocvii",
        url: "/evenimente/colocvii",
        submenu: [
          {
            title: "CIEFT",
            url: "/evenimente/colocvii/cieft",
            submenu: [
              {
                title: "CIEFT 2024",
                url: "/evenimente/colocvii/cieft-2024",
                submenu: [
                  {
                    title: "Apel la comunicări",
                    url: "/evenimente/colocvii/cieft-2024/apel-comunicari",
                  },
                  {
                    title: "Fișa de înscriere",
                    url: "/evenimente/colocvii/cieft-2024/fisa-inscriere",
                  },
                  {
                    title: "Organizatori și parteneri",
                    url: "/evenimente/colocvii/cieft-2024/organizatori-parteneri",
                  },
                  {
                    title: "Comitet științific",
                    url: "/evenimente/colocvii/cieft-2024/comitet-stiintific",
                  },
                  {
                    title: "Informații utile",
                    url: "/evenimente/colocvii/cieft-2024/informatii-utile",
                  }
                ],
                icon: faBookOpen,
              },
              {
                title: "Ediții anterioare",
                url: "/evenimente/colocvii/cieft/editi-anterioare",
                icon: faBookOpen,
              }
            ],
            icon: faComments,
          },
          {
            title: "Colocviile franco-române de lingvistică",
            url: "/evenimente/colocvii/colocvii-franco-romane",
            icon: faComments,
          },
          {
            title: "Colocviul studențesc de studii francofone",
            url: "/evenimente/colocvii/colocviul-studentesc",
            submenu: [
              {
                title: "2024",
                url: "/evenimente/colocvii/studentesc-2024",
                submenu: [
                  {
                    title: "Apel la comunicări",
                    url: "/evenimente/colocvii/studentesc-2024/apel-comunicari",
                  },
                  {
                    title: "Fișa de înscriere",
                    url: "/evenimente/colocvii/studentesc-2024/fisa-inscriere",
                  },
                  {
                    title: "Organizatori și parteneri",
                    url: "/evenimente/colocvii/studentesc-2024/organizatori-parteneri",
                  },
                  {
                    title: "Comitet științific",
                    url: "/evenimente/colocvii/studentesc-2024/comitet-stiintific",
                  },
                  {
                    title: "Informații utile",
                    url: "/evenimente/colocvii/studentesc-2024/informatii-utile",
                  }
                ],
                icon: faBookOpen,
              },
              {
                title: "Ediții anterioare",
                url: "/evenimente/colocvii/studentesc/editi-anterioare",
                icon: faBookOpen,
              }
            ],
            icon: faComments,
          }
        ],
        icon: faComments,
      },
      {
        title: "Mese rotunde",
        url: "/evenimente/mese-rotunde",
        icon: faAddressBook,
      },
      {
        title: "Susțineri de teze doctorale",
        url: "/evenimente/sustinere-teze",
        icon: faGraduationCap,
      },
      {
        title: "Alte evenimente",
        url: "/evenimente/alte-evenimente",
        icon: faEllipsis,
      }
    ]
  },
  {
    title: "Cercetare",
    url: "/cercetare",
    submenu: [
      {
        title: "Publicații",
        url: "/cercetare/publicatii",
        submenu: [
          {
            title: "Dialogues Francophones",
            url: "/cercetare/publicatii/dialogues-francophones",
            submenu: [
              {
                title: "Despre noi",
                url: "/cercetare/publicatii/dialogues-francophones/despre-noi",
                icon: faInfo,
              },
              {
                title: "Comitete",
                url: "/cercetare/publicatii/dialogues-francophones/comitete",
                icon: faInfo,
              },
              {
                title: "Politica editorială",
                url: "/cercetare/publicatii/dialogues-francophones/politica-editoriala",
                icon: faInfo,
              },
              {
                title: "Apel la contribuții",
                url: "/cercetare/publicatii/dialogues-francophones/apel-contributii",
                submenu: [
                  {
                    title: "2024",
                    url: "/cercetare/publicatii/dialogues-francophones/apel-2024",
                  },
                  {
                    title: "Apeluri trecute",
                    url: "/cercetare/publicatii/dialogues-francophones/apeluri-trecute",
                  }
                ],
                icon: faInfo,
              },
              {
                title: "Volume",
                url: "/cercetare/publicatii/dialogues-francophones/volume",
                icon: faInfo,
              },
              {
                title: "Indexare",
                url: "/cercetare/publicatii/dialogues-francophones/indexare",
                icon: faInfo,
              }
            ],
            icon: faNewspaper,
          },
          {
            title: "Agapes Francophones",
            url: "/cercetare/publicatii/agapes-francophones",
            submenu: [
              {
                title: "Despre noi",
                url: "/cercetare/publicatii/agapes-francophones/despre-noi",
                icon: faInfo,
              },
              {
                title: "Comitete",
                url: "/cercetare/publicatii/agapes-francophones/comitete",
                icon: faInfo,
              },
              {
                title: "Politica editorială",
                url: "/cercetare/publicatii/agapes-francophones/politica-editoriala",
                icon: faInfo,
              },
              {
                title: "Apel la contribuții",
                url: "/cercetare/publicatii/agapes-francophones/apel-contributii",
                submenu: [
                  {
                    title: "Apeluri viitoare",
                    url: "/cercetare/publicatii/agapes-francophones/apel-viitoare",
                  },
                  {
                    title: "Apeluri trecute",
                    url: "/cercetare/publicatii/agapes-francophones/apeluri-trecute",
                  }
                ],
                icon: faInfo,
              },
              {
                title: "Volume",
                url: "/cercetare/publicatii/agapes-francophones/volume",
                icon: faInfo,
              },
              {
                title: "Indexare",
                url: "/cercetare/publicatii/agapes-francophones/indexare",
                icon: faInfo,
              }
            ],
            icon: faNewspaper,
          },
          {
            title: "Actele colocviilor franco-române de lingvistică",
            url: "/cercetare/publicatii/actele-colocviilor",
            icon: faNewspaper,
          },
          {
            title: "Publicațiile membrilor",
            url: "/cercetare/publicatii/publicatii-membri",
            icon: faNewspaper,
          },
          {
            title: "Traduceri",
            url: "/cercetare/publicatii/traduceri",
            icon: faNewspaper,
          }
        ],
        icon: faNewspaper,
      },
      {
        title: "Proiecte",
        url: "/cercetare/proiecte",
        submenu: [
          {
            title: "Proiecte în derulare",
            url: "/cercetare/proiecte/derulare",
            icon: faDiagramProject,
          },
          {
            title: "Proiecte finalizate",
            url: "/cercetare/proiecte/finalizate",
            icon: faDiagramProject,
          }
        ],
        icon: faDiagramProject,
      }
    ]
  },
  {
    title: "Contact",
    url: "/contact",
    icon: faInfo,
  }
];
