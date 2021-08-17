import axios from 'axios';
import Link from 'next/link';
import { Clinic, ClinicStatus } from '../../../Types';

interface AcreditCardProps {
  clinicName: string;
  email: string;
  identifier: string;
  address: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  status: ClinicStatus;
  clinic: Clinic;
}
const AcrediteCard: React.FC<{
  data: AcreditCardProps;
  revalidate: any;
}> = ({ data, revalidate }) => {
  const rate = async (rate: number, identifier: string) => {
    try {
      await axios.post('/admin/rate', { rate, identifier });
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  const activate = async (identifier: string, status: string) => {
    try {
      await axios.post('/admin/activate', {
        identifier,
        status,
      });
      revalidate();
    } catch (err) {
      console.log(err.message);
    }
  };

  // UPDATE CARD
  const updateCard = async (id: number, choise: string, value: string) => {
    try {
      await axios.post(`/admin/updatecard/${id}`, { [choise]: value });
    } catch (error) {
      console.log(error);
    }
  };

  // COLORS
  const colorize = (value) => {
    if (value < 50) {
      return 'text-danger';
    } else if (value > 50 && value < 80) {
      return 'text-primary';
    } else if (value > 80) {
      return 'text-success';
    }
  };

  return (
    <div className='table-grid border p-2 admin-text rounded align-items-center'>
      <div className='admin-acreditcard admin-grid-img'>
        <img src={data.clinic.logoUrl} alt='logo' />
      </div>

      <div className='w-100 align-middle self-c admin-grid-text'>
        <Link href='/admin/acreditate/inner'>
          <a className='text-secondary text-capitalize text-center'>
            {data.clinicName}
          </a>
        </Link>
      </div>

      <div className='w-100'>
        <div className='d-flex flex-column'>
          <p className='d-flex align-items-center mb-1'>
            <span className='pt-1'>გამჭვირვალობა:</span>
            <input
              type='text'
              defaultValue={data.clinic.transparency || 0}
              onChange={(e) =>
                updateCard(data.clinic.id, 'transparency', e.target.value)
              }
              className={`ml-1 card-rate ${colorize(
                data.clinic.transparency
              )}`}
            />
          </p>

          <p className='d-flex align-items-center mb-1'>
            <span className='pt-1'>უსაფრთხოება:</span>
            <input
              type='text'
              defaultValue={data.clinic.safety || 0}
              onChange={(e) =>
                updateCard(data.clinic.id, 'safety', e.target.value)
              }
              className={`ml-1 card-rate ${colorize(data.clinic.safety)}`}
            />
          </p>

          <p className='d-flex align-items-center'>
            <span className='pt-1'>ხელმისაწვდომობა:</span>
            <input
              type='text'
              defaultValue={data.clinic.availability || 0}
              onChange={(e) =>
                updateCard(data.clinic.id, 'availability', e.target.value)
              }
              className={`ml-1 card-rate ${colorize(
                data.clinic.availability
              )}`}
            />
          </p>
        </div>
      </div>

      <div className='align-middle self-c admin-grid-number mt-3'>
        <h6>საიდენთფიკაციო ნომერი</h6>
        <h6>{data.identifier}</h6>
      </div>

      {/* RATE THE CLINIC */}
      <div className='align-middle text-center self-c admin-grid-rate'>
        <h6>RATE THE CLINIC</h6>

        <div className='ratings d-flex'>
          <span
            className='mr-1 star-touch'
            onClick={() => rate(1, data.identifier)}
          >
            <i
              className={
                data.clinic.star >= 1
                  ? 'fas fa-star fa-lg fill-star'
                  : 'far fa-star fa-lg'
              }
            ></i>
          </span>

          <span
            className='mr-1 star-touch'
            onClick={() => rate(2, data.identifier)}
          >
            <i
              className={
                data.clinic.star >= 2
                  ? 'fas fa-star fa-lg fill-star'
                  : 'far fa-star fa-lg'
              }
            ></i>
          </span>

          <span
            className='mr-1 star-touch'
            onClick={() => rate(3, data.identifier)}
          >
            <i
              className={
                data.clinic.star >= 3
                  ? 'fas fa-star fa-lg fill-star'
                  : 'far fa-star fa-lg'
              }
            ></i>
          </span>

          <span
            className='mr-1 star-touch'
            onClick={() => rate(4, data.identifier)}
          >
            <i
              className={
                data.clinic.star >= 4
                  ? 'fas fa-star fa-lg fill-star'
                  : 'far fa-star fa-lg'
              }
            ></i>
          </span>

          <span
            className='mr-1 star-touch'
            onClick={() => rate(5, data.identifier)}
          >
            <i
              className={
                data.clinic.star >= 5
                  ? 'fas fa-star fa-lg fill-star'
                  : 'far fa-star fa-lg'
              }
            ></i>
          </span>
        </div>
      </div>

      {/* APPROVE OR REJECT */}
      <div className='w-100 mt-1 mr-4 admin-btns align-middle self-c admin-grid-approve'>
        <button
          className={`admin-btn mb-1 ${
            data.status === 'approved' ? 'bg-success' : ''
          }`}
          onClick={() => activate(data.identifier, 'approved')}
        >
          <h6
            className={`pt-1 text-uppercase ${
              data.status === 'approved' ? 'text-white' : ''
            }`}
          >
            <span
              className={
                data.status === 'rejected' ? 'text-secondary' : ''
              }
            >
              {data.status === 'approved' ? 'Approved' : 'Approve'}
            </span>
          </h6>
          {data.status === 'rejected' ||
            (data.status === 'in_process' && (
              <i className='fas fa-check-circle text-success'></i>
            ))}
        </button>

        <button
          className={`admin-btn mb-1 ${
            data.status === 'rejected' ? 'bg-danger' : ''
          }`}
          onClick={() => activate(data.identifier, 'rejected')}
        >
          <h6
            className={`pt-1 text-uppercase ${
              data.status === 'rejected' ? 'text-white' : ''
            }`}
          >
            <span
              className={
                data.status === 'approved' ? 'text-secondary' : ''
              }
            >
              {data.status === 'rejected' ? 'Rejected' : 'Reject'}
            </span>
          </h6>
          {data.status === 'approved' ||
            (data.status === 'in_process' && (
              <i className='fas fa-times-circle text-danger'></i>
            ))}
        </button>
      </div>
    </div>
  );
};

export default AcrediteCard;
