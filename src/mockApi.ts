import { Param } from './models/param';
/*
  mockApi.ts

  To illustrate the point of server-side rendering without
  having to account for confounding variables, `setTimeouts` are used
  to represent external API calls. Normally, you'd use something like
  `fetch`, `axios`, or `ajax` here.

  This is also good for testing, since we can simulate how long API calls
  will take to resolve
*/

// @TODO: random failure rates
export const fetchFromApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFromApi = {
        foo: 'bar',
        baz: 'qux',
        quux: 'corge',
        uier: 'grault',
        garply: 'waldo',
      };
      resolve(dataFromApi);
    }, 1000);
  });
};

export const fetchFromApiWithParams = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFromApi = [
        [
          'foo',
          'bar',
          'baz',
        ],
        [
          'qux',
          'corge',
          'uier',
        ],
        [
          'grault',
          'garply',
          'waldo',
        ],
      ];
      // Ideally, these would be pre-allocated/counted via a db or memcache
      resolve({
        data: dataFromApi[params.page - 1],
        totalPages: 3,
      });
    }, 1000);
  });
};

export const fetchDynamicFromApi = (id) => {
  // This `id` comes from `<DynamicPage>`'s `static loadData()` method
  return new Promise((resolve) => {
    // same data structuring, different values
    setTimeout(() => {
      let param: Param;
      switch (+id) {
        case 1:
          param = {
            id,
            shape: 'circle',
            word: 'foo',
          };
          break;
        case 2:
          param = {
            id,
            shape: 'square',
            word: 'bar',
          };
          break;
        case 3:
          param = {
            id,
            shape: 'rectangle',
            word: 'baz',
          };
          break;
        default:
          param = {id};
          break;
      }
      resolve(param);
    }, 2000);
  });
};
