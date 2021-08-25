const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function hashPassword (password){
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, (errorInSalt, salt) => {
      if (errorInSalt) {
        reject(errorInSalt);
      }
      bcrypt.hash(password, salt, (errorInHash, hash) => {
        if (errorInHash) {
          reject(errorInHash);
        }
        resolve(hash);
      });
    });
  });
};

async function comparePassword(password, hash,) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};


module.exports = {comparePassword, hashPassword}