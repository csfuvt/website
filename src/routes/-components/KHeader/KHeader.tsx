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
  faGraduationCap,
  faNewspaper,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons';
import roSvg from '../../../assets/ro.svg';
import frSvg from '../../../assets/fr.svg';

export const KHeader = () => {
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
                  Despre noi <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </a>
              <ul className="submenu">
                <li>
                  <Link to="/about/history">
                    <FontAwesomeIcon icon={faBookOpen} width="1rem" />
                    <span>Istoric</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about/description-and-objectives">
                    <FontAwesomeIcon icon={faBullseye} width="1rem" />
                    <span>Descriere și obiective</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about/members">
                    <FontAwesomeIcon icon={faUserGroup} width="1rem" />
                    <span>Membri</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <a>
                <div>
                  Evenimente <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </a>
              <ul className="submenu">
                <li>
                  <a>
                    <div>
                      <FontAwesomeIcon icon={faComments} width="1rem" />
                      <span>Colocvii</span>
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
                                Apel la comunicări
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/registration">
                                Fișa de înscriere
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/organizers-and-partners">
                                Organizatori și parteneri
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/scientific-committee">
                                Comitet științific
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/cieft/current-year/info">
                                Informații utile
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/events/conferences/cieft/previous-editions">
                            Ediții anterioare
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li>
                      <Link to="/events/conferences/lingvistic-francophones">
                        Colocviile franco-române de lingvistică
                      </Link>
                    </li> */}
                    <li>
                      <a>
                        <div>
                          Colocviul studențesc de studii francofone{' '}
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
                                Apel la comunicări
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/registration">
                                Fișa de înscriere
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/organizers-and-partners">
                                Organizatori și parteneri
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/scientific-committee">
                                Comitet științific
                              </Link>
                            </li>
                            <li>
                              <Link to="/events/conferences/francophones-studies/current-year/info">
                                Informații utile
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/events/conferences/francophones-studies/previous-editions">
                            Ediții anterioare
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/events/round-tables">
                    <FontAwesomeIcon icon={faDiscourse} width="1rem" />
                    <span>Mese rotunde</span>
                  </Link>
                </li>
                <li>
                  <Link to="/events/phd-theses">
                    <FontAwesomeIcon icon={faGraduationCap} width="1rem" />
                    <span>Susțineri de teze doctorale</span>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/events/other-events">
                    <FontAwesomeIcon icon={faEllipsis} width="1rem" />
                    <span>Alte evenimente</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            <li className="topmenu">
              <a>
                <div>
                  Cercetare <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </a>
              <ul className="submenu">
                <li>
                  <a>
                    <div>
                      <FontAwesomeIcon icon={faNewspaper} width="1rem" />
                      <span>Publicații</span>
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
                            Despre noi
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/committees">
                            Comitete
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/editorial-policy">
                            Politica editorială
                          </Link>
                        </li>
                        <li>
                          <a>
                            <div>
                              Apel la contribuții{' '}
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
                                Apeluri trecute
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/volumes">
                            Volume
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/dialogue-francophones/indexing">
                            Indexare
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li>
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
                            Despre noi
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/committees">
                            Comitete
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/editorial-policy">
                            Politica editorială
                          </Link>
                        </li>
                        <li>
                          <a>
                          <div>
                            Apel la contribuții{' '}
                            <FontAwesomeIcon
                              icon={faCaretRight}
                              className="to-right"
                            />
                            </div>
                          </a>
                          <ul className="submenu">
                            <li>
                              <Link to="/research/publications/agapes-francophones/calls/future">
                                Apeluri viitoare
                              </Link>
                            </li>
                            <li>
                              <Link to="/research/publications/agapes-francophones/calls/past">
                                Apeluri trecute
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/volumes">
                            Volume
                          </Link>
                        </li>
                        <li>
                          <Link to="/research/publications/agapes-francophones/indexing">
                            Indexare
                          </Link>
                        </li>
                      </ul>
                    </li> */}
                    <li>
                      <Link to="/research/publications/lingvistic-conferences">
                        Actele colocviilor franco-române de lingvistică
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/publications/members-publications">
                        Publicațiile membrilor
                      </Link>
                    </li>
                    <li>
                      <Link to="/research/publications/translations">
                        Traduceri
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li>
                  <Link to="/research/projects">
                    <FontAwesomeIcon icon={faDiagramProject} width="1rem" />
                    <span>Proiecte</span>
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* <li className="topmenu">
              <Link to="/international">Internațional</Link>
            </li> */}
            <li className="topmenu">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="center-row">
        <img src={roSvg} alt="Romanian flag" className="lang" /> RO /{' '}
        <img src={frSvg} alt="French flag" className="lang" /> FR
      </div>
      {/*<li className="divider"></li>*/}
    </div>
  );
};
