import useSWR from 'swr';
import { Clinic } from '../../Types';
import { useRouter } from 'next/router';

const InPage = () => {
  const { data } = useSWR<Clinic>('/clinics');

  const router = useRouter();
  console.log(router);

  return (
    <>
      <div className='main-acc-places-title collapsed'>
        <h1>აკრედიტებული დაწესებულებები</h1>

        <p className='mb-4'>
          თუ თქვენი ორგანიზაცია აპირებს, გაიაროს აკრედიტაცია “საქართველოს
          აკრედიტაციის ინიციატივის” ფარგლებში, ჩვენ ამ პროცესში
          დაგეხმარებით.
        </p>
      </div>

      <div className='container-fluid _places'>
        {/* MOBILE VERSION */}
        <div className='row mob-version'>
          {/* Total */}
          <div className='col-xxl-4 col-xl-4 col-12'>
            <div
              className='places-main collapsed'
              data-toggle='collapse'
              data-target='#title-1'
              aria-expanded='false'
              aria-controls='title-1'
            >
              <img src='/img/website-icons/amount.svg' alt='image' />

              <p>
                განცხადებების რაოდენობა <span>21</span>
              </p>
            </div>

            <div className='collapse places-collapse' id='title-1'>
              <div className='places-item'>
                <div className='places-logo-div'>
                  <img
                    src='/img/company-logos/new-hospitals.svg'
                    alt='logo'
                  />
                </div>

                <p>ნიუ ჰოსპიტალსი</p>
              </div>

              <div className='places-item'>
                <div className='places-logo-div'>
                  <img
                    src='/img/company-logos/new-hospitals.svg'
                    alt='logo'
                  />
                </div>

                <p>ნიუ ჰოსპიტალსი</p>
              </div>

              <button
                aria-label='view more'
                className='places-view-more _4responsive'
              >
                <p>მაჩვენე მეტი</p>
              </button>
            </div>
          </div>

          {/* In process */}
          <div className='col-xxl-4 col-xl-4 col-12'>
            <div
              className='places-main collapsed'
              data-toggle='collapse'
              data-target='#title-2'
              aria-expanded='false'
              aria-controls='title-2'
            >
              <img src='/img/website-icons/process.svg' alt='image' />

              <p>
                განხილვის პროცესშია <span>16</span>
              </p>
            </div>

            <div className='collapse places-collapse' id='title-2'>
              <div className='places-item'>
                <div className='places-logo-div'>
                  <img
                    src='/img/company-logos/new-hospitals.svg'
                    alt='logo'
                  />
                </div>

                <p>ნიუ ჰოსპიტალსი</p>
              </div>

              <div className='places-item'>
                <div className='places-logo-div'>
                  <img
                    src='/img/company-logos/new-hospitals.svg'
                    alt='logo'
                  />
                </div>

                <p>ნიუ ჰოსპიტალსი</p>
              </div>

              <button
                aria-label='view more'
                className='places-view-more _4responsive'
              >
                <p>მაჩვენე მეტი</p>
              </button>
            </div>
          </div>

          {/* Acreditated */}
          <div className='col-xxl-4 col-xl-4 col-12'>
            <div
              className='places-main collapsed'
              data-toggle='collapse'
              data-target='#title-3'
              aria-expanded='false'
              aria-controls='title-3'
            >
              <img src='/img/website-icons/insurance.svg' alt='image' />

              <p>
                აკრედიტებულია <span>5</span>
              </p>
            </div>

            <div className='collapse places-collapse' id='title-3'>
              <div className='places-item'>
                <div className='places-logo-div'>
                  <img
                    src='/img/company-logos/new-hospitals.svg'
                    alt='logo'
                  />
                </div>

                <p>ნიუ ჰოსპიტალსი</p>
              </div>

              <div className='places-item'>
                <div className='places-logo-div'>
                  <img
                    src='/img/company-logos/new-hospitals.svg'
                    alt='logo'
                  />
                </div>

                <p>ნიუ ჰოსპიტალსი</p>
              </div>

              <button
                aria-label='view more'
                className='places-view-more _4responsive'
              >
                <p>მაჩვენე მეტი</p>
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP VERSION */}
        <div className='row desk-version'>
          <div className='col-4'>
            <div
              onClick={() => router.push('?status=unknown')}
              className='places-main collapsed'
              data-toggle='collapse'
              data-target='#title-1'
              aria-expanded='false'
              aria-controls='title-1'
              style={{ cursor: 'pointer' }}
            >
              <img src='img/website-icons/amount.svg' alt='image' />

              <p>
                განცხადებების რაოდენობა <span>21</span>
              </p>
            </div>
          </div>

          <div className='col-4'>
            <div
              onClick={() => router.push('?status=unknown')}
              className='places-main collapsed'
              data-toggle='collapse'
              data-target='#title-2'
              aria-expanded='false'
              aria-controls='title-2'
              style={{ cursor: 'pointer' }}
            >
              <img src='img/website-icons/process.svg' alt='image' />

              <p>
                განხილვის პროცესშია <span>16</span>
              </p>
            </div>
          </div>

          <div className='col-4'>
            <div
              onClick={() => router.push('?status=unknown')}
              className='places-main collapsed'
              data-toggle='collapse'
              data-target='#title-3'
              aria-expanded='false'
              aria-controls='title-3'
              style={{ cursor: 'pointer' }}
            >
              <img src='img/website-icons/insurance.svg' alt='image' />

              <p>
                აკრედიტებულია <span>5</span>
              </p>
            </div>
          </div>

          <div className='col-12'>
            <div className='guj-grid'>
              {data &&
                data.map((item) => (
                  <div className='places-item' key={item.user.identifier}>
                    <div className='places-logo-div'>
                      <img src={item.logoUrl} alt='logo' />
                    </div>

                    <p>{item.user.clinicName}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          aria-label='view more'
          className='places-view-more _desktop-only'
        >
          <p>მაჩვენე მეტი</p>
        </button>
      </div>

      {/* STATIC INFORMATION */}
      <div className='main-acc-places-title _2'>
        <h3>პროცესი საკმაოდ მარტივია</h3>
      </div>

      <div className='container-fluid _places2'>
        <div className='row'>
          <div className='col-xxl-6 col-xl-6 col-lg-12'>
            <div className='process-mail'>
              <img src='/img/website-icons/process-mail.svg' alt='email' />

              <p>
                თქვენ უნდა გამოაგზანოთ წერილი შემდეგ მისამართზე:
                <br />
                <a href='mailto:info@accreditation.ge'>
                  info@accreditation.ge
                </a>
                <br />
                და მიუთითოთ:
              </p>
            </div>

            <div className='place-requirements'>
              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>დაწესებულების დასახელება</p>
              </div>

              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>
                  დაწესებულების ტიპი (საავადმყოფო, ამბულატორიული კლინიკა,
                  დიაგნოსტიკური კლინიკა, ესტეტიკური მედიცინის ცენტრი,
                  სტომატოლოგიური კლინიკა)
                </p>
              </div>

              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>დაწესებულების მისამართი</p>
              </div>

              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>საკონტაქტო ტელეფონი</p>
              </div>

              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>საკონტაქტო მეილი</p>
              </div>

              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>დაწესებულების ხელმძღვანელის სახელი და გვარი</p>
              </div>

              <div className='place-requirements-item'>
                <img
                  src='/img/website-icons/round-and-tick.svg'
                  alt='icon'
                />

                <p>თქვენი ორგანიზაციის ვებგვერდი ან/და ფეისბუქგვერდი</p>
              </div>
            </div>
          </div>

          <div className='col-xxl-6 col-xl-6 col-lg-12'>
            <div className='places-process'>
              <div className='process-img'>
                <img src='/img/photos/process.png' alt='photo' />
              </div>

              <div className='place-process-div'>
                <h3>პროცესი არის:</h3>

                <ul>
                  <li>
                    <img
                      src='/img/website-icons/tick-only.svg'
                      alt='icon'
                    />

                    <p>ნებაყოფლობითი</p>
                  </li>

                  <li>
                    <img
                      src='/img/website-icons/tick-only.svg'
                      alt='icon'
                    />

                    <p>უფასო</p>
                  </li>

                  <li>
                    <img
                      src='/img/website-icons/tick-only.svg'
                      alt='icon'
                    />

                    <p>მარტივი</p>
                  </li>

                  <li>
                    <img
                      src='/img/website-icons/tick-only.svg'
                      alt='icon'
                    />

                    <p>გამჭვირვალე</p>
                  </li>

                  <li>
                    <img
                      src='/img/website-icons/tick-only.svg'
                      alt='icon'
                    />

                    <p>სწრაფი</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className='places-sans'>
              <p>
                აკრედიტაცია გაიცემა ფრანგული ორგანიზაციის
                <br />
                Accréditation Sans Frontières მიერ.
              </p>

              <img
                src='img/company-logos/accreditation-sans-frontieres.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InPage;
