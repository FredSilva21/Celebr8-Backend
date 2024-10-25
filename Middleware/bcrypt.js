const bcrypt = require("bcrypt");

module.exports = {
  createHash: async (string) => {
    return await bcrypt.hash();
  },
  compareHash: async (hash, string) => {
    return await bcrypt.compare(string, hash);
  },
};