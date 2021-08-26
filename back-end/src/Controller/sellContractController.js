const prisma = require('../prisma');

module.exports = {
    async create(req, res) {
        const { value, id_place, id_user } = req.body;
        try {
            const data = await prisma.sellcontract.create({
                data: {
                    value: value,
                    id_place: id_place,
                    id_user: id_user
                }
            });
            await prisma.place.update({
                where: {
                    id: id_place
                },
                data: {
                    status: 'USING'
                }
            })
            await prisma.interest.deleteMany({
                where: {
                    id_place: id_place
                }
            })
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },


    async index(req, res) {
        try {
            const data = await prisma.sellcontract.findMany({
                include: {
                    user: true,
                    place: true
                }
            });
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async update(req, res) {
        const { id, newValue, newId_place, newId_user } = req.body;
        try {
            const data = await prisma.sellcontract.update({
                where: {
                    id: Number(id)
                },
                data: {
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
            const data = await prisma.sellcontract.delete({
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