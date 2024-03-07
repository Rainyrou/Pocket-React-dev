export const isMobile = (device) => {
  const { headers = {} } = device.ctx.req || {};
  return /mobile|android|ipone|ipad|phone/i.test(
    (headers['user-agent'] || '').toLowerCase()
  );
};
