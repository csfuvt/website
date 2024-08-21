import { Link } from '@tanstack/react-router';
import logo from '../../../assets/logo.png';
import './KHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faBullseye,
  faCaretDown,
  faCaretRight,
  faComments,
  faDiagramProject,
  faEllipsis,
  faGraduationCap,
  faHandshake,
  faNewspaper,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

export const KHeader = () => {
  const { t /*, i18n*/ } = useTranslation();

  // const handleLanguageChange = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  return (
    <div className="header">
      <div className="nav">
        <Link to="/" className="">
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <div className="cm-e-menu">
          <ul>
            <li className="topmenu">
              <a>
                <div>
                  {t('Despre noi')} <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </a>
              <ul className="submenu">
                <li>
                  <Link to="/about/history">
                    <FontAwesomeIcon icon={faBookOpen} width="1rem" />
                    <span>{t('Istoric')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about/description-and-objectives">
                    <FontAwesomeIcon icon={faBullseye} width="1rem" />
                    <span>{t('Descriere și obiective')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about/members">
                    <FontAwesomeIcon icon={faUserGroup} width="1rem" />
                    <span>{t('Membri')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about/partners">
                    <FontAwesomeIcon icon={faHandshake} width="1rem" />
                    <span>{t('Parteneri')}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <a>
                <div>
                  {t('Evenimente')} <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </a>
              <ul className="submenu">
                <li>
                  <a>
                    <div>
                      <FontAwesomeIcon icon={faComments} width="1rem" />
                      <span>{t('Colocvii')}</span>
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="to-right"
                      />
                    </div>
                  </a>
                  <ul className="submenu">
                    <li>
                      <a>
                        <div>
                          CIEFT{' '}
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="to-right"
                          />
                        </div>
                      </a>
                      <ul className="submenu">
                        <li>
                          <a>
                            <div>
                              CIEFT 2024{' '}
                              <FontAwesomeIcon
                                icon={faCaretRight}
                                className="to-right"
                              />
                            </div>
                          </a>
                          <ul className="submenu">
                            <li>
                              <Link to="/events/conferences/cieft/current-year/calls">
                                {t('Apel la comunicări')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/registration">
                                {t('Fișa de înscriere')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/organizers-and-partners">
                                {t('Organizatori și parteneri')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/scientific-committee">
                                {t('Comitet științific')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/info">
                                {t('Informații utile')}
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/events/conferences/cieft/previous-editions">
                            {t('Ediții anterioare')}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/events/conferences/lingvistic-francophones">
                        {t('Colocviile franco-române de lingvistică')}
                      </Link>
                    </li>
                    <li>
                      <a>
                        <div>
                          {t('Colocviul studențesc de studii francofone')}
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="to-right"
                          />
                        </div>
                      </a>
                      <ul className="submenu">
                        <li>
                          <a>
                            <div>
                              2024{' '}
                              <FontAwesomeIcon
                                icon={faCaretRight}
                                className="to-right"
                              />
                            </div>
                          </a>
                          <ul className="submenu">
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/calls">
                                {t('Apel la comunicări')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/registration">
                                {t('Fișa de înscriere')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/organizers-and-partners">
                                {t('Organizatori și parteneri')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/scientific-committee">
                                {t('Comitet științific')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/info">
                                {t('Informații utile')}
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/events/conferences/francophones-studies/previous-editions">
                            {t('Ediții anterioare')}
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/events/round-tables">
                    <FontAwesomeIcon icon={faDiscourse} width="1rem" />
                    <span>{t('Mese rotunde')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/events/phd-theses">
                    <FontAwesomeIcon icon={faGraduationCap} width="1rem" />
                    <span>{t('Susțineri de teze doctorale')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/events/other-events">
                    <FontAwesomeIcon icon={faEllipsis} width="1rem" />
                    <span>{t('Alte evenimente')}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <a>
                <div>
                  {t('Cercetare')} <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </a>
              <ul className="submenu">
                <li>
                  <a>
                    <div>
                      <FontAwesomeIcon icon={faNewspaper} width="1rem" />
                      <span>{t('Publicații')}</span>
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        className="to-right"
                      />
                    </div>
                  </a>
                  <ul className="submenu">
                    <li>
                      <a>
                        <div>
                          Dialogues Francophones{' '}
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="to-right"
                          />
                        </div>
                      </a>
                      <ul className="submenu">
                        <li>
                          <Link to="/research/publications/dialogue-francophones/about">
                            {t('Despre noi')}
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/committees">
                            {t('Comitete')}
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/editorial-policy">
                            {t('Politica editorială')}
                          </Link>
                        </li>
                        <li>
                          <a>
                            <div>
                              {t('Apel la contribuții')}
                              <FontAwesomeIcon
                                icon={faCaretRight}
                                className="to-right"
                              />
                            </div>
                          </a>
                          <ul className="submenu">
                            <li>
                              <Link to="/research/publications/dialogue-francophones/calls/future">
                                2024
                              </Link>
                            </li>
                            <li>
                              <Link to="/research/publications/dialogue-francophones/calls/past">
                                {t('Apeluri trecute')}
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <Link to="/research/publications/dialogue-francophones/registration/registration">
                            {t('Fișa de înscriere')}
                          </Link>
                        </li>

                        <li>
                          <Link to="/research/publications/dialogue-francophones/volumes">
                            {t('Volume')}
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/indexing">
                            {t('Indexare')}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a>
                        <div>
                          Agapes Francophones{' '}
                          <FontAwesomeIcon
                            icon={faCaretRight}
                            className="to-right"
                          />
                        </div>
                      </a>
                      <ul className="submenu">
                        <li>
                          <Link to="/research/publications/agapes-francophones/about">
                            {t('Despre noi')}
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/committees">
                            {t('Comitete')}
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/editorial-policy">
                            {t('Politica editorială')}
                          </Link>
                        </li>
                        <li>
                          <a>
                            <div>
                              {t('Apel la contribuții')}
                              <FontAwesomeIcon
                                icon={faCaretRight}
                                className="to-right"
                              />
                            </div>
                          </a>
                          <ul className="submenu">
                            <li>
                              <Link to="/research/publications/agapes-francophones/calls/future">
                                {t('Apeluri viitoare')}
                              </Link>
                            </li>
                            <li>
                              <Link to="/research/publications/agapes-francophones/calls/past">
                                {t('Apeluri trecute')}
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/volumes">
                            {t('Volume')}
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/indexing">
                            {t('Indexare')}
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/research/publications/lingvistic-conferences">
                        {t('Actele colocviilor franco-române de lingvistică')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/publications/members-publications">
                        {t('Publicațiile membrilor')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/publications/translations">
                        {t('Traduceri')}
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/research/projects">
                    <FontAwesomeIcon icon={faDiagramProject} width="1rem" />
                    <span>{t('Proiecte')}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <Link to="/contact">{t('Contact')}</Link>
            </li>
          </ul>
        </div>
      </div>
      {/*
      <div className="center-row">
        <button className="lang" onClick={() => handleLanguageChange('ro')}>
          <img src={roSvg} alt="Romanian flag" />
        </button>
        <button className="lang" onClick={() => handleLanguageChange('fr')}>
          <img src={frSvg} alt="French flag" />
        </button>
      </div>*/}
    </div>
  );
};
