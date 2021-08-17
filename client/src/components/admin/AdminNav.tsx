import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const AdminNav = ({ menu, setMenu }) => {
  const router = useRouter();

  const isLink = (link: string) => {
    if (router.pathname === link) {
      return 'admin-active admin-nav-active';
    }
    return '';
  };

  return (
    <div
      className={classNames(
        'admin-nav',
        { 'nav-active': menu === false },
        { 'nav-inactive': menu === true }
      )}
    >
      {menu === true ? (
        <div className='px-5 w-100 d-flex justify-content-end'>
          <button
            className='px-2 py-1 admin-sidebar-btn'
            onClick={() => setMenu(false)}
          >
            <i className='fas fa-arrow-left fa-2x '></i>
          </button>
        </div>
      ) : (
        <div className='px-5 ml-5 w-100 d-flex justify-content-end'>
          <button
            className='px-2 py-1 admin-sidebar-btn'
            onClick={() => setMenu(true)}
          >
            <i className='fas fa-bars fa-2x'></i>
          </button>
        </div>
      )}

      {menu && (
        <>
          <div className='py-5'>
            <Link href='/'>
              <a className='nav-logo-div'>
                <img src='/img/logo/footer-logo.svg' alt='dawda' />
              </a>
            </Link>
          </div>

          <ul className='admin-nav-ul'>
            <li className={`admin-nav-li ${isLink('/admin/banners')}`}>
              <Link href='/admin/banners'>
                <a className='admin-nav-a'>ბანერები</a>
              </Link>
            </li>

            <li className={`admin-nav-li ${isLink('/admin')}`}>
              <Link href='/admin'>
                <a className='admin-nav-a'>აკრედიტაცია</a>
              </Link>
            </li>

            <li className={`admin-nav-li ${isLink('/admin/standarts')}`}>
              <Link href='/admin/standarts'>
                <a className='admin-nav-a'>სტანდარტები</a>
              </Link>
            </li>

            <li className={`admin-nav-li ${isLink('/admin/partners')}`}>
              <Link href='/admin/partners'>
                <a className='admin-nav-a'>პარტნიორები</a>
              </Link>
            </li>

            <li className={`admin-nav-li ${isLink('/admin/categories')}`}>
              <Link href='/admin/categories'>
                <a className='admin-nav-a'>კატეგორიები</a>
              </Link>
            </li>

            <li
              className={`admin-nav-li ${isLink('/admin/subscriptions')}`}
            >
              <Link href='/admin/subscriptions'>
                <a className='admin-nav-a'>გამოწერები</a>
              </Link>
            </li>

            <li className={`admin-nav-li ${isLink('/admin/pages')}`}>
              <Link href='/admin/pages'>
                <a className='admin-nav-a'>გვერდები</a>
              </Link>
            </li>

            <li className={`admin-nav-li ${isLink('/admin/mails')}`}>
              <Link href='/admin/mails'>
                <a className='admin-nav-a'>მეილები</a>
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminNav;
