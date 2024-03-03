const MODE = import.meta.env.MODE;

export const baseUrl =
  MODE == 'development' ? '/api' : 'http://114.132.167.29:7009';
