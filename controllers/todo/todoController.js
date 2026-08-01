const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

require("dotenv").config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });




const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        const todo = await prisma.todo.create({
            data: {
                title
            }
        });

        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create todo" });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
};



const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await prisma.todo.update({
            where: {
                id: Number(id)
            },
            data: {
                ...(title !== undefined && { title }),
                ...(completed !== undefined && { completed })
            }
        });

        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update todo" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.todo.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete todo" });
    }
};


module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
