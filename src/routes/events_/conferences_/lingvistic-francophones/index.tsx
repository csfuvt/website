import { createFileRoute } from '@tanstack/react-router'
import { KBanner } from '../../../-components/KBanner/KBanner'
import KCardColocvii from '../../../-components/KCardColocvii/KCardColocvii'
import styles from '../../../-components/KCardColocvii/KCardColocvii.module.css';

export const Route = createFileRoute(
  '/events_/conferences_/lingvistic-francophones/',
)({
  component: () => (
    <><KBanner label="COLOCVIILE FRANCO-ROMANE DE LINGVISTICA" />
    
    <div className={styles.colocviiContainer}>
      <KCardColocvii id={0} title={'XVe Colloque International d’Études Francophones « Frontière(s) » (CIEFT 2021)'} meetingDate={'19 mars 2021'} programme={'../../../../public/DocumenteColocvii/15/programme.pdf'} resume={'../../../../public/DocumenteColocvii/15/resume.pdf'} redactionArticle='../../../../public/DocumenteColocvii/15/protocole.pdf' />
      <KCardColocvii id={1} title={'XIVe Colloque International d’Études Francophones « Comparaison(s) » (CIEFT 2019)'} meetingDate={'15 mars 2019'} programme={'../../../../public/DocumenteColocvii/14/programme.pdf'} resume={'../../../../public/DocumenteColocvii/14/resume.pdf'} />
      <KCardColocvii id={2} title={'XIIIe Colloque International d’Études Francophones « Silence(s) » (CIEFT 2017)'} meetingDate={'17 mars 2017'} programme={'../../../../public/DocumenteColocvii/13/programme.pdf'} resume={'../../../../public/DocumenteColocvii/13/resume.pdf'} />
      <KCardColocvii id={3} title={'XIIe Colloque International d’Études Francophones « Parabole(s) » (CIEFT 2016)'} meetingDate={'18 mars 2016'}  programme={'../../../../public/DocumenteColocvii/12/programme.pdf'} resume={'../../../../public/DocumenteColocvii/12/resume.pdf'} />
      <KCardColocvii id={4} title={'XIe Colloque international d’études francophones « Le texte en contexte(s) » (CIEFT 2014)'} meetingDate={'13 mars 2014'}  programme={'../../../../public/DocumenteColocvii/11/programme.pdf'} resume={'../../../../public/DocumenteColocvii/11/resume.pdf'} />
      <KCardColocvii id={5} title={'Xe Colloque international d’études francophones « Voyage(s) » (CIEFT 2013)'} meetingDate={'15 mars 2013'} programme={'../../../../public/DocumenteColocvii/10/programme.pdf'} resume={'../../../../public/DocumenteColocvii/10/resume.pdf'} />
      <KCardColocvii id={6} title={'IXe Colloque international d’études francophones « Passeurs de mots » (CIEFT 2012)'} meetingDate={'16 mars 2012'} programme={'../../../../public/DocumenteColocvii/9/resume.pdf'} />
      <KCardColocvii id={7} title={'VIIIe Colloque international d’études francophones « Temps. Espace. Temps-Espace » (CIEFT 2011)'} meetingDate={'18 mars 2011'}  programme={'../../../../public/DocumenteColocvii/8/resume.pdf'} />
      <KCardColocvii id={8} title={'VIIe Colloque Contributions roumaines à la francophonie'} meetingDate={'12 mars 2010'} programme={'../../../../public/DocumenteColocvii/7/resume.pdf'} />
      <KCardColocvii id={9} title={'VIe Colloque Contributions roumaines à la francophonie'} meetingDate={'27 mars 2009'} programme={'../../../../public/DocumenteColocvii/6/resume.pdf'}/>
      <KCardColocvii id={10} title={'Ve Colloque Contributions roumaines à la francophonie'} meetingDate={'28-29 mars 2008'} programme={'../../../../public/DocumenteColocvii/5/resume.pdf'}/>
      <KCardColocvii id={11} title={'IVe Colloque Contributions roumaines à la francophonie'} meetingDate={'16 mars 2007'} programme={'../../../../public/DocumenteColocvii/4/resume.pdf'} />
      <KCardColocvii id={12} title={'IIIe Colloque Contributions roumaines à la francophonie'} meetingDate={'16 mars 2007'} programme={'../../../../public/DocumenteColocvii/3/resume.pdf'} />
      <KCardColocvii id={13} title={'IIe Colloque Contributions roumaines à la francophonie'} meetingDate={'18 mars 2005'} programme={'../../../../public/DocumenteColocvii/2/resume.pdf'} />
      <KCardColocvii id={14} title={'Ier Colloque Contributions roumaines à la francophonie'} meetingDate={'19 mars 2004'} programme={'../../../../public/DocumenteColocvii/1/resume.pdf'} />
    </div>
    </>
  ),
})
