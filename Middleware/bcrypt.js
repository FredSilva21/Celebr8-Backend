const bcrypt = require("bcrypt");

module.exports = {
  createHash: async (string) => {
    const saltRounds = 10; // Define o número de rounds de salt
    return await bcrypt.hash(string, saltRounds); // Passa a string e o número de rounds
  },
  compareHash: async (hash, string) => {
    return await bcrypt.compare(string, hash);
  },
};