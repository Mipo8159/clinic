import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Axios from 'axios';
import AdminNav from '../../components/admin/AdminNav';
import { CKEditor } from 'ckeditor4-react';
import classNames from 'classnames';
import useSWR from 'swr';
import { Page } from '../../../Types';
import Link from 'next/link';
import { slugify } from '../../utils/slugify';

const Pages = () => {
  const [menu, setMenu] = useState(false);
  const [bodyData, setBodyData] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const { data: pages, revalidate } = useSWR<Page[]>('/page');

  const submitPage = async (e) => {
    e.preventDefault();

    const body = JSON.stringify(bodyData);

    try {
      setTitle('');
      setBodyData('');
      await Axios.post('/page', { title, body });

      revalidate();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const deletePage = async (e, id: number) => {
    e.preventDefault();

    try {
      await Axios.delete(`/page/${id}`);
      setTitle('');
      setBodyData('');
      revalidate();
    } catch (err) {
      console.log(err.response.data);
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
        <div className='col-lg-8 col-12 admin-cat-shuffle-div'>
          <h5 className='mb-4 text-center admin-text text-sm-left'>
            გვერდის დამატება
          </h5>

          <form
            className='p-3 mb-5 admin-parners-form admin-standards-grid-item'
            onSubmit={submitPage}
          >
            <div className='mb-3'>
              <label
                htmlFor='exampleInputEmail1'
                className='form-label clinic-fira'
                style={{ fontSize: '14px' }}
              >
                გვერდის დასახელება
              </label>
              <input
                type='text'
                className='form-control admin-form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <CKEditor
              onChange={(e) => setBodyData(e.editor.getData())}
              initData={bodyData}
              onInstanceReady={() => {}}
            />

            <button
              type='submit'
              className='px-4 py-1 mt-4 w-25 admin-form-control-button clinic-fira'
            >
              დამატება
            </button>
          </form>
        </div>

        <div className='col-1 res-col-remove' />

        <div className='col-lg-4 col-12 admin-cat-shuffle-div'>
          <h5 className='mt-3 mb-4 text-center admin-text text-sm-left mt-lg-0'>
            ყველა გვერდი
          </h5>
          <div className='px-4 py-3 mb-3 border admin-standards-grid-item'>
            {pages &&
              pages.map((page) => (
                <Link href={`/admin/pages/${page.id}`} key={page.id}>
                  <a className='mb-2 d-flex justify-content-between admin-text'>
                    {' '}
                    <p className='h6'>{page.title} </p>
                    <i
                      className='far fa-times-circle text-danger'
                      onClick={(e) => deletePage(e, page.id)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;

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
