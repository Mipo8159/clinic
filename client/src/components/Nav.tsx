import Link from 'next/link';
import Image from 'next/image';

import FbIcon from '../icons/fb.svg';
import TwIcon from '../icons/tw.svg';
import IgIcon from '../icons/ig.svg';

import Navigation from './Navigation';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Axios from 'axios';
import { isEmpty } from '../utils/validate';
import { useDispatchContext, useStateContext } from '../context/Store';
import { User } from '../../Types';
import { slugify } from '../utils/slugify';

const Nav = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});

  const dispatch = useDispatchContext();
  const { authenticated, loading, user } = useStateContext();
  const router = useRouter();

  const [name, setName] = useState('');
  const [timer, setTimer] = useState(null);
  const [searchRes, setSearchRes] = useState<User[]>([]);

  useEffect(() => {
    const targ = document.querySelector('.modal-backdrop');
    if (authenticated && targ) {
      targ.classList.add('wut');
    } else {
      return;
    }
  }, [authenticated]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const empty = isEmpty({ email, password });
    if (empty) return setErrors(empty);

    if (!empty) {
      try {
        const res = await Axios.post('/auth/login', { email, password });
        dispatch('LOGIN', res.data);

        setEmail('');
        setPassword('');
        setErrors('');

        if (res.data.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/clinic/admin-panel');
        }
      } catch (err) {
        setErrors(err.response.data);
        setPassword('');
      }
    }
  };

  const logout = () => {
    Axios.get('/auth/logout')
      .then(() => dispatch('LOGOUT'))
      .catch((err) => console.log(err));
    router.push('/');
  };

  // SEARCH
  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await Axios.get(`/clinic/${name}`);
          setSearchRes(data);
        } catch (err) {
          console.log(err);
        }
      }, 200)
    );
  };

  useEffect(() => {
    if (name.trim() === '') {
      setSearchRes([]);
      return;
    }
    searchSubs();
  }, [name]);

  return (
    <>
      <nav>
        <Link href='/'>
          <a className='nav-logo-div'>
            <img src='/img/logo/logo.svg' alt='dawda' />
          </a>
        </Link>
        <button
          aria-label='hamburger'
          className='hamburger'
          data-trigger='#hamburger'
          type='button'
        >
          <img src='/img/website-icons/nav-before.svg' alt='' />
        </button>

        <div className='left-0 right-0 nav-search position-relative'>
          <input
            type='text'
            placeholder='&#xF002 მოძებნე კლინიკა ან დაწესებულება'
            onChange={(e) => setName(e.target.value)}
          />
          {searchRes && (
            <div
              className={`search-hover-div ${
                searchRes.length === 0 ? 'no-hover' : ''
              }`}
            >
              {searchRes?.map((user) => (
                <div
                  onClick={() => {
                    router.push(
                      `/rate/${slugify(user.clinicName)}/${user.clinic.id}`
                    );
                  }}
                  key={user.identifier}
                  className='items-center px-4 py-3 d-flex search-hover'
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={user.clinic.imageUrl}
                    alt='sub'
                    height={(8 * 16) / 4}
                    width={(8 * 16) / 4}
                    objectFit='cover'
                    className='rounded-full'
                  />

                  <div className='ml-4 text-sm'>
                    <p className='font-medium'>{user.clinicName} </p>
                    {/* <p className='text-gray-600'>{sub.title}</p> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LANGUAGES */}
        {/* <div className='btn-group navbar-lang'>
          <button
            aria-label='lang'
            type='button'
            className='dropdown-toggle'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <span className='mr-1'>ქარ</span>

            <DownArrow />

            <div className='dropdown-menu'>
              <a className='dropdown-item' href='#'>
                eng
              </a>
              <div className='dropdown-divider'></div>
              <a className='dropdown-item' href='#'>
                rus
              </a>
            </div>
          </button>
        </div> */}

        <div className='navbar-social'>
          <FbIcon />
          <TwIcon />
          <IgIcon />
        </div>

        {!loading &&
          (authenticated ? (
            <button
              aria-label='login'
              className='navbar-login-btn'
              type='button'
              data-toggle='modal'
              data-target='#exampleModal'
            >
              <img src='/img/website-icons/login.svg' alt='' />
              <p>გასვლა</p>
            </button>
          ) : (
            <button
              aria-label='login'
              className='navbar-login-btn'
              data-toggle='modal'
              type='button'
              data-target='#example'
            >
              <img src='/img/website-icons/login.svg' alt='' />
              <p>შესვლა</p>
            </button>
          ))}

        {/* - - - - - MODAL AND OFFSCREEN MATERIAL - - - - -  */}

        {/* LOGOUT MODAL */}
        <div
          className='modal fade login__modal'
          id='exampleModal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'></div>

          <div className='home__modal'>
            <div className='modal__header'>
              <img
                src='/img/coop/modal-logo.svg'
                alt='acreditation'
                className='left__img'
              />
              <img
                src='/img/coop/feedback-logo.svg'
                alt='acreditation'
                className='right__img'
              />
            </div>

            <div className='full__modal'>
              <div className='mt-5 mb-4 top__sign__in'>გსურთ გასვლა?</div>

              <div className='close-div-modal'>
                <button
                  className='close-modal-class close-modal-yes'
                  data-dismiss='modal'
                  onClick={logout}
                >
                  <p>დიახ</p>
                </button>

                <button
                  className='close-modal-class close-modal-no'
                  data-dismiss='modal'
                >
                  <p>არა</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LOGIN MODAL */}
        <div
          className={classNames('modal fade login__modal', {
            wut: authenticated,
          })}
          id='example'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'></div>

          <div className='home__modal'>
            <div className='modal__header'>
              <img
                src='/img/coop/modal-logo.svg'
                alt='acreditation'
                className='left__img'
              />
              <img
                src='/img/coop/feedback-logo.svg'
                alt='acreditation'
                className='right__img'
              />
            </div>

            <div className='full__modal'>
              <div className='mt-5 mb-4 top__sign__in'>
                <img src='/img/coop/login-box-line.svg' alt='' />
                შესვლა
              </div>

              <form className='sign__in__form' onSubmit={onSubmit}>
                <label htmlFor='email__id' className='mb-2 my__label'>
                  <div className='name__label my__label__important'>
                    ჩაწერეთ ელ-ფოსტა <span>*</span>
                  </div>
                </label>
                <small className='name__important my__important'>
                  {errors.email}
                </small>
                <input
                  type='text'
                  placeholder='ელ-ფოსტა'
                  id='email__id'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    errors.email = '';
                  }}
                />

                <label htmlFor='password__id' className='mb-2 my__label'>
                  <div className='name__label my__label__important'>
                    შეიყვანეთ პაროლი <span>*</span>
                  </div>
                </label>
                <small className='name__important my__important'>
                  {errors.password}
                </small>
                <input
                  type='password'
                  placeholder='პაროლი'
                  id='password__id'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    errors.password = '';
                  }}
                />

                <button
                  className='sign__in__btn'
                  // data-dismiss={
                  //   authenticated && Object.keys(errors).length === 0
                  //     ? 'modal'
                  //     : ''
                  // }
                >
                  შესვლა
                </button>
              </form>

              {/* <a
                href='#'
                className='forgot__pass close-btn'
                data-dismiss='modal'
              >
                დაგავიწყდათ პაროლი?
              </a> */}

              <button
                onClick={() => router.push('/register')}
                data-dismiss='modal'
                className='my__sign__up__btn'
                style={{ border: 'none' }}
              >
                რეგისტრაცია
              </button>
            </div>
          </div>
        </div>

        <b
          className={classNames('screen-overlay', {
            wut: authenticated,
          })}
        ></b>

        {/* NAVIGATION */}
        {router.pathname === '/register' ? (
          <div className='sign__up__head'>რეგისტრაცია</div>
        ) : (
          <Navigation />
        )}
      </nav>
    </>
  );
};

export default Nav;
