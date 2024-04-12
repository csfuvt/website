import { Link } from '@tanstack/react-router';
import logo from '../../../assets/logo.png';
import './KHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

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
                Despre noi <FontAwesomeIcon icon={faChevronDown} />
              </a>
              <ul className="submenu">
                <li>
                  <a>Istoric</a>
                </li>
                <li>
                  <a>Descriere si obiective</a>
                </li>
                <li>
                  <a>Membri</a>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <a>
                Evenimente <FontAwesomeIcon icon={faChevronDown} />
              </a>
              <ul className="submenu">
                <li>
                  <a>
                    Colocvii <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a>
                        CIEFT <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                      <ul className="submenu">
                        <li>
                          <a>
                            CIEFT 2025 <FontAwesomeIcon icon={faChevronRight} />
                          </a>
                          <ul className="submenu">
                            <li>
                              <a>Apel la comunicari</a>
                            </li>
                            <li>
                              <a>Fisa de inscriere</a>
                            </li>
                            <li>
                              <a>Organizatori si parteneri</a>
                            </li>
                            <li>
                              <a>Comitet stiintific</a>
                            </li>
                            <li>
                              <a>Informatii utile</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a>Editii anterioare</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a>Colocviile francoromane de lingvistica</a>
                    </li>
                    <li>
                      <a>
                        Colocviul studentesc de studii francofone{' '}
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                      <ul className="submenu">
                        <li>
                          <a>
                            2025 <FontAwesomeIcon icon={faChevronRight} />
                          </a>
                          <ul className="submenu">
                            <li>
                              <a>Apel la comunicari</a>
                            </li>
                            <li>
                              <a>Fisa de inscriere</a>
                            </li>
                            <li>
                              <a>Organizatori si parteneri</a>
                            </li>
                            <li>
                              <a>Comitet stiintific</a>
                            </li>
                            <li>
                              <a>Informatii utile</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a>Editii anterioare</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Mese rotunde</a>
                </li>
                <li>
                  <a>Sustineri de teze doctorale</a>
                </li>
                <li>
                  <a>Alte evenimente</a>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <a>
                Cercetare <FontAwesomeIcon icon={faChevronDown} />
              </a>
              <ul className="submenu">
                <li>
                  <a>
                    Publicatii <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                  <ul className="submenu">
                    <li>
                      <a>
                        Dialogues Francophones{' '}
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                      <ul className="submenu">
                        <li>
                          <a>Despre noi</a>
                        </li>
                        <li>
                          <a>Comitete</a>
                        </li>
                        <li>
                          <a>Politica editoriala</a>
                        </li>
                        <li>
                          <a>
                            Apel la contributii{' '}
                            <FontAwesomeIcon icon={faChevronRight} />
                          </a>
                          <ul className="submenu">
                            <li>
                              <a>Apeluri viitoare</a>
                            </li>
                            <li>
                              <a>Apeluri trecute</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a>Volume</a>
                        </li>
                        <li>
                          <a>Indexare</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a>
                        Agapes Francophones{' '}
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                      <ul className="submenu">
                        <li>
                          <a>Despre noi</a>
                        </li>
                        <li>
                          <a>Comitete</a>
                        </li>
                        <li>
                          <a>Politica editoriala</a>
                        </li>
                        <li>
                          <a>
                            Apel la contributii{' '}
                            <FontAwesomeIcon icon={faChevronRight} />
                          </a>
                          <ul className="submenu">
                            <li>
                              <a>Apeluri viitoare</a>
                            </li>
                            <li>
                              <a>Apeluri trecute</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a>Volume</a>
                        </li>
                        <li>
                          <a>Indexare</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a>Actele colocviilor franco-romane de lingvistica</a>
                    </li>
                    <li>
                      <a>Publicatiile membrilor</a>
                    </li>
                    <li>
                      <a>Traduceri</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Proiecte</a>
                </li>
              </ul>
            </li>
            <li className="topmenu">
              <a>International</a>
            </li>
            <li className="topmenu">
              <a>Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div>RO / FR</div>
      {/*<li className="divider"></li>*/}
    </div>
  );
};
