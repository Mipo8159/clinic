import AcreditCard from '../../components/admin/AcreditCard';
import AdminNav from '../../components/admin/AdminNav';
import classNames from 'classnames';
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Applications = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const fetchData = () => {
    if (router.query.search && router.query.search !== '') {
      return `admin?search=${router.query.search}`;
    } else if (router.query.status && router.query.status !== '') {
      return `admin?status=${router.query.status}`;
    } else {
      return '/admin';
    }
  };

  const { data, revalidate } = useSWR(fetchData);

  return (
    <div
      style={{ position: 'relative' }}
      className={classNames('container admin-container', {
        'admin-reshuffle': menu === true,
      })}
    >
      <Head>
        <title>სამართავი პანელი</title>
      </Head>

      <div className='main-acc-places-title'>
        <h1>აკრედიტაცია </h1>
      </div>

      <AdminNav menu={menu} setMenu={setMenu} />

      <input
        className='admin-search'
        placeholder='Search for the clinic'
        onChange={(e) =>
          e.target.value !== ''
            ? router.push(`?search=${e.target.value.toLowerCase().trim()}`)
            : router.push('/admin')
        }
      />
      <button className='admin-search-button'>
        <i className='fas fa-search'></i>
      </button>

      <div className='d-flex flexible-places'>
        <button
          onClick={() => router.push('/admin')}
          className={`mr-4 places-main ${
            !router.query.status ? 'active' : ''
          }`}
          style={{ height: '150px' }}
        >
          <img
            src='/img/website-icons/amount.svg'
            alt='image'
            style={{
              marginBottom: '-15px',
              height: '50px',
              width: '50px',
            }}
          />
          <p className='mb-0'>
            განცხადებები <span>21</span>
          </p>
        </button>

        <button
          onClick={() => router.push('/admin?status=in_process')}
          className={`mr-4 places-main ${
            router.query.status === 'in_process' ? 'active' : ''
          }`}
          style={{ height: '150px' }}
        >
          <img
            src='/img/website-icons/process.svg'
            alt='image'
            style={{
              marginBottom: '-15px',
              height: '50px',
              width: '50px',
            }}
          />

          <p className='mb-0'>
            პროცესში <span>16</span>
          </p>
        </button>

        <button
          onClick={() => router.push('/admin?status=approved')}
          className={`mr-4 places-main ${
            router.query.status === 'approved' ? 'active' : ''
          }`}
          style={{ height: '150px' }}
        >
          <img
            src='/img/website-icons/insurance.svg'
            alt='image'
            style={{
              marginBottom: '-15px',
              height: '50px',
              width: '50px',
            }}
          />

          <p className='mb-0'>
            აკრედიტებული <span>5</span>
          </p>
        </button>

        <button
          onClick={() => router.push('/admin?status=rejected')}
          className={`places-main ${
            router.query.status === 'rejected' ? 'active' : ''
          }`}
          style={{ height: '150px' }}
        >
          <i className='fas fa-times-circle text-danger fa-lg'></i>

          <p className='mb-0'>
            უარყოფილი <span>5</span>
          </p>
        </button>
      </div>

      <div className='my-1'>
        {data &&
          data.map((card) => (
            <AcreditCard
              key={card.email}
              data={card}
              revalidate={revalidate}
            />
          ))}
      </div>
    </div>
  );
};

export default Applications;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('Missing auth token cookie');

    const { data } = await axios.get('/auth/access', {
      headers: { cookie },
    });

    if (data.role !== 'admin') throw new Error('Not authorized');

    return { props: {} };
  } catch (err) {
    res.writeHead(307, { Location: '/' }).end();
  }
};
