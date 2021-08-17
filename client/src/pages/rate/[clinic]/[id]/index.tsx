import Like from '../../../../icons/like.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import PercentageBar from '../../../../components/PercentageBar';
import { Category, Clinic } from '../../../../../Types';
import CategoryCard from '../../../../components/category/CategoryCard';
import Parser from 'html-react-parser';
import Facebook from '../../../../components/Facebook';
import classNames from 'classnames';

const Rate = () => {
  const [tempLike, setTempLike] = useState<Clinic>();

  const router = useRouter();

  const { data: clinic } = useSWR<Clinic>(
    `/clinic/clinic_name/${router.query.id}`
  );

  const { data: categories, revalidate } =
    useSWR<Category[]>('/categories');

  let settings = {
    lazyLoad: 'ondemand',
    arrows: true,
    dots: true,
    slidesToShow:
      clinic && clinic.employees && clinic.employees.length > 0
        ? clinic.employees.length
        : 2,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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

  const sendVote = async (e, value: number, id: number) => {
    e.preventDefault();

    try {
      await Axios.post('/vote', { id, value });
      const { data } = await Axios.get<Clinic>(
        `/clinic/clinic_name/${router.query.id}`
      );
      setTempLike(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [myIp, setMyIp] = useState();

  useEffect(() => {
    Axios.get('/vote').then((res) => setMyIp(res.data));
  }, [clinic]);

  let match;
  if (clinic && clinic.votes) {
    match = clinic.votes.filter((v) => v.ip_address === myIp)[0];
  }
  let tempMatch;
  if (tempLike && tempLike.votes) {
    match = tempLike.votes.filter((v) => v.ip_address === myIp)[0];
  }

  return (
    <>
      {clinic && categories && (
        <div className='container-fluid main-rate-div'>
          <Head>
            <title>{clinic.user.clinicName}</title>
          </Head>

          <div className='row'>
            <div className='col-12 col-xl-6 main__rate__'>
              <h1 className='title__'>
                {clinic && clinic.user && clinic.user.clinicName}
              </h1>

              <div className='clinic__feedback'>
                <p className='pb-2'>შეაფასეთ სამედიცინო დაწესებულება</p>
              </div>

              <div className='home__feedback'>
                <div className='some__feedback'>
                  <div className='feedback__child'>
                    <img src='/img/coop/witness.svg' alt='' />
                  </div>
                  გამჭვირვალობა
                </div>

                <div className='some__feedback'>
                  <div className='feedback__child'>
                    <img src='/img/coop/hend.svg' alt='' />
                  </div>
                  ხელმისაწვდომობა
                </div>

                <div className='some__feedback for__top'>
                  <div className='feedback__child'>
                    <img src='/img/coop/security.svg' alt='' />
                  </div>
                  უსაფრთხოება
                </div>
              </div>

              <div className='share__experience'>
                <p>გაგვიზიარეთ თქვენი პირადი გამოცდილება:</p>
                <p>- დაწესებულების დასახელება, მისამართი</p>
                <p>- შეფასების დასაბუთება (ტექსტი, სურათი, ვიდეო)</p>
                <p>- პერიოდი (ბოლო 24 თვე)</p>
                <p>
                  თქვენს მიერ შეფასებული/შეთავაზებული სამედიცინო
                  დაწესებულება იქნება შეტანილი "დაწესებულებების შეფასების
                  სიაში" 24 საათში!
                </p>
                <p>ძალა თქვენს ხელშია!</p>
              </div>

              <div className='clinic__feedback'>
                <p className='pb-2'>დაწერე კომენტარი</p>
              </div>

              <Facebook id={router.query.id} />
            </div>

            <div className='col-12 col-xl-6'>
              <div className='about-clinic'>
                <div className='about-clinic-section_1'>
                  <div className='clinic-logo-div'>
                    <img src={clinic.logoUrl} alt='logo' />
                  </div>

                  <div className='clinic-photo-div'>
                    <img src={clinic.imageUrl} alt='photo' />
                  </div>
                </div>

                <div className='about-clinic-section_2 clinic-text-div'>
                  <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
                    კლინიკის შესახებ
                  </h2>

                  <div
                    className='about-clinic-text'
                    style={{ height: '275px', paddingRight: '25px' }}
                  >
                    <p>
                      {clinic &&
                        Parser(
                          clinic.description
                            ? JSON.parse(clinic.description)
                            : ''
                        )}
                    </p>
                  </div>
                </div>

                <div className='workers-slider'>
                  <Slider {...settings} className='slider'>
                    {clinic &&
                      clinic.employees &&
                      clinic.employees.map((emp) => (
                        <div key={emp.id} className='slider-card'>
                          <div className='emp-img'>
                            <img src={emp.imageUrl} alt={emp.firstname} />
                          </div>

                          <h6>
                            {emp.firstname} {emp.lastname}
                          </h6>

                          <p>{emp.profession}</p>
                        </div>
                      ))}
                  </Slider>
                </div>

                <div className='about-clinic-section_4'>
                  {/* USER VOTING */}
                  <div className='about-clinic-like-div'>
                    <h3>მომხმარებლის შეფასება</h3>
                    {clinic && (
                      <div className='item-like-div'>
                        <div
                          className={classNames('like-div thumb', {
                            active: tempMatch
                              ? tempMatch.value === 1
                              : match && match.value === 1,
                          })}
                          onClick={(e) => sendVote(e, 1, clinic.id)}
                        >
                          <Like />
                          <p>
                            {tempLike
                              ? tempLike.likesCount
                              : clinic.likesCount}
                          </p>
                        </div>

                        <div
                          className={classNames('dislike-div thumb', {
                            active: tempMatch
                              ? tempMatch.value === -1
                              : match && match.value === -1,
                          })}
                          onClick={(e) => sendVote(e, -1, clinic.id)}
                        >
                          <Like />
                          <p>
                            {tempLike
                              ? tempLike.dislikesCount
                              : clinic.dislikesCount}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PERCENTAGE RATING BAR */}
                  <PercentageBar
                    safety={clinic.safety}
                    availability={clinic.availability}
                    transparency={clinic.transparency}
                  />

                  {/* GRADE */}
                  <div className='about-clinic-ratephoto-div'>
                    <div className='about-clinic-ratephoto-img'>
                      <img
                        src={
                          clinic.star
                            ? `/img/rate/rate-${clinic.star}.svg`
                            : `/img/rate/rate-1.svg`
                        }
                        alt='rate'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY NUMBER 1 */}
              {categories &&
                categories.map((category) => {
                  if (category.clinics.length > 0) {
                    return (
                      <div
                        key={category.title}
                        className='rate-item-cards'
                      >
                        <div className='col-12 main-item-title'>
                          <p>{category.title}</p>
                        </div>

                        <div className='rate-flex-div-cards'>
                          {category.clinics.slice(0, 2).map((clinic) => (
                            <CategoryCard
                              key={clinic.id}
                              clinic={clinic}
                              revalidate={revalidate}
                            />
                          ))}
                        </div>

                        <div className='main-more-btn-div'>
                          <Link
                            href={`/category/${category.title}/${category.uuid}`}
                          >
                            <a className='dark-grey-bg main-more-btn'>
                              <p>მაჩვენე მეტი</p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rate;
