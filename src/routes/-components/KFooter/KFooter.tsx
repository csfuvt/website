import './KFooter.css';
import logo from '../../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../../hooks/useAuth.ts';
//import LogInPage from '../../login/route';
import { useTranslation } from 'react-i18next';

export const KFooter = () => {

  const { t } = useTranslation();

  const { isLoggedIn, signOut } = useAuth();


  return (
    <>
      <div className="footer">
        <img src={logo} className="logo" alt="Logo" />
        <div className="address">
          <div className="row">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:dialogues.francophones@e-uvt.ro">
              dialogues.francophones@e-uvt.ro
            </a>
          </div>
          <div className="row">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:agapes.francophones@e-uvt.ro">
              agapes.francophones@e-uvt.ro
            </a>
          </div>
          <div className="row">
            <FontAwesomeIcon icon={faCompass} />
            <div>
              <div>{t('Vasile Pârvan blvd. no. 4')}</div>
              <div>{t('Timişoara Timiş')}</div>
              <div>{t('România 300223')}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="stamp">

        {t('Jurnal francofon de literatură contemporană')}
        <a href="/login" className="loginButton">
          Log In
        </a>{' '}

        {!isLoggedIn ? (
          <a href="/login" className="loginButton">
            Log In
          </a>
        ) : (
          <span onClick={signOut} className="loginButton">
            Log out
          </span>
        )}

      </div>
    </>
  );
};
