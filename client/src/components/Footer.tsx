import { useState } from 'react';
import Axios from 'axios';

import FootIcon from '../icons/plus.svg';
import FbIcon from '../icons/fb.svg';
import TwIcon from '../icons/tw.svg';
import IgIcon from '../icons/ig.svg';

import useSWR from 'swr';
import { Page } from '../../Types';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<{ [key: string]: string }>({});

  const { data: pages } = useSWR<Page[]>('/page');

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('/email', { email });
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <footer>
      <div className='main-container'>
        <div className='container-fluid'>
          <div className='row footer_row'>
            <div className='col-12 col-lg-6'>
              <div className='footer-collapse-div'>
                <h3>საკონტაქტო ინფორმაცია</h3>

                <button
                  aria-label='view'
                  className='collapsed'
                  type='button'
                  data-toggle='collapse'
                  data-target='#footer-1'
                  aria-expanded='false'
                  aria-controls='footer-1'
                >
                  <FootIcon />
                </button>
              </div>

              <div className='footer-line-div responsive'></div>

              <p className='footer-line-text'>
                Get In Touch With Accreditation Georgia Initiative To Learn
                More About Our Work And How You Can Get Involved.
              </p>

              <ul className='collapse' id='footer-1'>
                <li>
                  <a href='tel:+33753902263'>
                    <div className='footer-round gj-flex'>
                      <img src='/img/website-icons/tel.svg' alt='tel' />
                    </div>

                    <p>+33753902263</p>
                  </a>
                </li>

                <li>
                  <a href='mailto:Info@Accreditation.Ge'>
                    <div className='footer-round gj-flex'>
                      <img src='/img/website-icons/email.svg' alt='tel' />
                    </div>

                    <p>Info@Accreditation.Ge</p>
                  </a>
                </li>

                <li>
                  <a href='#'>
                    <div className='footer-round gj-flex'>
                      <img src='/img/website-icons/local.svg' alt='tel' />
                    </div>

                    <p>
                      32, Boulevard De Rochechouart, Paris 75018, France
                    </p>
                  </a>
                </li>
              </ul>

              <div className='footer-logo-div'>
                <img src='/img/logo/footer-logo.svg' alt='logo' />
              </div>
            </div>

            <div className='col-12 col-lg-6'>
              <div className='row'>
                <div className='col-12 col-lg-6 footer-help'>
                  <div className='footer-collapse-div'>
                    <h3>დახმარება</h3>

                    <button
                      aria-label='view'
                      className='collapsed'
                      type='button'
                      data-toggle='collapse'
                      data-target='#footer-2'
                      aria-expanded='false'
                      aria-controls='footer-2'
                    >
                      <FootIcon />
                    </button>
                  </div>

                  <div className='footer-line-div responsive'></div>

                  {/* MAPPED LINKS */}
                  <ol className='collapse' id='footer-2'>
                    {pages &&
                      pages.map((page) => (
                        <li key={page.id}>
                          <Link href={`/pages/${page.id}`}>
                            <a href='#'>{page.title}</a>
                          </Link>
                        </li>
                      ))}
                  </ol>
                </div>

                <div className='col-12 col-lg-6'>
                  <div className='footer-collapse-div'>
                    <h3>სოციალური მედია</h3>

                    <button
                      aria-label='view'
                      className='collapsed'
                      type='button'
                      data-toggle='collapse'
                      data-target='#footer-3'
                      aria-expanded='false'
                      aria-controls='footer-3'
                    >
                      <FootIcon />
                    </button>
                  </div>

                  <div className='footer-line-div responsive'></div>

                  <dl className='collapse' id='footer-3'>
                    <li>
                      <a href='#facebook'>
                        <FbIcon />
                        <p>Facebook</p>
                      </a>
                    </li>

                    <li>
                      <a href='#twitter'>
                        <TwIcon />
                        <p>Twitter</p>
                      </a>
                    </li>

                    <li>
                      <a href='#instagram'>
                        <IgIcon />
                        <p>Instagram</p>
                      </a>
                    </li>
                  </dl>
                </div>

                <div className='col-12 footer-news'>
                  <h3>სიახლის გამოწერა</h3>

                  <label
                    htmlFor='footer-email'
                    className='footer-news-txt'
                  >
                    სიახლეების გამოსაწერად მიუთითეთ თქვენი ელფოსტა
                  </label>

                  <small className='text-danger'>
                    {error.error || error.empty}
                  </small>
                  <form onSubmit={sendEmail} className='mt-2'>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='ჩაწერეთ თქვენი ელფოსტა'
                      type='email'
                      name='footer-email'
                      id='footer-email'
                    />

                    <button aria-label='view' className='gj-flex '>
                      გაგზავნა
                    </button>
                  </form>
                </div>

                <div className='footer-logo-responsive'>
                  <img src='/img/logo/footer-logo.svg' alt='logo' />
                </div>
              </div>
            </div>
          </div>

          <section className='footer-copyright '>
            <div className='footer-lg-line'></div>

            <div className='footer-copyright_div'>
              <p>
                © <span>{new Date().getFullYear()}</span> All Right
                Reserved
              </p>

              <p>
                Created By:{' '}
                <span>
                  <a
                    target='_blank'
                    href='https://beflex.ge/'
                    className='beflex'
                  >
                    BEFLEX
                  </a>
                </span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
