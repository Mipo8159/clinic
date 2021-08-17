import { Clinic, Vote } from '../../../Types';
import Like from '../../icons/like.svg';
import CardPercentage from './CardPercentage';
import Axios from 'axios';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

const CategoryCard: React.FC<{ clinic: Clinic; revalidate?: any }> = ({
  clinic,
  revalidate,
}) => {
  const sendVote = async (e, value: number, id: number) => {
    e.preventDefault();

    try {
      await Axios.post('/vote', { id, value });
      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const [myIp, setMyIp] = useState();

  useEffect(() => {
    Axios.get('/vote').then((res) => setMyIp(res.data));
  }, [clinic]);

  const match = clinic.votes.filter((v) => v.ip_address === myIp)[0];

  return (
    <div className='card__div col-xxl-3 col-lg-4 col-sm-6 col-12 mb-4'>
      <div className='main_all_layer'>
        <div className='code__1'>
          {/* LOGO  */}
          <div className='main-item-img'>
            <img src={clinic.logoUrl} alt='image' />
          </div>

          {/* RATE  */}
          <div className='main-item-stars_div'>
            <img
              src={
                clinic.star
                  ? `/img/rate/rate-${clinic.star}.svg`
                  : `/img/rate/rate-1.svg`
              }
            />
          </div>

          {/* TEXT */}
          <div className='main-item-time-div'>
            <div className='main-date-time'>
              <p>{clinic.user.clinicName}</p>
            </div>
          </div>

          {/* LIKE / DISLIKE */}
          <div className='star-ratings'>
            <div className='item-like-div'>
              <div
                className={classNames('like-div thumb', {
                  active: match && match.value === 1,
                })}
                onClick={(e) => sendVote(e, 1, clinic.id)}
              >
                <Like />
                <p>{clinic.likesCount}</p>
              </div>

              <div
                className={classNames('dislike-div thumb', {
                  active: match && match.value === -1,
                })}
                onClick={(e) => sendVote(e, -1, clinic.id)}
              >
                <Like />

                <p>{clinic.dislikesCount}</p>
              </div>
            </div>
          </div>
        </div>

        <CardPercentage
          clinicName={clinic.user.clinicName}
          id={clinic.id}
          safety={clinic.safety}
          availability={clinic.availability}
          transparency={clinic.transparency}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
