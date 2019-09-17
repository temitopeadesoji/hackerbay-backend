const request = require("request");
const sharp = require("sharp");

const encodeImage = (url, callback) => {
  request(
    {
      url,
      encoding: null
    },
    (e, r, b) => {
      const type = r.headers["content-type"];
      const prefix = `data:${type};base64,`;
      const base64 = Buffer.from(b).toString("base64");
      const dataURI = prefix + base64;

      callback(dataURI, type, b);
    }
  );
};
const resizeImage = (inputBuffer, height, width, type, callback) => {
  sharp(inputBuffer)
    .resize(height, width)
    .toBuffer()
    .then(data => {
      const prefix = `data:${type};base64,`;
      const base64 = Buffer.from(data).toString("base64");
      const dataURI = prefix + base64;
      callback(null, dataURI);
    })
    .catch(err => callback(err));
};

module.exports = {
  encodeImage,
  resizeImage
};
