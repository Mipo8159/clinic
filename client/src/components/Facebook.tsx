import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const Facebook: React.FC<{ id: any }> = ({ id }) => {
  return (
    <div className='mt-4'>
      <FacebookProvider appId='617694362534580'>
        <Comments href={`http://${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/rate/deamedi/${id}`} />
      </FacebookProvider>
    </div>
  );
};

export default Facebook;
