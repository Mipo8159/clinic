import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Axios from 'axios';
import AdminNav from '../../components/admin/AdminNav';
import classNames from 'classnames';
import useSWR from 'swr';
import { Email } from '../../../Types';

const standarts = () => {
  const [menu, setMenu] = useState(false);
  const { data: emails, revalidate } = useSWR<Email[]>('/email');

  const deleteSpam = async (e, id: number) => {
    e.preventDefault();

    try {
      await Axios.delete(`/email/${id}`);
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={classNames('container admin-partners-container', {
        'admin-reshufle-cat': menu == true,
      })}
    >
      <AdminNav menu={menu} setMenu={setMenu} />
      <div className='m-auto text-center'>
        <h2 className='my-5 clinic-nino text-uppercase'>გამოწერები</h2>
      </div>

      <div className='row'>
        <div className='col-3'></div>

        <div className='pt-3 border col-6 admin-standards-grid-item'>
          <h5 className='mt-3 mb-4 text-center admin-text text-sm-left mt-lg-0'>
            გამოგზავნილი მეილები
          </h5>

          {emails &&
            emails.map((email) => (
              <div
                key={email.id}
                className='mb-2 d-flex justify-content-between'
              >
                <p className='h6'>{email.email} </p>
                <i
                  className='far fa-times-circle text-danger'
                  onClick={(e) => deleteSpam(e, email.id)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
            ))}
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
};

export default standarts;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('Missing auth token cookie');

    const { data } = await Axios.get('/auth/access', {
      headers: { cookie },
    });

    if (data.role !== 'admin') throw new Error('Not authorized');

    return { props: {} };
  } catch (err) {
    res.writeHead(307, { Location: '/' }).end();
  }
};
