//domain/.netlify/functions/single-product

exports.handler = async (event, context, cb) => {
  return {
    statusCode: 200,
    body: 'single-product',
  };
};
