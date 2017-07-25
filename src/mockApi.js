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
