import './KFooter.css';
import logo from '../../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faEnvelope } from '@fortawesome/free-regular-svg-icons';
//import LogInPage from '../../login/route';

export const KFooter = () => {
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
              <div>Vasile Pârvan blvd. no. 4</div>
              <div>Timişoara Timiş</div>
              <div>România 300223</div>
            </div>
          </div>
        </div>
      </div>
      <div className="stamp">
        Jurnal francofon de literatură contemporană
        <a href="/login" className="loginButton">
          Log In
        </a>{' '}
        {}
      </div>
    </>
  );
};
