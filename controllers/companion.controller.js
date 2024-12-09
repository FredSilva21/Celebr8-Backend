const { Event_User, Event, Guest, Companion } = require("../models/index");

exports.createGuestCompanion = async (req, res) => {
    const { userId, eventId, guestId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }
        // Verifica se o Event existe
        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const userIsPartOfEvent = await Event_User.findOne({
            where: { user_id: userId, event_id: eventId },
        });

        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        // Verifica se o Guest existe
        const guestExists = await Guest.findByPk(guestId);
        if (!guestExists) {
            return res.status(404).json({ error: "Guest not found" });
        }

        if(await Companion.findOne({ where: { guest_id: guestId, name } })){
            return res.status(400).json({ error: "Companion already exists" });
        }

        const newCompanion = await Companion.create({ guest_id: guestId, name });
        res.status(201).json({ message: "Companion created", result: newCompanion });
    } catch (error) {
        console.error("Error creating companion:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editGuestCompanion = async (req, res) => {
    const { userId, eventId, guestId, companionId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }
        // Verifica se o Event existe
        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const userIsPartOfEvent = await Event_User.findOne({
            where: { user_id: userId, event_id: eventId },
        });

        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        // Verifica se o Guest existe
        const guestExists = await Guest.findByPk(guestId);
        if (!guestExists) {
            return res.status(404).json({ error: "Guest not found" });
        }

        // Verifica se o Companion existe
        const companionExists = await Companion.findByPk(companionId);
        if (!companionExists) {
            return res.status(404).json({ error: "Companion not found" });
        }

        await Companion.update({ name }, { where: { companion_id: companionId } });
        res.status(200).json({ message: "Companion updated" });
    } catch (error) {
        console.error("Error updating companion:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}