//domain/.netlify/functions/products

exports.handler = async (event, context, cb) => {
  return {
    statusCode: 200,
    body: 'products',
  };
};
