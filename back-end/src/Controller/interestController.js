const prisma = require('../prisma');

module.exports = {
    async create(req, res) {
        const { proposed_value, id_place, id_user } = req.body;
        try {
            const data = await prisma.interest.create({
                data: {
                    proposed_value: proposed_value,
                    id_place: id_place,
                    id_user: id_user
                }
            });
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async index(req, res) {
        try {
            const data = await prisma.interest.findMany();
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async update(req, res) {
        const { id, newProposed_value, newId_place, newId_user } = req.body;
        try {
            const data = await prisma.interest.update({
                where: {
                    id: Number(id)
                },
                data: {
                    proposed_value: newProposed_value,
                    id_place: newId_place,
                    id_user: newId_user
                }
            });
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            const data = await prisma.interest.delete({
                where: {
                    id: Number(id)
                },
            });
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    }
}