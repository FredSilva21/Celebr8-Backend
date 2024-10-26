const { Evento_Utilizador, Evento, Convidado, Acompanhante } = require("../Models/index");

exports.createGuestCompanion = async (req, res) => {
    const { userId, eventId, guestId } = req.params;
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

        // Verifica se o convidado existe
        const guestExists = await Convidado.findByPk(guestId);
        if (!guestExists) {
            return res.status(404).json({ error: "Guest not found" });
        }

        if(await Acompanhante.findOne({ where: { id_convidado: guestId, nome } })){
            return res.status(400).json({ error: "Companion already exists" });
        }

        const newCompanion = await Acompanhante.create({ id_convidado: guestId, nome });
        res.status(201).json({ message: "Companion created", result: newCompanion });
    } catch (error) {
        console.error("Error creating companion:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editGuestCompanion = async (req, res) => {
    const { userId, eventId, guestId, companionId } = req.params;
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

        // Verifica se o convidado existe
        const guestExists = await Convidado.findByPk(guestId);
        if (!guestExists) {
            return res.status(404).json({ error: "Guest not found" });
        }

        // Verifica se o acompanhante existe
        const companionExists = await Acompanhante.findByPk(companionId);
        if (!companionExists) {
            return res.status(404).json({ error: "Companion not found" });
        }

        await Acompanhante.update({ nome }, { where: { id_acompanhante: companionId } });
        res.status(200).json({ message: "Companion updated" });
    } catch (error) {
        console.error("Error updating companion:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}