import { useState, useEffect } from 'react';
import AdminNav from '../../components/admin/AdminNav';
import axios from 'axios';
import { makeid } from '../../utils/makeId';
import useSWR from 'swr';
import { Partner } from '../../../Types';
import PartnerCard from '../../components/admin/PartnerCard';
import { GetServerSideProps } from 'next';
import classNames from 'classnames';

const partners = () => {
  const [menu, setMenu] = useState(false);
  const { data, revalidate } = useSWR<Partner>('/partner/getMany');

  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    axios.get('/partner/getlinks').then((res) => {
      setLinks(res.data);
    });
  }, []);

  const [linkName, setLinkName] = useState('');
  const [linkLocation, setLinkLocation] = useState('');

  const initialState = {
    firstname: '',
    lastname: '',
    description: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { firstname, lastname, description } = userData;

  const [errors, setErrors] = useState<any>({});

  const [img, setImg] = useState<File>();
  const [preview, setPreview] = useState<string>();

  // HANDLING CHANGE
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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

  // CREATE PARTNER
  const uploadPartner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', img);
    formData.append('type', 'partner');

    const uuid = makeid(15);

    let errors: any = [];
    if (firstname === '') errors.firstname = 'შეიყვანეთ პარტნიორის სახელი';
    if (lastname === '') errors.lastname = 'შეიყვანეთ პარტნიორის გვარი';
    if (description === '') errors.profession = 'მიუთითეთ ინფორმაცია';
    if (!img) errors.img = 'გთხოვთ დაურთოთ თანამშრომლის სურათი';
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    try {
      await axios.post('/partner/createPartner', { ...userData, uuid });

      await axios.post(`/partner/addImage/${uuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImg(null);
      setUserData(initialState);
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  // ADD ORGANIZATION LINK
  const addOrgLink = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/partner/addorglink', {
        linkName,
        linkLocation,
      });
      setLinkLocation('');
      setLinkName('');

      setLinks([...links, res.data]);
    } catch (err) {
      console.log(err.message);
    }
  };

  //DELETE ORGANIZATION LINK
  const removeLink = async (e, uuid) => {
    e.preventDefault();

    try {
      await axios.delete(`/partner/deleteLink/${uuid}`);

      const newData = links.filter((item) => {
        return item.uuid !== uuid;
      });
      setLinks(newData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className={classNames('container admin-partners-container', {
        'admin-reshuffle-partners': menu === true,
      })}
    >
      <AdminNav menu={menu} setMenu={setMenu} />

      <div className='m-auto text-center col-12'>
        <h2 className='my-5 clinic-nino text-uppercase'>პარტნიორები</h2>
      </div>

      <div className='row shuffle-m-row'>
        <div className='col-lg-7 col-12 shuffle-m-div'>
          <h5 className='mt-3 admin-text'>დამატებული ბმულები</h5>
          <div className='px-4 py-2 mb-3 border admin-standards-grid-item'>
            {links &&
              links.map((link, idx) => (
                <div
                  className='py-2 d-flex justify-content-between'
                  key={idx}
                >
                  <a href={link.organizationLink} target='_blank'>
                    {link.organizationLinkName}
                  </a>

                  <i
                    className='fas fa-times-circle text-danger removelink'
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => removeLink(e, link.uuid)}
                  ></i>
                </div>
              ))}
          </div>

          <div className='flex-wrap px-3 py-3 mt-5 border d-flex justify-content-evenly align-items-center admin-standards-grid-item'>
            {data &&
              data.map((item, idx) => (
                <div
                  className='my-3 admin-partner-card_div w-50'
                  key={idx}
                >
                  <PartnerCard data={item} revalidate={revalidate} />
                </div>
              ))}
          </div>
        </div>

        {/* BLANK SPACE */}
        <div className='col-2 admin-blank-remove' />

        <div className='mt-4 col-lg-4 col-xl-3 col-12'>
          {/* ADD LINK */}
          <form
            className='p-3 mb-5 admin-parners-form'
            onSubmit={addOrgLink}
          >
            <h5 className='mb-4 form-label admin-text'>ბმულის დამატება</h5>

            <div className='mb-3'>
              <label
                htmlFor='exampleInputEmail1'
                className='form-label clinic-fira'
                style={{ fontSize: '14px' }}
              >
                ბმულის სახელი
              </label>
              <input
                type='text'
                className='form-control admin-form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                onChange={(e) => setLinkName(e.target.value)}
                value={linkName}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='exampleInputEmail2'
                className='form-label clinic-fira'
                style={{ fontSize: '14px' }}
              >
                ბმულის მისამართი (ლინკი)
              </label>
              <input
                type='text'
                className='form-control admin-form-control'
                id='exampleInputEmail2'
                aria-describedby='emailHelp'
                onChange={(e) => setLinkLocation(e.target.value)}
                value={linkLocation}
              />
            </div>

            <button
              type='submit'
              className='px-4 py-1 mt-2 admin-form-control-button clinic-fira'
            >
              დამატება
            </button>
          </form>

          {/* ADD PARTNER */}
          <div className='form-group clinic-description'>
            <h5 className='clinic-nino'>დაამატე პარტნიორი</h5>

            <form
              className='p-3 admin-parners-form'
              onSubmit={uploadPartner}
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
                <small className='text-danger'>{/* {errors.img} */}</small>
              </div>

              <div className='admin-form-control-div'>
                {/* firstname */}
                <div className='mb-3'>
                  <small className='text-danger'>{errors.firstname}</small>
                  <input
                    type='text'
                    className='form-control admin-form-control'
                    id='firstname'
                    aria-describedby='emailHelp'
                    onChange={handleChange}
                    value={firstname}
                    name='firstname'
                    placeholder='თანამშრომლის სახელი'
                  />
                </div>

                {/* Surname */}
                <div className='mb-3'>
                  <small className='text-danger'>{errors.lastname}</small>
                  <input
                    type='text'
                    className='form-control admin-form-control'
                    id='surname'
                    aria-describedby='emailHelp'
                    onChange={handleChange}
                    value={lastname}
                    name='lastname'
                    placeholder='თანამშრომლის გვარი'
                  />
                </div>

                {/* description */}
                <div className='mb-2'>
                  <small className='text-danger'>
                    {errors.profession}
                  </small>
                  <textarea
                    rows={5}
                    className='form-control admin-form-control'
                    id='description'
                    aria-describedby='emailHelp'
                    onChange={handleChange}
                    value={description}
                    name='description'
                    placeholder='თანამშრომლის პროფესია'
                  />
                </div>
              </div>

              <button
                type='submit'
                className='px-4 py-1 mt-3 admin-form-control-button clinic-fira w-100'
              >
                დამატება
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default partners;

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
