const { Event_User, Event, Guest, Companion, Guest_Category } = require("../models/index");

exports.getAllEventGuests = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        // Check if the Event exists
        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if the User is part of the Event
        const userIsPartOfEvent = await Event_User.findOne({
            where: { user_id: userId, event_id: eventId },
        });
        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        // Retrieve all guests from the Event
        const guests = await Guest.findAll({
            where: { event_id: eventId },
            include: [{ 
                model: Companion, 
            }]
        });

        res.status(200).json({ message: "Retrieved all event guests", result: guests });
    } catch (error) {
        console.error("Error retrieving guests:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
};

exports.createEventGuest = async (req, res) => {
    const { userId, eventId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }
        
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

        if(await Guest.findOne({ where: { event_id: eventId, name } })){
            return res.status(400).json({ error: "Guest already exists" });
        }

        const newGuest = await Guest.create({ event_id: eventId, name });

        res.status(201).json({ message: "Guest created successfully", result: newGuest });
    } catch (error) {
        console.error("Error creating guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.getEventGuestById = async (req, res) => {
    const { userId, eventId, guestId } = req.params;

    try {
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

        const guest = await Guest.findByPk(guestId, {
            include: [{ model: Companion }]
        });

        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        res.status(200).json({ message: "Retrieved guest", result: guest });
    } catch (error) {
        console.error("Error retrieving guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editEventGuest = async (req, res) => {
    const { userId, eventId, guestId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }

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

        const guest = await Guest.findByPk(guestId);

        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        await guest.update({ name });

        res.status(200).json({ message: "Guest updated successfully", result: guest });
    } catch (error) {
        console.error("Error updating guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.deleteEventGuest = async (req, res) => {
    const { userId, eventId, guestId } = req.params;

    try {
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

        const guest = await Guest.findByPk(guestId);

        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        await guest.destroy();
        await Companion.destroy({ where: { guest_id: guestId } });

        res.status(200).json({ message: "Guest deleted successfully" });
    } catch (error) {
        console.error("Error deleting guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}