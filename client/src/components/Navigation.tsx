import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();

  // useEffect(() => {
  //   $(function () {
  //     var menu = $('.mobile-offcanvas');
  //     var indicator = $('<span class="indicator"></span>');
  //     menu.append(indicator);
  //     position_indicator(menu.find('.nav-item.active'));
  //     setTimeout(function () {
  //       indicator.css('opacity', 1);
  //     }, 500);
  //     menu.find('ol').mouseenter(function () {
  //       position_indicator($(this));
  //     });
  //     menu.find('ol').mouseleave(function () {
  //       position_indicator(menu.find('.nav-item.active'));
  //     });

  //     function position_indicator(ele) {
  //       var left = ele.offset().left - 0;
  //       var width = ele.width();
  //       indicator.stop().animate({
  //         left: left,
  //         width: width,
  //       });
  //     }
  //   });
  // }, []);

  const isLink = (link: string) => {
    if (router.pathname === link) {
      return 'active';
    }
    return '';
  };
  return (
    <div id='hamburger' className='nav-menu mobile-offcanvas'>
      <div className='offcanvas-header'>
        <button aria-label='close' className='btn-close float-end'>
          <img src='/img/website-icons/x.svg' alt='' />
        </button>
      </div>

      {/* NAVIGATION BUTTONS */}
      <ul className='navbar-nav'>
        <ol className={`nav-item ${isLink('/')}`}>
          <Link href='/'>
            <a className='nav-link'>აკრედიტაცია</a>
          </Link>
        </ol>

        {/* NOT NEEDED YET */}
        {/* <ol className='nav-item dropdown'>
          <ul className='dropdown-menu'>
            <li>
              <a className='dropdown-item ' href='#'>
                სტანდარტები <i className='pb-1 ml-1 fas fa-chevron-down fa-sm'></i>
              </a>
              <ul className='submenu dropdown-menu'>
                <li>
                  <a className='dropdown-item' href='#'>
                    ქვე მენიუ 1
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    ქვე მენიუ 2
                  </a>
                </li>

                <li>
                  <a className='dropdown-item' href='#'>
                    ჩამოშლა <i className='pb-1 ml-1 fas fa-chevron-down fa-sm'></i>{' '}
                  </a>
                  <ul className='submenu dropdown-menu'>
                    <li>
                      <a className='dropdown-item' href='#'>
                        სართული 1
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        სართული 2
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a className='dropdown-item' href='#'>
                    ქვე მენიუ 4
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    ქვე მენიუ 5
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </ol> */}

        {/* NOT NEEDED ANYMORE AS ITS DYNAMIC */}
        {/* <ol className={`nav-item ${isLink('/acreditation')}`}>
          <Link href='/acreditation'>
            <a className='nav-link'>აკრედიტებული დაწესებულებები</a>
          </Link>
        </ol> */}

        <ol className={`nav-item ${isLink('/standarts')}`}>
          <Link href='/standarts'>
            <a className='nav-link'>სტანდარტები</a>
          </Link>
        </ol>

        <ol className={`nav-item ${isLink('/partners')}`}>
          <Link href='/partners'>
            <a className='nav-link'>პარტნიორები</a>
          </Link>
        </ol>

        <ol className={`nav-item ${isLink('/contact')}`}>
          <Link href='/contact'>
            <a className='nav-link'>კონტაქტი</a>
          </Link>
        </ol>

        <div className='nav-button-divs'>
          {/* <div
            className='dropdown show nav-button-divs-a'
            role='button'
            id='dropdownMenuLink'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <a className='dropdown-toggle' href='#'>
              ქარ &#xf107;
            </a>
          </div>

          <div
            className='dropdown-menu'
            aria-labelledby='dropdownMenuLink'
          >
            <a className='dropdown-item' href='#1'>
              rus
            </a>
            <a className='dropdown-item' href='#2'>
              eng
            </a>
          </div> */}

          <button
            aria-label='modal'
            data-toggle='modal'
            type='button'
            data-target='#example'
          >
            <img src='/img/website-icons/login.svg' alt='login' /> შესვლა
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navigation;
