const expressLoader = require('./express.js');
const mongooseLoader = require('./mongoose.js');

console.log('init really starts the index.js');

const loader = async ({ expressApp }) => {
  
  //Loading different require modules
  const mongoConnection = await mongooseLoader();
  console.log('MongoDB Initialized');

  await expressLoader({ app: expressApp });
  console.log('Express Initialized');
}

module.exports = loader;