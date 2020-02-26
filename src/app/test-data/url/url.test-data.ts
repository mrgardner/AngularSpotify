import { UrlSegment } from '@angular/router';

const mockUrlSegment = (path: string): UrlSegment => {
  return {
    path,
    parameters: {
      test: ''
    },
    parameterMap: {
      keys: [''],
      has: () => false,
      get: () => '',
      getAll: () => ['']
    }
  };
};

export { mockUrlSegment };
