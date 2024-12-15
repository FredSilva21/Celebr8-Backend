const {Cost, Cost_Category, Event} = require("../Models/index");

exports.getAllEventCosts = async (req, res) => {
    const { eventId } = req.params;

    try {
        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const costs = await Cost.findAll({ where: { event_id: eventId } });
        res.status(200).json({ message: "All Costs retrieved successfully", result: costs });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.createEventCost = async (req, res) => {
    const { eventId } = req.params;
    const { name, value, category_id, payment_type } = req.body;

    try {
    if(!name || !value || !category_id || !payment_type){
            return res.status(400).json({ error: "Description, value,cost category and payment status are required" });
        }

        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const costCategoryExists = await Cost_Category.findByPk(category_id);
        if (!costCategoryExists) {
            return res.status(404).json({ error: "Cost category not found" });
        }

        const newExpense = await Cost.create({ event_id: eventId, name, value, category_id , payment_type});
        res.status(201).json({ message: "Cost created", result: newExpense });
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.getEventCost = async (req, res) => {
    const { eventId, costId } = req.params;

    try {
        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const cost = await Cost.findByPk(costId);
        if (!cost) {
            return res.status(404).json({ error: "Cost not found" });
        }

        res.status(200).json({ message: "Cost retrieved successfully", result: cost });
    } catch (error) {
        console.error("Error fetching expense:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editEventCost = async (req, res) => {
    const { eventId, costId } = req.params;
    const { name, value, category_id, payment_type } = req.body;

    try {
        if(!name || !value || !category_id || !payment_type){
            return res.status(400).json({ error: "Name, value, cost category and payment value are required" });
        }

        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const expenseCategoryExists = await Cost_Category.findByPk(category_id);
        if (!expenseCategoryExists) {
            return res.status(404).json({ error: "Cost category not found" });
        }

        const cost = await Cost.findByPk(costId);
        if (!cost) {
            return res.status(404).json({ error: "Cost not found" });
        }

        await cost.update({ name, value, category_id, payment_type }, { where: { id: costId } });
        res.status(200).json({ message: "Cost updated" });
    } catch (error) {
        console.error("Error updating Cost:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.deleteEventCost = async (req, res) => {
    const { eventId, costId } = req.params;

    try {
        const eventExists = await Event.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const cost = await Cost.findByPk(costId);
        if (!cost) {
            return res.status(404).json({ error: "Cost not found" });
        }

        await cost.destroy({ where: { id: costId } });
        res.status(200).json({ message: "Cost deleted" });
    } catch (error) {
        console.error("Error deleting Cost:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}