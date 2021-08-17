import useSWR from 'swr';
import { Link, Partner } from '../../Types';
import Head from 'next/head';

const Partners = () => {
  const { data } = useSWR<Partner[]>('/partner/getMany');
  const { data: links } = useSWR<Link[]>('/partner/getLinks');

  return (
    <>
      <Head>
        <title>პარტნიორები</title>
      </Head>

      <h1 className='standards-h1'>პარტნიორები</h1>

      <div className='main-standards-div'>
        <h3>არასამთავრობო ორგანიზაციები</h3>

        <ul>
          {links &&
            links.map((link) => (
              <li>
                <a href={link.organizationLink}>
                  <img
                    className='partners-link-icons'
                    src='img/website-icons/link.svg'
                    alt='link'
                  />
                  <p>{link.organizationLinkName}</p>
                </a>
              </li>
            ))}
        </ul>

        <h4>ექსპერტები</h4>

        <div className='standards-grid'>
          {data &&
            data.map((partner) => (
              <div className='standards-grid-item'>
                <div className='standards-image-div'>
                  <img src={partner.imageUrl} alt='image' />
                </div>

                <h6>
                  {partner.firstname} {partner.lastname}
                </h6>

                <div className='standards-scroll-div'>
                  <div className='standards-description'>
                    <p>{partner.description}</p>
                  </div>
                </div>

                <a href={partner.partnerLink}>
                  <img src='img/website-icons/link.svg' alt='link' />
                  <p>ლინკზე გადასვლა</p>
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Partners;

{
  /* <div className='standards-scroll-div'>
              <div className='standards-description'>
                <p>
                  პროფესორი.
                  <br />
                  მედიცინის დოქტორი.
                  <br />
                  ჯანდაცვის მაგისტრი.
                  <br />
                  დიპლომირებული მედიკოსი.
                </p>
              </div>
            </div> */
}

// <ul>
//   <li>
//     <img
//       src='img/website-icons/round-and-tick.svg'
//       alt='photo'
//     />

//     <p>საზოგადოებრივი ჯანდაცვის ექსპერტი</p>
//   </li>

//   <li>
//     <img
//       src='img/website-icons/round-and-tick.svg'
//       alt='photo'
//     />

//     <p>
//       საზოგადოებრივი ჯანდაცვის ექსპერტიაკრედიტაციის ექსპერტი
//     </p>
//   </li>
// </ul>;
