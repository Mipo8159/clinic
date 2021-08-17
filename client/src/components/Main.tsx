import CategoryCard from './category/CategoryCard';
import useSWR from 'swr';
import { Category } from '../../Types';
import Link from 'next/link';

const Main = () => {
  const { data: categories, revalidate } =
    useSWR<Category[]>('/categories');

  console.log(categories);
  return (
    <>
      {categories &&
        categories.map((category) => {
          if (category.clinics.length > 0) {
            return (
              <div key={category.title} className='container-fluid'>
                <div className='row items-row main_card_row'>
                  <div className='col-12 main-item-title'>
                    <p>{category.title}</p>
                  </div>

                  {category.clinics.slice(0, 4).map((clinic) => (
                    <CategoryCard
                      key={clinic.id}
                      clinic={clinic}
                      revalidate={revalidate}
                    />
                  ))}

                  <div className='col-12'>
                    <Link
                      href={`category/${category.title}/${category.uuid}`}
                    >
                      <a className='dark-grey-bg main-more-btn'>
                        <p>მაჩვენე მეტი</p>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default Main;
