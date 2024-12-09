const { Event } = require("../models/index"); 

const generateEventId = async () => {
  const existingEvents = await Event.findAll({ attributes: ["event_id"] });

  let newId;
  do {
    newId = Math.floor(1000 + Math.random() * 9000); 
  } while (existingEvents.some((event) => event.id_evento === newId));

  return newId;
};

module.exports = { generateEventId };
