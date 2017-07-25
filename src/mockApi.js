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

export const fetchDynamicFromApi = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let param;
      switch (+id) {
        case 1:
          param = {
            shape: 'circle',
            word: 'foo',
          };
          break;
        case 2:
          param = {
            shape: 'square',
            word: 'bar',
          };
          break;
        case 3:
          param = {
            shape: 'rectangle',
            word: 'baz',
          };
          break;
        default:
          param = {};
          break;
      }
      resolve(param);
    }, 1000);
  });
};

