interface Percents {
  safety: number;
  availability: number;
  transparency: number;
}

const PercentageBar: React.FC<Percents> = ({
  availability,
  safety,
  transparency,
}) => {
  return (
    <div className='about-clinic-ratebar-div'>
      <li className='main-rating-bar rate_main-rating-bar'>
        <h6 className='text-secondary'>გამჭვირვალობა</h6>

        <div className='rating-bar'>
          <div className={`rate-${transparency}`}>
            <span className='animate bar-linear'></span>
          </div>
        </div>

        <p className='rating-percentage percent_1'>
          {transparency ? transparency + '%' : '-'}
        </p>
      </li>

      <li className='main-rating-bar rate_main-rating-bar'>
        <h6 className='text-secondary'>ხელმისაწვდომობა</h6>

        <div className='rating-bar'>
          <div className={`rate-${availability}`}>
            <span className='animate bar-linear'></span>
          </div>
        </div>

        <p className='rating-percentage percent_2'>
          {availability ? availability + '%' : '-'}
        </p>
      </li>

      <li className='main-rating-bar rate_main-rating-bar'>
        <h6 className='text-secondary'>უსაფრთხოება</h6>

        <div className='rating-bar'>
          <div className={`rate-${safety}`}>
            <span className='animate bar-linear'></span>
          </div>
        </div>

        <p
          className='rating-percentage percent_3'
          style={{ paddingTop: '18px' }}
        >
          {safety ? safety + '%' : '-'}
        </p>
      </li>
    </div>
  );
};

export default PercentageBar;
