const { resizeImage, encodeImage } = require("./../helpers");

const thumbnailGenerator = (req, res) => {
  const payload = req.body;
  try {
    // verify url
    if (!payload.url) {
      return res.status(400).json({
        status: 2,
        success: false,
        error: "Invalid image url sent"
      });
    }
    // random file name, if we are testing, know the file created during test
    // const rand = process.env.NODE_ENV === 'test' ? `test-${Math.random().toString(36).substring(2, 15)}` : Math.random().toString(36).substring(2, 15);

    // encode the image and get back buffer
    encodeImage(payload.url, (datauri, type, buffer) => {
      // split to get image extension (image/png)
      // const imageExt = type.split("/");
      // const filepath = `public/images/${rand}.${fileExt[1]}`;

      // resize image with new dimesions
      resizeImage(buffer, 50, 50, type, (error, info) => {
        if (error) {
          return res.status(400).json({
            status: 3,
            success: false,
            error
          });
        } else {
          return res.json({
            status: 1,
            success: true,
            resizedImage: info
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: 4,
      success: false,
      error
    });
  }
};

// export
module.exports = {
  thumbnailGenerator
};
