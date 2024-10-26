const { Evento_Utilizador, Evento, Convidado, Acompanhante } = require("../Models/index");

exports.getAllEventGuests = async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        // Verifica se o evento existe
        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Verifica se o usuário é parte do evento
        const userIsPartOfEvent = await Evento_Utilizador.findOne({
            where: { id_utilizador: userId, id_evento: eventId },
        });
        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        // Busca todos os convidados do evento
        const guests = await Convidado.findAll({
            where: { id_evento: eventId },
            include: [{ model: Acompanhante }]
        });

        res.status(200).json({ message: "Retrieved all event guests", result: guests });
    } catch (error) {
        console.error("Error retrieving guests:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
};

exports.createEventGuest = async (req, res) => {
    const { userId, eventId } = req.params;
    const { nome } = req.body;

    try {
        if(!nome){
            return res.status(400).json({ error: "Name is required" });
        }
        // Verifica se o evento existe
        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const userIsPartOfEvent = await Evento_Utilizador.findOne({
            where: { id_utilizador: userId, id_evento: eventId },
        });

        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        if(await Convidado.findOne({ where: { id_evento: eventId, nome } })){
            return res.status(400).json({ error: "Guest already exists" });
        }

        const newGuest = await Convidado.create({ id_evento: eventId, nome });

        res.status(201).json({ message: "Guest created successfully", result: newGuest });
    } catch (error) {
        console.error("Error creating guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.getEventGuestById = async (req, res) => {
    const { userId, eventId, guestId } = req.params;

    try {
        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const userIsPartOfEvent = await Evento_Utilizador.findOne({
            where: { id_utilizador: userId, id_evento: eventId },
        });

        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        const guest = await Convidado.findByPk(guestId, {
            include: [{ model: Acompanhante }]
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
    const { nome } = req.body;

    try {
        if(!nome){
            return res.status(400).json({ error: "Name is required" });
        }

        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const userIsPartOfEvent = await Evento_Utilizador.findOne({
            where: { id_utilizador: userId, id_evento: eventId },
        });

        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        const guest = await Convidado.findByPk(guestId);

        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        await guest.update({ nome });

        res.status(200).json({ message: "Guest updated successfully", result: guest });
    } catch (error) {
        console.error("Error updating guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.deleteEventGuest = async (req, res) => {
    const { userId, eventId, guestId } = req.params;

    try {
        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const userIsPartOfEvent = await Evento_Utilizador.findOne({
            where: { id_utilizador: userId, id_evento: eventId },
        });

        if (!userIsPartOfEvent) {
            return res.status(404).json({ error: "User is not part of this event" });
        }

        const guest = await Convidado.findByPk(guestId);

        if (!guest) {
            return res.status(404).json({ error: "Guest not found" });
        }

        await guest.destroy();
        await Acompanhante.destroy({ where: { id_convidado: guestId } });

        res.status(200).json({ message: "Guest deleted successfully" });
    } catch (error) {
        console.error("Error deleting guest:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}