const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    console.log("here")
  throw result.error;
}
const { parsed: envs } = result;
console.log(envs);
module.exports = envs;