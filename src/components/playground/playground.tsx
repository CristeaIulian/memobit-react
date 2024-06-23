import React from 'react';

import { Pagination } from '@memobit/components/pagination/pagination.tsx';

export const Playground = (): React.ReactNode => {
  return (
    <div>
      <Pagination totalPages={25} currentPathName={'/home'} pageNum={1} withGeneratedPages={true} />
    </div>
  );
};
