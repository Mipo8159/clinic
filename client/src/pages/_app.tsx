import '../styles/style.scss';
import type { AppProps } from 'next/app';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Axios from 'axios';
import { Provider } from '../context/Store';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const authRoutes = [
    '/admin',
    '/admin/partners',
    '/admin/standarts',
    '/clinic/admin-panel',
    '/admin/categories',
    '/admin/banners',
    '/admin/subscriptions',
    '/admin/pages',
    '/admin/mails',
  ];
  const authRoute = authRoutes.includes(router.pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await Axios.get(url);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <SWRConfig value={{ fetcher, dedupingInterval: 10000 }}>
      <Provider>
        <div className='main-container'>
          {!authRoute && <Nav />}
          <Component {...pageProps} />
        </div>
        {!authRoute && <Footer />}
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
