import { useRouter } from 'next/router';
import useSWR from 'swr';

import Parser from 'html-react-parser';
import { Page } from '../../../Types';

const CustomPage = () => {
  const router = useRouter();
  const { data: page } = useSWR<Page>(`/page/${router.query.id}`);

  return (
    <>
      {page && page.title && page.body && (
        <div className='container admin-partners-container'>
          <div className='my-5 main-text-div'>
            <div className='py-4 text-div-page'>
              <h1 className='mb-5 text-center d-block'>{page.title}</h1>
              <div>{Parser(JSON.parse(page.body))}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPage;
