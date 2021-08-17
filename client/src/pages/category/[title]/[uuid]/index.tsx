import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Category } from '../../../../../Types';
import CategoryCard from '../../../../components/category/CategoryCard';
import Head from 'next/head';

const index = () => {
  const router = useRouter();
  const catTitle = router.query.title;
  const uuid = router.query.uuid;

  const { data: category, revalidate } = useSWR<Category>(
      (catTitle && uuid) ?
    `/category/clinic/${uuid}` : null
  );

  // const incLimit = () => {
  //   router.push('?limit=32');
  // };
  return (
    <>
      {category && (
        <div>
          <Head>
            <title>{category.title}</title>
          </Head>
          <h2 className='cat_header'>{catTitle && catTitle}</h2>

          <div className='container-fluid'>
            <div className='row items-row main_card_row'>
              {category.clinics.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  clinic={cat}
                  revalidate={revalidate}
                />
              ))}
            </div>

            {/* <div
              onClick={incLimit}
              className='w-100 text-center py-2 rounded text-white admin-text cat-seemore'
              style={{ cursor: 'pointer' }}
            >
              <h5 className='pt-2'>მეტის ნახვა</h5>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default index;
