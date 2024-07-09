import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../-components/KBanner/KBanner';
import { KMemberCard } from '../../-components/KMemberCard/KMemberCard';
import { KTitle } from '../../-components/KTitle/KTitle';
import styles from './MembersPage.module.css';
import profile from '../../../../public/profile.png';
import Georgiana_Badea from '../../../../public/Despre_noi/Georgiana-Badea.jpg';
import Neli_Eiben from '../../../../public/Despre_noi/Neli-Eiben.jpg';
import Ioana_Marcu from '../../../../public/Despre_noi/Ioana-Marcu.jpg';
import Andreea_Gheorghiu from '../../../../public/Despre_noi/Andreea-Gheorghiu.jpg';
import Ramona_Malita_Tanc from '../../../../public/Despre_noi/Ramona-Malita.jpg';
import Mariana_Pitar from '../../../../public/Despre_noi/Mariana-Pitar.jpg';
import Vasile_Popovici from '../../../../public/Despre_noi/Vasile-Popovici.jpg';
import Adina_Tihu from '../../../../public/Despre_noi/Adina-Tihu.jpg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const MembersPage = () => {
  const { t } = useTranslation();
  const [openCard, setOpenCard] = useState<string | null>(null);

  const handleToggleDescription = (name: string) => {
    setOpenCard(openCard === name ? null : name);
  };

  const members = [
    {
      description: t(
        "Centres d'intérêt : littérature francophones écrivain.e.s roumain.e.s d'expression française, littérature française, traduction littéraire, traductologie, histoire générale et comparée de la traduction, histoire de la traduction en roumain"
      ),
      cvLink: '',
      profileImage: Georgiana_Badea,
      label_name: 'Prof. Univ. Dr. Georgiana Badea',
      label_title: t('Director Centru'),
    },
    {
      description: t(
        "Lector universitar doctor, predă limba franceză la Universitatea de Vest din Timişoara, Facultatea de Litere, Istorie și Teologie, Departamentul de Limbi și Literaturi Moderne. Ea este membru fondator al asociațiilor : Asociația de studii francophone DF și Asociația Isttrarom Translationes și membru al mai multor organizații profesionale : Conseil International d'Études Francophones, Association Internationale des Études Québécoises, Association d'études canadiennes en Europe Centrale, SEPTET, Association Canadienne de Traductologie și SoFT. Ea a participat la numeroase manifestări științifice naționale și internaționale. Singură sau împreună cu alți colegi a coordonat mai multe numere tematice ale revistelor Dialogues francophones și Translationes; a publicat cartea Sur une visibilité de l'autotraducteur: Dumitru Tsepeneag et Felicia Mihali (EUV, 2017) și mai multe studii în volume colective sau în reviste de specialitate. Principalele sale axe de cercetare sunt : teoria, practica și didactica traducerii și literaturile francofone"
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/12.CV_NeliEiben.pdf',
      profileImage: Neli_Eiben,
      label_name: 'Lect. Univ. Dr. Neli Eiben',
      label_title: t('Secretar Științific'),
    },
    {
      description: t(
        "Lector universitar doctor în cadrul Universității de Vest din Timișoara, este doctor în filologie, susţinându-şi teza de doctorat cu titlul La problématique de l’ « entre(-)deux dans la littérature des « intrangères » în 2014 la Universitatea Paris8, Franţa. Predă cursuri de literatură franceză (Clasicism, Secolul Lumnilor, literatura secolului al XX-lea) şi de literaturi francofone. Domeniile de cercetare sunt : literatura imigraţiei, literaturile francofone, literatura traumei, literatura urbană. Împreună cu alți colegi a coordonat mai multe numere tematice ale revistei Dialogues francophones ; a colaborat la volumele Agapes francophones 2010, 2011, 2012, 2017, 2019, 2021, 2023 ; a publicat cartea La problématique de l'« entre(-)deux » dans la littérature des « intranger.e.s » (L'Harmattan, 2019) și mai multe studii în volume colective sau în reviste de specialitate. A co-organizat mai multe ediţii ale Colocviului Internaţional de studii francofone CIEFT (2010-2023) ; a participat la colocvii/mese rotunde, în ţară şi în străinătate (Franţa, Portugalia, Georgia, etc.). Este co-responsabilă la Centrul de Reușită Universitară din cadrul Universității de Vest din Timișoara. Face parte din comitetul de redacţie al revistelor Dialogues francophones şi Agapes francophones."
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/IMarcu_Curriculum-vitae.pdf',
      profileImage: Ioana_Marcu,
      label_name: 'Lect. Univ. Dr. Ioana Marcu',
      label_title: t('Secretar'),
    },
    {
      description: t(
        "Doctor în filologie, doctor în Lingvistică-Semiotică-Comunicare (Universitatea din Besaçon), Master în Studii Europene și Internaționale avansate ( Institutul European de Studii Superioare Internaționale Nice-Sophia Antipolis). Teză de doctorat: „Roman et parodie chez Diderot. Lectures critiques et lectures d'écrivains” coordonată de Prof. Georgiana Lungu-Badea. După mai mult de 40 de ani de servicii loiale francofoniei, s-a pensionat în 2021. Cursuri predate la Universitatea de Vest din Timișoara: literatură franceză (secolele XVIII și XX - litere), inițiere în literatură, instituții europene (LMA). Cercetările sale sunt concentrate pe întrebări de teorie și practica parodiei literare. A publicat mai multe contribuții despre Diderot, Giraudoux, Nothomb, Ionescu în diferite reviste și a colaborat la lucrarea Scriitori români de expresie franceză (2003). În calitate de redactor șef adjunct, s-a alăturat echipei a doua de redacție a revistei „Dialogues francophones”, dirijată de Georgiana Lungu-Badea. A colaborat la volumul „(En)jeux identitaires” (DF nr 15/2009), responsabilă de volumele „Les Francophonies au féminin” (DF nr 15/2010, 486 p.), „Écritures francophones contemporaines” (DF nr 17/2011, 316 p.), „De l'(im)pudeur en Francophonie” (DF nr 18/2012, 265 p.), „Estitudes. Littérature francophone de l'Europe centrale et de l'Est (Roumanie, Hongrie)” (DF nr 19/2013, 250 p.). A participat la organizarea mai multor Colocvii anuale Internaționale de Studii Francofone la Timișoara, și a participat la editată mai multor volume de Agapes francophones apărute din 2008. Traduceri publicate în România și Franța."
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Andreea-Gheorghiu.pdf',
      profileImage: Andreea_Gheorghiu,
      label_name: 'Asist. Univ. Dr. Andreea Gheorghiu',
      label_title: t('Membru de bazǎ'),
    },
    {
      description: t(
        'conf. univ. dr. habil în cadrul Universității de Vest din Timișoara, este doctor în filologie (având teza de doctorat despre Madame de Staël). Predă cursuri de literatură franceză a Evului Mediu, a Renașterii și a secolului al XIX-lea. Domeniile de cercetare sunt: literatura franceză a secolului al XIX-lea, literatură medievală, studii francofone, traduceri literare, didactica textului literar. Membra Societății de studii staëliene, Geneva, membra SEPTET, a Societății de traductologie, Strasbourg, membră AUF. Publicații recente: Le Chronotope romanesque et ses avatars. Études comparatives, 2018; mai mult de 55 de contribuții în reviste naționale și internaționale; a colaborat la volumele Agapes francophones 2006-2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2016, 2017, 2019; a colaborat la numerele revistei care reunește contribuțiile Colocviului Internațional Comunicare și Cultură în Romania europeană (CICCRE), Quaestiones Romanicae 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020; co-organizatoare a colocviilor menționate; mai mult de 60 de participări la colocvii/congrese/mese rotunde, printre care 44 în străinătate (Franța, Germania, Elveția, Italia, Danemarca, Polonia, Cipru, Serbia, Bulgaria, Algeria, Maroc, Moldova). Este manager al proiectului de cercetare  Timișoara-Oslo, o punte francofonă literară și didactică în parteneriat cu Universitatea din Oslo, Norvegia. Cursuri predate în străinătate: la Universitatea din Oslo, Norvegia; la Universitatea „Via Domitia” din Perpignan, Franța; în cadrul Universității din Silezia, Katowice, Polonia. Responsabila Lectoratului francez din Universitatea de Vest din Timișoara. Co-responsabilă la Centrul de Reușită Universitară din cadrul Universității de Vest din Timișoara.'
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Ramona-Malita-european-martie-2020.pdf',
      profileImage: Ramona_Malita_Tanc,
      label_name: 'Conf. Univ. Dr. Ramona Malița Tanc',
      label_title: t('Membru de bazǎ'),
    },
    {
      description: t(
        "Centres d'intérêt : terminologie, traduction des documents audio-visuels, linguistique du texte, traduction assistée par ordinateur"
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Pitar-Mariana-2020.pdf',
      profileImage: Mariana_Pitar,
      label_name: 'Conf. Univ. Dr. Mariana Pitar',
      label_title: t('Membru de bazǎ'),
    },
    {
      description: t(
        "Centres d'intérêt : littérature française des XIXe et XXe siècles, littératures comparées, théorie littéraire"
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Popovici-Vasile.pdf',
      profileImage: Vasile_Popovici,
      label_name: 'Prof. Univ. Dr. Vasile Popovici',
      label_title: t('Membru de bazǎ'),
    },
    {
      description: t(
        "Centres d'intérêt : linguistique française, linguistique contrastive, domaine français - roumain : syntaxe et sémantique"
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/CV-Adina-TIHU.pdf',
      profileImage: Adina_Tihu,
      label_name: 'Lect. Univ. Dr. Adina Tihu',
      label_title: t('Membru de bazǎ'),
    },
    {
      description: t(
        "Centres d'intérêt : les systèmes de notation phonétique en diachronie, la phraséologie du français, la lexicographie et l'histoire des dictionnaires"
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/04.CV_Eugenia_Tanase.pdf',
      profileImage: profile,
      label_name: 'Lect. Univ. Dr. Eugenia Tănase',
      label_title: t('Membru de bazǎ'),
    },
    {
      description: t(
        "Centres d'intérêt : orthographe du français, grammaire contrastive (français - roumain)"
      ),
      cvLink:
        'https://litere.uvt.ro/wp-content/uploads/2014/07/06.CV_Cristina_Tanase.pdf',
      profileImage: profile,
      label_name: 'Asist. Univ. Dr. Cristina Tănase',
      label_title: t('Membru de bazǎ'),
    },
  ];

  const honoraryMembers = [
    {
      description: '',
      cvLink: '',
      profileImage: profile,
      label_name: 'Prenume Nume',
      label_title: t('Secretar Științific'),
    },
  ];

  return (
    <div>
      <KBanner label={t('MEMBRI')} />
      <div className={styles.pageContainer}>
        <div className={styles.section}>
          <KTitle label={t('Membru fondator')} />
          <KMemberCard
            description={t(
              'este cadru didactic asociat al Departamentului de limbi romanice al Universității de Vest din Timișoara. A fondat Centrul de Studii francofone și revista Dialogues francophones, publicată de către Centru începând cu anul 1995. Ea a publicat mai multe cărți, printre care se regăsesc La Roumanie et la francophonie (în colaborare), Des troubadours aux préromantiques. Sept siècles de littérature française et La neige, la même et autre. Essai sur le roman québécois contemporain. Este autoarea a aproximativ sute de articole apărute în volume și în reviste științifice din România și din străinătate. De asemenea, a publicat în jur de douăzeci de traduceri ale autorilor precum Paul Ricœur, Alain de Libéra, Alain Finkielkraut, Jean-Paul Sartre, Patrick Chamoiseau. Este membră în mai multe asociații științifice internaționale, printre care Consiliul Internațional de Studii Francofone, Asociația Internațională de Studii din Québec și Asociația Internațională de Studii Acadiene. A obținut premiul „Prix Rousseau pour l’Essai” oferit de Ministerul francez al culturii și Premiul Uniunii Scriitorilor români pentru traducerea operei Tristan et Iseut.'
            )}
            cvLink=""
            profileImage={profile}
            label_name="Margareta Gyurcsik"
            label_title={t('Membru onorific')}
            isOpen={openCard === 'Margareta Gyurcsik'}
            toggleDescription={() =>
              handleToggleDescription('Margareta Gyurcsik')
            }
          />
        </div>
        <div className={styles.section}>
          <KTitle label={t('Membri activi')} />
          <div className={styles.membersGrid}>
            {members.map(member => (
              <KMemberCard
                key={member.label_name}
                description={member.description}
                cvLink={member.cvLink}
                profileImage={member.profileImage}
                label_name={member.label_name}
                label_title={member.label_title}
                isOpen={openCard === member.label_name}
                toggleDescription={() =>
                  handleToggleDescription(member.label_name)
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <KTitle label={t('Membri onorifici')} />
          <div className={styles.membersGrid}>
            {honoraryMembers.map(member => (
              <KMemberCard
                key={member.label_name}
                description={member.description}
                cvLink={member.cvLink}
                profileImage={member.profileImage}
                label_name={member.label_name}
                label_title={member.label_title}
                isOpen={openCard === member.label_name}
                toggleDescription={() =>
                  handleToggleDescription(member.label_name)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about/members/')({
  component: MembersPage,
});

export default MembersPage;
