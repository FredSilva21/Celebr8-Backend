const { Evento } = require("../models/index"); 

const generateEventId = async () => {
  const existingEvents = await Evento.findAll({ attributes: ["id_evento"] });

  let newId;
  do {
    newId = Math.floor(1000 + Math.random() * 9000); 
  } while (existingEvents.some((event) => event.id_evento === newId));

  return newId;
};

module.exports = { generateEventId };
