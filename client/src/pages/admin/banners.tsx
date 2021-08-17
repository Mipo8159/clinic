import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import AdminNav from '../../components/admin/AdminNav';
import Axios from 'axios';
import useSWR from 'swr';
import Image from 'next/image';
import { Banner } from '../../../Types';

const Banners = () => {
  const [menu, setMenu] = useState(false);
  const [bannerLink, setBannerLink] = useState<string>('');
  const [bannerImg, setBannerImg] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [errors, setErrors] = useState<any>({});

  const { data: banners, revalidate } = useSWR<Banner[]>('/banner');

  // PREVIEWING IMAGE
  useEffect(() => {
    if (bannerImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(bannerImg);
    } else {
      setPreview(null);
    }
  }, [bannerImg]);

  const addBanner = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', bannerImg);
    formData.append('type', 'bannerimg');

    let errors: any = [];
    if (bannerLink === '')
      errors.firstname = 'შეიყვანეთ პარტნიორის სახელი';
    if (!bannerImg) errors.img = 'გთხოვთ დაურთოთ თანამშრომლის სურათი';
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    try {
      const res = await Axios.post('/banner', {
        bannerLink,
      });

      await Axios.post(`/banner/${res.data.uuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setBannerImg(null);
      setBannerLink('');
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const removeBanner = async (uuid: string) => {
    try {
      await Axios.delete(`/banner/${uuid}`);

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container admin-partners-container'>
      <AdminNav menu={menu} setMenu={setMenu} />

      <div className='m-auto text-center col-12'>
        <h2 className='my-5 clinic-nino text-uppercase'>პარტნიორები</h2>
      </div>

      <div className='row shuffle-m-row'>
        <div className='col-lg-6 col-12 mt-3 shuffle-m-div'>
          <div className='p-3 mb-5 admin-parners-form'>
            <h5 className='mb-4 form-label admin-text'>
              არსებული ბანერები
            </h5>

            {banners &&
              banners.map((banner) => (
                <div key={banner.uuid} className='mb-5'>
                  <div className='mb-3'>
                    <a className='d-flex mb-1' href={banner.bannerLink}>
                      <img
                        className='partners-link-icons'
                        src='/img/website-icons/link.svg'
                        alt='link'
                      />
                      <h6>{banner.bannerLink}</h6>
                    </a>

                    <div
                      className='position-relative banner-close-hover'
                      style={{ height: '350px' }}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/${banner.bannerImg}`}
                        alt={banner.bannerLink}
                        layout='fill'
                        objectFit='cover'
                      />

                      <div
                        className='banner-close-div'
                        onClick={() => removeBanner(banner.uuid)}
                      >
                        <i className='fas fa-times-circle fa-lg text-danger'></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* BLANK SPACE */}
        <div className='col-1 admin-blank-remove' />

        <div className='mt-3 col-lg-5 col-xl-5 col-12'>
          {/* ADD BANNER */}
          <form
            className='p-3 mb-5 admin-parners-form'
            onSubmit={addBanner}
          >
            <h5 className='mb-4 form-label admin-text'>
              ბანერის დამატება
            </h5>

            <div className='mb-3'>
              <label
                htmlFor='exampleInputEmail1'
                className='form-label clinic-fira'
                style={{ fontSize: '14px' }}
              >
                ბანერის ბმულის მისამართ
              </label>
              <input
                type='text'
                className='form-control admin-form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                onChange={(e) => setBannerLink(e.target.value)}
                value={bannerLink}
              />
            </div>

            {/* image */}
            <div className='mb-4 d-flex flex-column position-relative'>
              <img
                src={
                  preview
                    ? preview
                    : `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/img_placeholder.jpg`
                }
                alt='photo'
                className='border'
              />
              <input
                type='file'
                className='employee-image'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.substr(0, 5) === 'image') {
                    setBannerImg(file);
                    delete errors.img;
                  } else {
                    setBannerImg(null);
                  }
                }}
              />
              <small className='text-danger'>{/* {errors.img} */}</small>
            </div>

            <button
              type='submit'
              className='mt-2 px-4 py-1 admin-form-control-button clinic-fira'
            >
              დამატება
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banners;

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
