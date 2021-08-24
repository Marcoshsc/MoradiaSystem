const prisma = require('../prisma');

module.exports = {
    async create(req, res) {
        const { start, end, value, id_place, id_user } = req.body;
        try {
            const data = await prisma.rentcontract.create({
                data: {
                    start: start,
                    end: end,
                    value: value,
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
            const data = await prisma.rentcontract.findMany();
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async update(req, res) {
        const { id, newStart, newEnd, newValue, newId_place, newId_user  } = req.body;
        try {
            const data = await prisma.rentcontract.update({
                where: {
                    id: Number(id)
                },
                data: {
                    start: newStart,
                    end: newEnd,
                    value: newValue,
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
            const data = await prisma.rentcontract.delete({
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
