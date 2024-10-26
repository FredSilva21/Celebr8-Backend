const {Despesa, Categoria_Despesa, Evento} = require("../Models/index");

exports.getAllEventCosts = async (req, res) => {
    const { eventId } = req.params;

    try {
        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const expenses = await Despesa.findAll({ where: { id_evento: eventId } });
        res.status(200).json({ result: expenses });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.createEventCost = async (req, res) => {
    const { eventId } = req.params;
    const { descricao, valor, categoria_despesa } = req.body;

    try {
        if(!descricao || !valor || !categoria_despesa){
            return res.status(400).json({ error: "Description, value and expense category are required" });
        }

        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const expenseCategoryExists = await Categoria_Despesa.findByPk(categoria_despesa);
        if (!expenseCategoryExists) {
            return res.status(404).json({ error: "Expense category not found" });
        }

        const newExpense = await Despesa.create({ id_evento: eventId, descricao, valor, categoria_despesa });
        res.status(201).json({ message: "Expense created", result: newExpense });
    } catch (error) {
        console.error("Error creating expense:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editEventCost = async (req, res) => {
    const { eventId, expenseId } = req.params;
    const { descricao, valor, categoria_despesa } = req.body;

    try {
        if(!descricao || !valor || !categoria_despesa){
            return res.status(400).json({ error: "Description, value and expense category are required" });
        }

        const eventExists = await Evento.findByPk(eventId);
        if (!eventExists) {
            return res.status(404).json({ error: "Event not found" });
        }

        const expenseCategoryExists = await Categoria_Despesa.findByPk(categoria_despesa);
        if (!expenseCategoryExists) {
            return res.status(404).json({ error: "Expense category not found" });
        }

        const expense = await Despesa.findByPk(expenseId);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        await Despesa.update({ descricao, valor, categoria_despesa }, { where: { id: expenseId } });
        res.status(200).json({ message: "Expense updated" });
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}