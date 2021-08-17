import { ChangeEvent, useState } from 'react';
import { Partner } from '../../../Types';
import Image from 'next/image';
import axios from 'axios';

const PartnerCard: React.FC<{ data: Partner; revalidate: any }> = ({
  data,
  revalidate,
}) => {
  const [addLink, setAddLink] = useState('');
  const [showAddLink, setShowAddLink] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [description, setDescription] = useState('');

  // UPDATE LINK
  const updateLink = async (e, uuid) => {
    e.preventDefault();

    try {
      await axios.post(`/partner/addLink/${uuid}`, { addLink });
      setShowAddLink(false);
      setAddLink('');
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  // DELETE PARTNER
  const deletePartner = async (e, uuid) => {
    e.preventDefault();

    try {
      await axios.delete(`/partner/delete/${uuid}`);
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  // EDIT PARTNER DATA
  const editPartner = async (e, uuid) => {
    e.preventDefault();

    try {
      await axios.put(`/partner/update/${uuid}`, {
        firstname,
        lastname,
        description,
      });

      setShowEdit(false);
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  // EDITTING EMPLOYEE PHOTO
  const reupload = async (
    event: ChangeEvent<HTMLInputElement>,
    uuid: string
  ) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'partner');
    try {
      await axios.post(`/partner/addImage/${uuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='standards-grid-item admin-standards-grid-item '>
      <div
        className='standards-image-div admin-parner-card-div partner-hover'
        style={{ height: '300px' }}
      >
        <Image
          src={data.imageUrl}
          alt='image'
          layout='fill'
          objectFit='cover'
        />

        <div className='icon-div partner-camera position-relative'>
          <i className='fas fa-camera fa-lg'></i>

          <input
            type='file'
            onChange={(e) => reupload(e, data.uuid)}
            className='reupload'
          />
        </div>

        <div
          className='icon-div partner-close'
          onClick={(e) => deletePartner(e, data.uuid)}
        >
          <i className='fas fa-times-circle'></i>
        </div>

        <div
          className='icon-div partner-edit'
          onClick={() => setShowEdit(true)}
        >
          <i className='far fa-edit'></i>
        </div>
      </div>

      <div className='standards-scroll-div d-flex flex-column admin-standards-scroll-div'>
        {!showEdit ? (
          <>
            <h6 className='admin-parner-card-h6'>
              {data.firstname} {data.lastname}
            </h6>

            <div className='standards-description'>
              <p>{data.description}</p>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => editPartner(e, data.uuid)}
            className='px-2 my-3 position-relative d-flex flex-column justify-content-center'
          >
            <input
              type='text'
              defaultValue={data.firstname}
              className='mb-1 emp-edition'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type='text'
              defaultValue={data.lastname}
              className='mb-1 emp-edition'
              onChange={(e) => setLastName(e.target.value)}
            />

            <textarea
              rows={6}
              defaultValue={data.description}
              className='mb-2 text-secondary text-uppercase emp-edition'
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              type='submit'
              className='py-1 sendedit send-emp-card d-flex align-items-center justify-content-center'
            >
              რედაქტირება{' '}
              <i className='ml-2 far fa-check-circle text-success fa-lg'></i>
            </button>
          </form>
        )}

        <div className='d-flex align-self-center align-items-center'>
          {data.partnerLink ? (
            <>
              {!showAddLink && (
                <>
                  <button
                    onClick={() => setShowAddLink(true)}
                    style={{
                      width: '25px',
                      height: '25px',
                      border: 'none',
                      background: 'transparent',
                    }}
                    className='mr-1 d-flex justify-content-center'
                  >
                    <img
                      src='/img/website-icons/link.svg'
                      alt='link'
                      className='pointer'
                    />
                  </button>

                  <a
                    href={data.partnerLink}
                    target='_blank'
                    className='admin-text'
                  >
                    ლინკზე გადასვლა
                  </a>
                  <i
                    className='ml-1 fas fa-angle-double-right text-primary'
                    style={{ paddingBottom: '6px' }}
                  ></i>
                </>
              )}

              {showAddLink && (
                <form
                  onSubmit={(e) => updateLink(e, data.uuid)}
                  className='d-flex'
                >
                  <input
                    type='text'
                    style={{ height: '35px' }}
                    onChange={(e) => setAddLink(e.target.value)}
                    defaultValue={data.partnerLink}
                  />
                  <button
                    type='submit'
                    style={{ height: '35px', width: '35px' }}
                  >
                    <i className='fas fa-plus text-secondary'></i>
                  </button>
                </form>
              )}
            </>
          ) : (
            <>
              {!showAddLink && (
                <div
                  onClick={() => setShowAddLink(true)}
                  className='d-flex'
                >
                  <img
                    src='/img/website-icons/link.svg'
                    alt='link'
                    style={{ cursor: 'pointer' }}
                  />
                  <p
                    className='ml-1 admin-text'
                    style={{ paddingTop: '6px', cursor: 'pointer' }}
                  >
                    ბმულის დამატება
                  </p>
                </div>
              )}

              {showAddLink && (
                <form
                  onSubmit={(e) => updateLink(e, data.uuid)}
                  className='d-flex'
                >
                  <input
                    type='text'
                    style={{ height: '35px' }}
                    onChange={(e) => setAddLink(e.target.value)}
                    defaultValue={data.partnerLink}
                  />
                  <button
                    type='submit'
                    style={{ height: '35px', width: '35px' }}
                  >
                    <i className='fas fa-plus text-secondary'></i>
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
