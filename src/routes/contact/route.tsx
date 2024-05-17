import { createFileRoute } from '@tanstack/react-router';
import styles from './ContactPage.module.css';
import { KBanner } from '../-components/KBanner/KBanner';

const ContactPage: React.FC = () => {
  return (
    <div>
      <KBanner label="CONTACT" />
      <div className={styles.container}>
        <div className={styles.mapSection}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.1615838919135!2d21.22245131555957!3d45.75357797910548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745679b9a633c37%3A0x474da90e297af656!2sBulevardul%20Vasile%20P%C3%A2rvan%204%2C%20Timi%C5%9Foara%20430022%2C%20Romania!5e0!3m2!1sen!2sus!4v1612265623809!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.title}>Adresa</div>
          <br></br>
          <div className={styles.line}>
            <div className={styles.text}>
              Bulevardul Vasile Pârvan nr. 4<br></br>
              300223 Timișoara
              <br></br> Timiș
              <br></br>România
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>

          <div className={styles.title}>E-Mail</div>
          <br></br>
          <div className={styles.line}>
            <div className={styles.text}>
              <span>Dialogues francophones:</span>
              <a href="mailto:dialogues.francophones@e-uvt.ro">
                dialogues.francophones@e-uvt.ro
              </a>
            </div>
            <div className={styles.text}>
              <span>Agapes francophones:</span>
              <a href="mailto:agapes.francophones@e-uvt.ro">
                agapes.francophones@e-uvt.ro
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

export default ContactPage;
