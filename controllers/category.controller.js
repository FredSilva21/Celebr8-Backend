const {Cost_Category,Event_Category} = require("../models/index");

/* The `exports.createCategoryCost` function is a controller function in a Node.js application that
handles the creation of a category for costs. Here is a breakdown of what the function does: */
exports.createCategoryCost = async (req, res) => {
    const userId= res.locals.userId;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }

        const newCategory = await Cost_Category.create({ user_id: userId, name });
        res.status(201).json({ message: "Category created", result: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

/* The `exports.editCategoryCost` function is a controller function in a Node.js application that
handles the editing of a category for costs. Here is a breakdown of what the function does: */
exports.editCategoryCost = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }

        const categoryExists = await Cost_Category.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category not found" });
        }

        const updatedCategory = await categoryExists.update({ name:name });
        res.status(200).json({ message: "Category updated", result: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

//Eventos
exports.createCategoryEvent = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }

        const newCategory = await Event_Category.create({ user_id: userId, name:name });
        res.status(201).json({ message: "Category created", result: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}

exports.editCategoryEvent = async (req, res) => {
    const {categoryId } = req.params;
    const { name } = req.body;

    try {
        if(!name){
            return res.status(400).json({ error: "Name is required" });
        }

        const categoryExists = await Event_Category.findByPk(categoryId);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category not found" });
        }

        const updatedCategory = await categoryExists.update({ name:name });
        res.status(200).json({ message: "Category updated", result: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Something went wrong...", details: error.message });
    }
}