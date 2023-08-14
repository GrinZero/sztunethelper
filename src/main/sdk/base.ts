import got from "got";

const baseGot = {
  get: got.extend({
    method: "GET",
    prefixUrl: "http://47.98.217.40/",
    https: {
      rejectUnauthorized: false,
    },
    headers: {
      // referer: 'wx5886ee7aa3cfd39a',
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  }),
  post: got.extend({
    method: "POST",
    prefixUrl: "http://47.98.217.40/",
    https: {
      rejectUnauthorized: false,
    },
    headers: {
      // referer: 'wx5886ee7aa3cfd39a',
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
};

export { baseGot };
