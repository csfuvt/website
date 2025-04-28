import React, { useState } from 'react';
import './KFooter.css';
import logo from '../../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../../hooks/useAuth.ts';
import { Modal } from 'antd';

export const KFooter: React.FC = () => {
  const { isLoggedIn, signOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <div className="app-wrapper">
        <div className="footer">
          <div className="footer-content">
            <img src={logo} className="logo" alt="Logo" />

            <div className="address">
              <div className="row">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:csf.admin@e-uvt.ro">csf.admin@e-uvt.ro</a>
              </div>
              <div className="row">
                <FontAwesomeIcon icon={faEnvelope} />
                <a href="mailto:dialogues.francophones@e-uvt.ro">dialogues.francophones@e-uvt.ro</a>
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

          {/* AICI, ÎN AFARA lui footer-content */}
          <div className="footer-made-by" onClick={showModal}>
            Site realizat de studenții din cadrul Facultății de Informatică -
            UVT
          </div>
        </div>

        <div className="stamp">
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
      </div>

      <Modal
        title="Studenții implicați în dezvoltarea site-ului Centrului de Studii Francofone"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Închide"
        cancelButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '2rem',
            marginBottom: '1rem',
          }}>
          <div>
            <center>
              <b>
                <div>2023 - 2024</div>
              </b>
            </center>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>- Alesia Lobonț</li>
              <li>- Diana Sîrbu</li>
              <li>- Gabriela Butnaru</li>
            </ul>
          </div>
          <div>
            <center>
              <b>
                <div>2024 - 2025</div>
              </b>
            </center>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>- Iosif-Alexandru Nagy</li>
              <li>- Ana-Maria-Iasmina Gușcă</li>
              <li>- Erwin Kirichner</li>
              <li>- Andreea Laza</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#004992',
            fontWeight: '500',
          }}>
          Coordonat de Conf. Dr. Flavia Micota
        </div>
      </Modal>
    </>
  );
};
