import { useState } from 'react';
import AdminNav from '../../components/admin/AdminNav';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import Axios from 'axios';
import useSWR from 'swr';
import { Category } from '../../../Types';

const categories = () => {
  const [menu, setMenu] = useState(false);
  const [cats, setCats] = useState({});
  const [catName, setCatName] = useState('');
  const { data, revalidate } = useSWR<Category[]>('/categories');

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCats({ ...cats, [name]: value });
  };

  // --. DELETE
  const deleteCat = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('/categories/delete', { ...cats });

      revalidate();
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  // --> CREATE
  const createCat = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('/categories', { title: catName });
      setCatName('');
      revalidate();
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div
      className={classNames('container admin-partners-container', {
        'admin-reshufle-cat': menu == true,
      })}
    >
      <AdminNav menu={menu} setMenu={setMenu} />

      <div className='m-auto text-center col-12'>
        <h2 className='my-5 clinic-nino text-uppercase'>კატეგორიები</h2>
      </div>

      <div className='row res-row-center admin-res-cat-row'>
        <div className='col-1 res-col-remove' />

        <div className='col-lg-5 col-12 admin-cat-shuffle-div'>
          <h5 className='admin-text text-center text-sm-left mb-4'>
            კატეგორიის დამატება
          </h5>
          <form
            className='px-4 py-4 mb-3 border admin-standards-grid-item admin-cat-font'
            onSubmit={createCat}
          >
            <div className='mb-3'>
              <label
                htmlFor='exampleInputEmail1'
                className='form-label mb-3 d-block'
              >
                კატეგორიის დასახელება
              </label>

              <small className='text-danger'>
                {errors && (errors.title || errors.category)}
              </small>
              <input
                type='text'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='mt-2 px-5 py-1 admin-form-control-button admin-cat-form-button clinic-fira'
            >
              დამატება
            </button>
          </form>
        </div>

        <div className='col-1 res-col-remove' />

        <div className='col-lg-5 col-12 admin-cat-shuffle-div'>
          <h5 className='admin-text mb-4 text-center text-sm-left mt-3 mt-lg-0'>
            ყველა კატეგორია
          </h5>
          <div className=' px-4 py-2 mb-3 border admin-standards-grid-item'>
            <form className='py-3' onSubmit={deleteCat}>
              <div className='admin-cat-grid-res mb-3 px-2'>
                {data &&
                  data.map((category, idx) => (
                    <div className='form-check' key={idx}>
                      <input
                        type='checkbox'
                        className='form-check-input check-1'
                        style={{ cursor: 'pointer' }}
                        id={category.title}
                        value={category.uuid}
                        onChange={handleChange}
                        name={category.title}
                      />
                      <label
                        className='form-check-label check-2'
                        style={{ cursor: 'pointer' }}
                        htmlFor={category.title}
                      >
                        {category.title}
                      </label>
                    </div>
                  ))}
              </div>

              <button
                type='submit'
                className='mt-2 px-4 ml-2 py-1 px-5 admin-form-control-button admin-cat-form-button clinic-fira'
              >
                წაშლა
              </button>
              <small className='text-danger'>{errors.delete}</small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default categories;

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
