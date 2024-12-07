const Companion = require("./companion");
const Cost_Category = require("./cost_category");
const Event_Category = require("./event_category");
const Guest = require("./guest");
const Cost = require("./cost");
const Event = require("./event");
const Event_User = require("./event_user");
const Chat = require("./chat");
const Task= require("./task");
const User = require("./user");
const Cost_Template = require("./cost_template")
const Task_Template = require("./task_template")
const Message = require("./message");

// Define relationships
Companion.belongsTo(Guest, { foreignKey: "guest_id" });
Guest.hasMany(Companion, { foreignKey: "guest_id" });

Cost.belongsTo(Event, { foreignKey: "event_id" });
Event.hasMany(Cost, { foreignKey: "event_id" });

Cost.belongsTo(Cost_Category, { foreignKey: "category_id" });
Cost_Category.hasMany(Cost, { foreignKey: "category_id" });

Event.belongsTo(Event_Category, { foreignKey: "category_id" });
Event_Category.hasMany(Event, { foreignKey: "category_id" });

Event.belongsToMany(User, { through: Event_User, foreignKey: "event_id" });
User.belongsToMany(Event, { through: Event_User, foreignKey: "user_id" });

Task.belongsTo(Event, { foreignKey: "event_id" });
Event.hasMany(Task, { foreignKey: "event_id" });

Task.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Task, { foreignKey: "user_id" });

Chat.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Chat, { foreignKey: "user_id" });

Chat.hasMany(Message, { foreignKey: "chat_id" });
Message.belongsTo(Chat, { foreignKey: "chat_id" });

Chat.belongsTo(Event, { foreignKey: "event_id" });
Event.hasOne(Chat, { foreignKey: "event_id" });

Cost_Template.belongsTo(Cost_Category, { foreignKey: "category_id" });
Cost_Category.hasMany(Cost_Template, { foreignKey: "category_id" });

Task_Template.belongsTo(Event_Category, { foreignKey: "category_id" });
Event_Category.hasMany(Task_Template, { foreignKey: "category_id" });


// Sync all models
User.sync({ logging: false })
  .then(() => Cost_Category.sync({ logging: false }))
  .then(() => Event_Category.sync({ logging: false }))
  .then(() => Event.sync({ logging: false }))
  .then(() => Guest.sync({ logging: false }))
  .then(() => Companion.sync({ logging: false }))
  .then(() => Chat.sync({ logging: false }))
  .then(() => Message.sync({ logging: false }))
  .then(() => Task.sync({ logging: false }))
  .then(() => Event_User.sync({ logging: false }))
  .then(() => Cost.sync({ logging: false }))
  .then(() => Cost_Template.sync({ logging: false }))
  .then(() => Task_Template.sync({ logging: false }))
  .then(() => {
    console.log("All tables created successfully.");
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });

module.exports = {
  Companion,
  Cost_Category,
  Event_Category,
  Guest,
  Cost,
  Event,
  Event_User,
  Chat,
  Task,
  User,
  Cost_Template,
  Task_Template,
  Message,
};