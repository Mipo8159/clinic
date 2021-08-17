import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Axios from 'axios';
import AdminNav from '../../components/admin/AdminNav';
import classNames from 'classnames';
import useSWR from 'swr';
import { Mail } from '../../../Types';

const Mails = () => {
  const [menu, setMenu] = useState(false);
  const [singleMail, setSingleMail] = useState<Mail>();

  const { data: mails, revalidate } = useSWR<Mail[]>('/mails');

  const deleteMail = async (e, id: number) => {
    e.preventDefault();

    try {
      const res = await Axios.delete(`/mails/${id}`);
      setSingleMail(res.data);
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const findMail = async (e, id: number) => {
    e.preventDefault();

    try {
      const res = await Axios.post('/email/single', { id });
      setSingleMail(res.data);
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
      <div className='m-auto text-center'>
        <h2 className='my-5 clinic-nino text-uppercase'>გვერდები</h2>
      </div>

      <AdminNav menu={menu} setMenu={setMenu} />

      <div className='row res-row-center admin-res-cat-row'>
        <div className='col-lg-6 col-12 admin-cat-shuffle-div'>
          <h5 className='mb-4 text-center admin-text text-sm-left'>
            მეილის ჩვენება
          </h5>

          <div className='p-3 mb-5 admin-parners-form admin-standards-grid-item'>
            <div className='px-3 pt-2 mb-3'>
              <label
                htmlFor='exampleInputEmail1'
                className='form-label admin-text d-flex'
                style={{ fontSize: '16px' }}
              >
                მეილი:{' '}
                <p className='ml-2'>{singleMail && singleMail.email}</p>
              </label>
            </div>

            {singleMail && (
              <div className='px-3 py-2 mb-3'>
                <h5 className='admin-text'>სახელი: {singleMail.name}</h5>
                <h6 className='mb-4 admin-text'>
                  სათაური: {singleMail.subject}
                </h6>
                <p>თემა: {singleMail.body}</p>
              </div>
            )}
          </div>
        </div>

        <div className='col-3 res-col-remove' />

        <div className='col-lg-4 col-12 admin-cat-shuffle-div'>
          <h5 className='mt-3 mb-4 text-center admin-text text-sm-left mt-lg-0'>
            ყველა გამოგზავნილი მეილი
          </h5>
          <div className='px-4 pt-3 pt-4 pb-2 border admin-standards-grid-item'>
            {mails &&
              mails.map((mail) => (
                <div
                  key={mail.id}
                  className='mb-2 d-flex justify-content-between admin-text'
                >
                  <p
                    className='h6 admin-mail-text'
                    onClick={(e) => findMail(e, mail.id)}
                  >
                    <i className='mr-2 far fa-envelope'></i>
                    {mail.email}{' '}
                  </p>
                  <i
                    onClick={(e) => deleteMail(e, mail.id)}
                    className='far fa-times-circle text-danger admin-mail-delete'
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mails;

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
