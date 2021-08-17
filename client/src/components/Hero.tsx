import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Link from 'next/link';
import RightArrow from '../icons/right-arrow.svg';
import { useStateContext } from '../context/Store';
import router from 'next/router';
import axios from 'axios';

import useSWR from 'swr';
import { Banner } from '../../Types';

const Hero = () => {
  const { authenticated, user } = useStateContext();
  let settings = {
    lazyLoad: 'ondemand',
    arrows: true,
    dots: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { data: banners } = useSWR<Banner[]>('/banner');

  const init = async (e) => {
    e.preventDefault();
    if (user && user.role === 'admin') {
      return router.push('/admin');
    }

    try {
      await axios.get('/clinic/init');
      router.push('/clinic/admin-panel');
    } catch (error) {
      router.push('/_404');
    }
  };

  return (
    <>
      <section className='container-fluid hero-section'>
        <div className='row'>
          <div className='col-xxl-8 col-xl-8 main-slider'>
            <Slider {...settings} className='slider'>
              {banners &&
                banners.map((banner) => (
                  <div className='slider__item' key={banner.uuid}>
                    <a href={banner.bannerLink} target='_blank'>
                      <img
                        src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/${banner.bannerImg}`}
                        alt={banner.bannerLink}
                      />
                    </a>
                  </div>
                ))}
            </Slider>
          </div>

          <div className='responsive-hero col-lg-6 col-md-5'>
            <div className='hero-background'>
              <img
                src='img/rate/rate-5.svg'
                alt='ხუთბალიანი შეფასების სისტემა'
              />

              <p>
                ხუთბალიანი
                <br /> შეფასების სისტემა
              </p>

              <button aria-label='view more'>
                <Link href='/soon'>
                  <p>გაიგეთ მეტი</p>
                </Link>

                <RightArrow />
              </button>
            </div>
          </div>

          <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-7 col-sm-12'>
            <div className='main-side-hero'>
              <div className='row'>
                <div className='col-6 main-side-hero-texts'>
                  <h1>პროფესორ გიორგი ფხაკაძის ინიციატივა</h1>

                  <ul className='main-sidero-tick'>
                    <li>
                      <img
                        src='img/website-icons/purple-checked.svg'
                        alt='tick'
                      />

                      <p>გამჭვირვალობა</p>
                    </li>

                    <li>
                      <img
                        src='img/website-icons/purple-checked.svg'
                        alt='tick'
                      />

                      <p>ხელმისაწვდომობა</p>
                    </li>

                    <li>
                      <img
                        src='img/website-icons/purple-checked.svg'
                        alt='tick'
                      />

                      <p>უსაფრთხოება</p>
                    </li>
                  </ul>

                  <Link href='/soon'>
                    <a>გაიგეთ მეტი</a>
                  </Link>
                </div>

                <div className='col-6 main-sidehero-img'>
                  <img src='img/photos/hero-image.png' alt='img' />
                </div>
              </div>
            </div>

            {authenticated ? (
              <button
                className='text-white main-side-hero-button red-bg gj-flex'
                onClick={init}
                aria-label='add clinic'
              >
                <a>
                  <span className='pt-2'> სამართავი პანელი </span>
                </a>
              </button>
            ) : (
              <Link href='/register' aria-label='add clinic'>
                <a className='text-white main-side-hero-button red-bg gj-flex'>
                  <span className='pt-2'> დაამატე კლინიკა</span>
                  <img
                    className='mt-1'
                    src='img/website-icons/white-plus.svg'
                    alt='icon'
                  />
                </a>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
