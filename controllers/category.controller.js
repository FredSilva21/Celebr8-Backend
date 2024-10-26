const {Categoria_Despesa,Categoria_Evento} = require("../Models/index");

//Despesas

exports.createCategoryCost = async (req, res) => {
    const userId= res.locals.userId;
    const { nome } = req.body;

    try {
        if(!nome){
            return res.status(400).json({ error: "Name is required" });
        }

        const newCategory = await Categoria_Despesa.create({ id_utilizador: userId, nome_categoria:nome });
        res.status(201).json({ message: "Category created", result: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editCategoryCost = async (req, res) => {
    const { categoryId } = req.params;
    const { nome } = req.body;

    try {
        if(!nome){
            return res.status(400).json({ error: "Name is required" });
        }

        const categoryExists = await Categoria_Despesa.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category not found" });
        }

        const updatedCategory = await categoryExists.update({ nome_categoria:nome });
        res.status(200).json({ message: "Category updated", result: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

//Eventos
exports.createCategoryEvent = async (req, res) => {
    const { userId } = req.params;
    const { nome } = req.body;

    try {
        if(!nome){
            return res.status(400).json({ error: "Name is required" });
        }

        const newCategory = await Categoria_Evento.create({ id_utilizador: userId, nome_categoria:nome });
        res.status(201).json({ message: "Category created", result: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editCategoryEvent = async (req, res) => {
    const { userId, categoryId } = req.params;
    const { nome } = req.body;

    try {
        if(!nome){
            return res.status(400).json({ error: "Name is required" });
        }

        const categoryExists = await Categoria_Evento.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category not found" });
        }

        const updatedCategory = await categoryExists.update({ nome_categoria:nome });
        res.status(200).json({ message: "Category updated", result: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}