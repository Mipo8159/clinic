import { useState } from 'react';
import Axios from 'axios';
import Head from 'next/head';

const Contact = () => {
  const initialState = { name: '', email: '', subject: '', body: '' };
  const [emailData, setEmailData] = useState(initialState);
  const { name, email, subject, body } = emailData;
  const [successMsg, setSuccessMsg] = useState<string>();

  const [message, setMessage] = useState<any>({});

  const sendMail = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('/mails', emailData);
      setSuccessMsg('მეილი გაგზავნილია');
      setEmailData(initialState);
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setEmailData({ ...emailData, [name]: value });
  };

  return (
    <>
      <Head>
        <title>კონტაქტი</title>
      </Head>
      <h1 className='contact-h1'>საკონტაქტო ინფორმაცია</h1>

      <div className='main-contact'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-6 col-12'>
              <h2>მოგვწერეთ</h2>

              <form onSubmit={sendMail} className='form-text'>
                <small className='mb-2 text-danger'>
                  {message.name || message.mailErr}
                </small>

                <small className='mb-2 text-success'>{successMsg}</small>
                <input
                  type='text'
                  placeholder='სახელი'
                  name='name'
                  value={name}
                  onChange={handleChange}
                />

                <small className='mb-2 text-danger'>{message.email}</small>
                <input
                  type='text'
                  placeholder='ელ-ფოსტა'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />

                <small className='mb-2 text-danger'>
                  {message.subject}
                </small>
                <input
                  type='text'
                  placeholder='თემა'
                  name='subject'
                  value={subject}
                  onChange={handleChange}
                />

                <small className='mb-2 text-danger'>{message.body}</small>
                <div className='position-relative'>
                  <textarea
                    placeholder='ტექსტის ადგილი'
                    name='body'
                    value={body}
                    onChange={handleChange}
                    maxLength={200}
                  ></textarea>
                </div>

                <button aria-label='send'>გაგზავნა</button>
              </form>
            </div>

            <div className='col-md-6 col-12 contact-second'>
              <a href='tel:+33(0)753902263' className='contact-link-item'>
                <img
                  src='/img/website-icons/contact-1.svg'
                  alt='contact'
                />

                <p>+ 33 (0) 753902263</p>
              </a>

              <a
                href='france-asf.fr'
                target='_blank'
                className='contact-link-item'
              >
                <img src='img/website-icons/contact-2.svg' alt='contact' />

                <p>france-asf.fr</p>
              </a>

              <h3>სოციალური მედია</h3>

              <div className='social-links'>
                <a target='_blank' href='#Facebook-link'>
                  <img src='img/website-icons/fb.svg' alt='Facebook' />
                </a>

                <a target='_blank' href='#Twitter-link'>
                  <img src='img/website-icons/tw.svg' alt='Twitter' />
                </a>

                <a target='_blank' href='#Instagram-link'>
                  <img src='img/website-icons/ig.svg' alt='Instagram' />
                </a>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12'>
              <div className='contact-text-div'>
                <p>
                  registration number: 404407815, Tbilisi, Georgia) and
                  Accréditation Sans Frontières | 32, Boulevard de
                  Rochechouart, 75018 Paris – France
                </p>
                <br />
                <p>
                  Association d’intérêt général à but humanitaire et non
                  lucratif régie par la loi du 01/07/1901 déclarée à la
                  Préfecture de Police Paris le 18/06/2020 RNA n°
                  W751257030 – Insertion au Journal Officiel du 27/06/2020
                  – Annonce n° 1340 – SIRET n° 88807681700012 – APE n°
                  9499Z
                </p>
                <br />
                <p className='contact-bolder'>
                  ©2021 Accreditation Georgia Initiative is a joint project
                  of the Public Health Institute of Georgia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
