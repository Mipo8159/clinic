import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { createRef, ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import Employee from '../../components/clinic/Employee';
import { makeid } from '../../utils/makeId';
import router from 'next/router';
import { GetServerSideProps } from 'next';
import { Category } from '../../../Types';
import { CKEditor } from 'ckeditor4-react';
import Parser from 'html-react-parser';
import Head from 'next/head';

const Acreditate = () => {
  // - - - - - - - - - - CUSTOM AREA  - - - - - - - - - //
  const { data, revalidate } = useSWR('/clinic/init');
  const { data: categories } = useSWR<Category[]>('/categories');

  const initialState = {
    firstname: '',
    lastname: '',
    profession: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { firstname, lastname, profession } = userData;

  const [errors, setErrors] = useState<any>({});

  const [desc, setDesc] = useState<string>('');

  const fileInputRef = createRef<HTMLInputElement>();

  const [img, setImg] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const [newClinicName, setNewClinicName] = useState<string>('');
  const [showEdit, setShowEdit] = useState<boolean>(false);

  // PREVIEWING IMAGE
  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview(null);
    }
  }, [img]);

  // LOGO AND IMAGE
  const openFileInput = (type: string) => {
    fileInputRef.current.name = type;
    fileInputRef.current.click();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', fileInputRef.current.name);
    try {
      await axios.post('clinic/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  // EMPLOYEE ONCHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    delete errors[name];
  };

  // CREATE EMPLOYEE
  const uploadEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', img);
    formData.append('type', 'emp');

    const uuid = makeid(15);

    let errors: any = [];
    if (firstname === '')
      errors.firstname = 'შეიყვანეთ თანამშრომლის სახელი';
    if (lastname === '') errors.lastname = 'შეიყვანეთ თანამშრომლის გვარი';
    if (profession === '')
      errors.profession = 'მიუთითეთ თანამშრომლის პროფესია';
    if (!img) errors.img = 'გთხოვთ დაურთოთ თანამშრომლის სურათი';
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    try {
      await axios.post('/employee/create', { ...userData, uuid });

      await axios.post(`/employee/upload/${uuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUserData(initialState);
      setImg(null);

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  // DESCRIPTION CHANGE
  const handleDescription = async (e) => {
    e.preventDefault();

    const description = JSON.stringify(desc);

    try {
      await axios.patch('/clinic/description', { description });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  //EDIT CLINIC NAME
  const editName = async (e) => {
    e.preventDefault();

    try {
      await axios.patch('/clinic/editname', { newClinicName });
      setShowEdit(false);
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  //CONDITIONAL STATUS
  const status = () => {
    if (
      data.user.status === 'unknown' ||
      data.user.status === 'in_process'
    ) {
      return 'განხილვის პროცესშია';
    }
    if (data.user.status === 'approved') {
      return 'დადასტურებულია';
    }
    if (data.user.status === 'rejected') {
      return 'უარყოფილია';
    }
  };

  const statusClass = () => {
    if (
      data.user.status === 'unknown' ||
      data.user.status === 'in_process'
    ) {
      return 'alert-warning';
    }
    if (data.user.status === 'approved') {
      return 'alert-success';
    }
    if (data.user.status === 'rejected') {
      return 'alert-danger';
    }
  };

  // SLIDER OPTIONS
  let settings = {
    lazyLoad: 'ondemand',
    arrows: true,
    dots: true,
    slidesToShow:
      data && data.employees.length < 2 ? data.employees.length : 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // ADDING TO CATEGORY
  const addorRemoveCategory = async (e, uuid: string) => {
    try {
      if (e.target.checked === true) {
        await axios.post('/categories/add', { uuid });
        e.target.checked = true;
      } else {
        await axios.post('/categories/remove', { uuid });
        e.target.checked = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // IS IN CATEGORY
  const isInCategory = (uuid: string, id: number) => {
    const current = categories.filter((cat) => {
      return cat.uuid === uuid;
    });

    const includes = current[0].clinics.filter((item) => {
      return item.id === id;
    });

    if (includes.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='mb-5 admin-partners-container'>
      <Head>
        <title>სამართავი პანელი</title>
      </Head>

      {/* Upload button */}
      <input
        type='file'
        hidden={true}
        ref={fileInputRef}
        onChange={uploadImage}
      />

      {data && (
        <div className='py-2 container-fluid main-rate-div'>
          <button
            className='px-4 admin-return-to-main-page'
            onClick={() => router.push('/')}
          >
            <h5 className='pt-2 mr-2 clinic-nino d-flex align-items-center'>
              <i className='mr-3 fas fa-long-arrow-alt-left fa-2x'></i>
              <span className='pt-1'>მთავარ გვერდზე დაბრუნება</span>
            </h5>
          </button>
          <div className='row admin-partners-row-swap'>
            <div className='mt-5 col-12 col-xl-5 main__rate__'>
              {/* clinic name */}
              <h4 className='mb-3 clinic-nino admin-my-clinic-h4'>
                ჩემი კლინიკა
              </h4>

              <div className='mb-4 d-flex clinic-nino '>
                <h5 className='mr-2 pt admin-my-clinic-h5'> სტატუსი: </h5>
                <div className={`py-1 alert ${statusClass()}`}>
                  <p className='pt-1'>{status()}</p>
                </div>
              </div>

              <div className='d-flex align-items-center clinic-name admin-my-clinic-margin'>
                <h4 className='pt-2 mr-2 text-lg admin-my-clinic-second-h4 clinic-nino text-dark d-block'>
                  კლინიკის სახელწოდება:
                </h4>{' '}
                {showEdit ? (
                  <>
                    <form onSubmit={editName} className='editform d-flex'>
                      <input
                        type='text'
                        className='admin-my-after-input'
                        defaultValue={data.user.clinicName}
                        onChange={(e) => setNewClinicName(e.target.value)}
                      />

                      <button
                        type='submit'
                        className='sendedit admin-my-after-button'
                      >
                        <i className='far fa-check-circle text-success fa-2x'></i>
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className='mr-2 text-uppercase admin-my-clinic-name'>
                      {data.user.clinicName}
                    </h4>
                    <i
                      className='pb-2 far fa-edit admin-my-clinic-i editname'
                      onClick={() => setShowEdit(true)}
                    ></i>
                  </>
                )}
              </div>

              {/* ADD EMPLOYEE */}
              <div className='form-group clinic-description admin-my-clinic-add-div'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='clinic-about admin-my-clinic-add'
                >
                  დაამატე თანამშრომელი
                </label>

                <form
                  className='p-3 admin-parners-form'
                  style={{ width: '350px' }}
                  onSubmit={uploadEmployee}
                >
                  {/* image */}
                  <div className='mb-4 d-flex flex-column position-relative'>
                    <img
                      src={
                        preview
                          ? preview
                          : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
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
                          setImg(file);
                          delete errors.img;
                        } else {
                          setImg(null);
                        }
                      }}
                    />
                    <small className='text-danger'>{errors.img}</small>
                  </div>

                  <div className='admmin-form-control-div'>
                    {/* firstname */}
                    <div className='mb-3'>
                      <small className='text-danger'>
                        {errors.firstname}
                      </small>
                      <input
                        type='text'
                        className='form-control admin-form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        onChange={handleChange}
                        value={firstname}
                        name='firstname'
                        placeholder='თანამშრომლის სახელი'
                      />
                    </div>

                    {/* Surname */}
                    <div className='mb-3'>
                      <small className='text-danger'>
                        {errors.lastname}
                      </small>
                      <input
                        type='text'
                        className='form-control admin-form-control'
                        id='exampleInputEmail2'
                        aria-describedby='emailHelp'
                        onChange={handleChange}
                        value={lastname}
                        name='lastname'
                        placeholder='თანამშრომლის გვარი'
                      />
                    </div>

                    {/* Profession */}
                    <div className='mb-2'>
                      <small className='text-danger'>
                        {errors.profession}
                      </small>
                      <input
                        type='text'
                        className='form-control admin-form-control'
                        id='exampleInputEmail3'
                        aria-describedby='emailHelp'
                        onChange={handleChange}
                        value={profession}
                        name='profession'
                        placeholder='თანამშრომლის პროფესია'
                      />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='mt-3 btn btn-primary clinic-fira w-100 admin-form-control-button'
                  >
                    დამატება
                  </button>
                </form>
              </div>

              <div className='mt-5 about-clinic'>
                <h5 className='pt-2 mr-2 text-lg admin-my-clinic-second-h4 clinic-nino text-dark d-block'>
                  მიუთითეთ რომელ კატეგორიას მიეკუთვნება თქვენი კლინიკა
                </h5>

                {categories &&
                  categories.map((cat) => (
                    <div className='form-check' key={cat.uuid}>
                      <input
                        type='checkbox'
                        className='form-check-input check-1'
                        style={{ cursor: 'pointer' }}
                        id={cat.uuid}
                        onChange={(e) => addorRemoveCategory(e, cat.uuid)}
                        name={cat.title}
                        checked={isInCategory(cat.uuid, data.user.id)}
                      />
                      <label
                        className='form-check-label check-2'
                        style={{ cursor: 'pointer' }}
                        htmlFor={cat.uuid}
                      >
                        {cat.title}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            {/* MARGIN START */}
            <div className='col-1' />
            {/* MARGIN END */}

            <div className='col-12 col-xl-6'>
              <div className='about-clinic'>
                <div className='mb-3 about-clinic-section_1'>
                  {/* Logo upload */}
                  <div
                    className='clinic-logo-div'
                    onClick={() => openFileInput('logo')}
                  >
                    <div className='cursor-logo'>
                      <Image
                        src={data.logoUrl}
                        alt={data.logoUrl}
                        width='185px'
                        height='125'
                      />
                      <div className='cursor-logo-layout' />
                    </div>
                  </div>
                  <small className='admin-small'>კლინიკის ლოგო</small>

                  {/* Image upload */}
                  <div
                    className='clinic-photo-div cursor-image'
                    onClick={() => openFileInput('image')}
                  >
                    <Image
                      src={data.imageUrl}
                      alt={data.imageUrl}
                      layout='fill'
                    />
                    <div className='cursor-image-layout' />
                  </div>

                  <div className='admin-my-photo-text'>
                    <small className='admin-small'>კლინიკის სურათი</small>
                  </div>
                </div>

                {/* add description */}
                <div className='form-group clinic-description'>
                  <label
                    htmlFor='exampleFormControlTextarea2'
                    className='clinic-about'
                  >
                    კლინიკის შესახებ
                  </label>

                  <form onSubmit={handleDescription}>
                    <CKEditor
                      onChange={(e) => setDesc(e.editor.getData())}
                      initData={
                        data &&
                        Parser(
                          data.description
                            ? JSON.parse(data.description)
                            : ''
                        )
                      }
                      onInstanceReady={() => {}}
                    />

                    <button
                      type='submit'
                      className='mt-2 admin-my-clinic-info-button clinic-fira'
                    >
                      რედაქტირება
                    </button>
                  </form>
                </div>

                <div className='workers-slider'>
                  <label className='clinic-about'>
                    თანამშრომლების სია
                  </label>

                  <Slider {...settings} className='slider'>
                    {data &&
                      data.employees.map((emp) => (
                        <Employee
                          data={emp}
                          key={emp.imageUrn}
                          revalidate={revalidate}
                        />
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Acreditate;

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

    if (data.role !== 'clinic') {
      throw new Error('Missing auth token cookie');
    }

    return { props: {} };
  } catch (err) {
    res.writeHead(307, { Location: '/' }).end();
  }
};
