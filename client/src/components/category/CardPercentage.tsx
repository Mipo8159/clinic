import Link from 'next/link';
import slugify from 'slugify';

interface Percents {
  safety: number;
  availability: number;
  transparency: number;
  id: number;
  clinicName: string;
}

const CardPercentage: React.FC<Percents> = ({
  availability,
  safety,
  transparency,
  id,
  clinicName,
}) => {
  return (
    <div className='second-layer'>
      <div className='code__2'>
        <ul className='main-rating-bar_ul'>
          {/* LI  */}

          <li className='main-rating-bar'>
            <div className='rating_bar'>
              <div className='rating-bar'>
                <h6>გამჭვირვალობა</h6>

                <div className={`rate-${transparency}`}>
                  <span className='animate bar-linear'></span>
                </div>
              </div>

              <p className='rating_txt'>{transparency}%</p>
            </div>
          </li>

          <li className='main-rating-bar'>
            <div className='rating_bar'>
              <div className='rating-bar'>
                <h6>ხელმისაწვდომობა</h6>

                <div className={`rate-${availability}`}>
                  <span className='animate bar-linear'></span>
                </div>
              </div>

              <p className='rating_txt'>{availability}%</p>
            </div>
          </li>

          <li className='main-rating-bar'>
            <div className='rating_bar'>
              <div className='rating-bar'>
                <h6>უსაფრთხოება</h6>

                <div className={`rate-${safety}`}>
                  <span className='animate bar-linear'></span>
                </div>
              </div>

              <p className='rating_txt'>{safety}%</p>
            </div>
          </li>

          {/* VIEW MORE */}

          <Link
            href={`/rate/${slugify(clinicName, { locale: 'vi' })}/${id}`}
          >
            <a className='main-item-viewmore'>
              <p>სრულად ნახვა</p>
            </a>
          </Link>
        </ul>
      </div>

      <img
        className='card-photo_arrow'
        src='/img/website-icons/main-arrow.svg'
        alt='icon'
      />
    </div>
  );
};

export default CardPercentage;
