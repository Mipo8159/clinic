import { useRouter } from 'next/router';
import { useState } from 'react';
import Axios from 'axios';
import AdminNav from '../../../components/admin/AdminNav';
import { CKEditor } from 'ckeditor4-react';
import classNames from 'classnames';
import useSWR from 'swr';
import { Page } from '../../../../Types';
import Parser from 'html-react-parser';

const CustomPage = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const [bodyData, setBodyData] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const { data: page, revalidate } = useSWR<Page>(
    `/page/${router.query.id}`
  );

  const updatePage = async (e, id: any) => {
    e.preventDefault();

    alert(id);
    const body = JSON.stringify(bodyData);

    try {
      await Axios.post(`/standart/${id}`, { title, body });
      revalidate();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div
        className={classNames('container admin-partners-container', {
          'admin-reshufle-cat': menu == true,
        })}
      >
        <AdminNav menu={menu} setMenu={setMenu} />

        <div className='my-5 main-text-div'>
          {page && (
            <div className='py-4 text-div-page'>
              <h1 className='mb-5 text-center d-block'>{page.title}</h1>
              <div>{Parser(JSON.parse(page.body))}</div>
            </div>
          )}
        </div>

        {page && (
          <form
            className='p-3 mb-5 admin-parners-form admin-standards-grid-item'
            onSubmit={(e) => updatePage(e, router.query.id)}
          >
            <h2 className='my-5 text-center d-block admin-text'>
              ინფორმაციის განახლება
            </h2>
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
                defaultValue={page.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <CKEditor
              onChange={(e) => setBodyData(e.editor.getData())}
              initData={Parser(JSON.parse(page.body))}
              onInstanceReady={() => {}}
            />

            <button
              type='submit'
              className='px-4 py-1 mt-4 w-25 admin-form-control-button clinic-fira'
            >
              დამატება
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default CustomPage;
