import useSWR from 'swr';
import { Standart } from '../../Types';
import Parser from 'html-react-parser';
import Head from 'next/head';

const Standarts = () => {
  const { data: standart } = useSWR<Standart[]>('/standart');

  return (
    <>
      <Head>
        <title>სტანდარტები</title>
      </Head>
      <h1 className='standards-h1'>სტანდარტები</h1>

      <div className='main-text-div'>
        <div className='text-header'>
          <img src='img/photos/text-photo.png' alt='photo' />

          <p>
            საქართველოს სამედიცინო დაწესებულებების დამოუკიდებელი
            <br />
            შეფასებისა და აკრედიტაციის ინიციატივა
          </p>
        </div>
        {standart && standart[0] && (
          <div className='py-4 text-div'>
            <div>{Parser(JSON.parse(standart[0].standart))}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Standarts;
