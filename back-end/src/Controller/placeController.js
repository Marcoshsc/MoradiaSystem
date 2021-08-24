const prisma = require('../prisma');

module.exports = {
    async create(req, res) {
        const { name, rooms, bathrooms, location, description, status, area, value, image, id_user } = req.body;
        try {
            const data = await prisma.place.create({
                data: {
                    name: name,
                    rooms: rooms,
                    bathrooms: bathrooms,
                    location: location,
                    description: description,
                    status: status,
                    area: area,
                    value: value,
                    image: image,
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
            const data = await prisma.place.findMany();
            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async update(req, res) {
        const { id, newName, newRooms, newBathrooms, newLocation, newDescription, newStatus, newArea, newValue, newImage, newId_user } = req.body;
        try {
            const data = await prisma.place.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: newName,
                    rooms: newRooms,
                    bathrooms: newBathrooms,
                    location: newLocation,
                    description: newDescription,
                    status: newStatus,
                    area: newArea,
                    value: newValue,
                    image: newImage,
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
            const data = await prisma.place.delete({
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