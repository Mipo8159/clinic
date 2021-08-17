import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Axios from 'axios';
import AdminNav from '../../components/admin/AdminNav';
import { CKEditor } from 'ckeditor4-react';
import classNames from 'classnames';
import useSWR from 'swr';
import { Standart } from '../../../Types';
import Parser from 'html-react-parser';

const standarts = () => {
  const [menu, setMenu] = useState(false);
  const [editorData, setEditorData] = useState('');

  const { data: standart, revalidate } = useSWR<Standart[]>('/standart');

  const submitStandart = async (e) => {
    e.preventDefault();

    const standart = JSON.stringify(editorData);
    try {
      await Axios.post('/standart', { standart });
      revalidate();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const updateStandart = async (e, id: number) => {
    e.preventDefault();

    const standart = JSON.stringify(editorData);

    try {
      await Axios.patch(`/standart/${id}`, { standart });
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
        <h2 className='my-5 clinic-nino text-uppercase'>სტანდარტები</h2>
      </div>

      <AdminNav menu={menu} setMenu={setMenu} />

      {/* TEXT ON THE EDITOR */}
      <div className='mb-5 row'>
        <div className='mx-auto col-md-12 col-lg-10'>
          <CKEditor
            onChange={(e) => setEditorData(e.editor.getData())}
            initData={
              standart &&
              standart[0] &&
              Parser(JSON.parse(standart[0].standart))
            }
            onInstanceReady={() => {}}
          />

          <button
            onClick={(e) => {
              standart && standart.length > 0
                ? updateStandart(e, standart[0].id)
                : submitStandart(e);
            }}
            type='submit'
            className='px-4 py-1 mt-2 w-25 admin-form-control-button clinic-fira'
          >
            დამატება
          </button>
        </div>
      </div>

      {/* TEXT ON THE SCREEN */}
      {standart && standart[0] && (
        <div className='row'>
          <div className='mx-auto col-md-12 col-lg-10 text-div'>
            <div className='p-4 border rounded'>
              {Parser(JSON.parse(standart[0].standart))}
            </div>
          </div>
        </div>
      )}
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
