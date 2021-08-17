import Head from 'next/head';
import Hero from '../components/Hero';
import Main from '../components/Main';

export default function Home() {
  return (
    <div>
      <Head>
        <title>აკრედიტაცია</title>
        <meta
          name='keywords'
          content='accreditation clinics safety protected people აკრედიტაცია უსაფრთხოება გამჭვირვალობა კლინიკა ხალხი'
        />
        <meta
          name='description'
          content='პროფესორ გიორგი ფხაკაძის ინიციატივა, აკრედიტაცია'
        />
      </Head>
      <div>
        <Hero />
        <Main />
      </div>
    </div>
  );
}
