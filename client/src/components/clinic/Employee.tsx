import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface EmployeeProps {
  firstname: string;
  lastname: string;
  profession: string;
  imageUrn?: string;
  uuid: string;
}

const Employee: React.FC<{ data: EmployeeProps; revalidate: any }> = ({
  data: { firstname, lastname, profession, imageUrn, uuid },
  revalidate,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>();

  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [prof, setProf] = useState<string>();

  // EDITTING EMPLOYEE PHOTO
  const reupload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'emp');
    try {
      await axios.post(`employee/upload/${uuid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  // EDITTING EMPLOYEE INFO
  const editname = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/employee/edit/${uuid}`, { name, surname, prof });
      setShowEdit(false);
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  // REMOVING EMPLOYEE
  const remove = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/employee/delete/${uuid}`);
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='slider-card clinic-emp position-relative'>
      <div className='reupload-div'>
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/${imageUrn}`}
          alt='photo'
          layout='fill'
        />
        <input type='file' onChange={reupload} className='reupload' />
        <div className='emp-icon'>
          <i className='fas fa-camera fa-lg'></i>
        </div>
      </div>

      {showEdit ? (
        <form
          onSubmit={editname}
          className='position-relative d-flex flex-column justify-content-center'
        >
          <input
            type='text'
            defaultValue={firstname}
            className='mb-1 emp-edition'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            defaultValue={lastname}
            className='mb-1 emp-edition'
            onChange={(e) => setSurname(e.target.value)}
          />

          <input
            type='text'
            defaultValue={profession}
            className='mb-2 text-secondary text-uppercase emp-edition'
            onChange={(e) => setProf(e.target.value)}
          />

          <button
            type='submit'
            className='py-1 sendedit send-emp-card d-flex align-items-center justify-content-center'
          >
            რედაქტირება{' '}
            <i className='ml-2 far fa-check-circle text-success fa-lg'></i>
          </button>
        </form>
      ) : (
        <div className='mr-2'>
          <h5>
            {firstname} {lastname}
          </h5>

          <h5 className='text-secondary text-uppercase'>{profession}</h5>

          <i
            className='pb-2 far fa-edit text-danger edit-emp-card fa-lg'
            onClick={() => setShowEdit(true)}
          ></i>
        </div>
      )}

      <i
        className='fas fa-user-times fa-lg remove-emp-card'
        onClick={remove}
      ></i>
    </div>
  );
};

export default Employee;
