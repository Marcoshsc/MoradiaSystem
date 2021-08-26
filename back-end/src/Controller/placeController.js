const prisma = require("../prisma");

const generatePlaceWithUser = (place) => {
    return {
        ...place,
        user: {
            ...place.user,
            password: undefined,
            email: undefined,
            id: undefined
        }
    }
}

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
          id_user: id_user,
        },
        include: {
            user: true
        }
      });
      res.json(generatePlaceWithUser(data));
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async getPlace(req, res) {
    try {
      const data = await prisma.place.findUnique({
          where: {
              id: Number.parseInt(req.params.id)
          },
          include: {
              user: true,
          }
      });
      res.json(generatePlaceWithUser(data));
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async index(req, res) {
    try {
      const data = await prisma.place.findMany({
          include: {
              user: true
          },
          where: {
            status: {
              in: ['SELL', 'RENT']
            }
          }
      });
      res.json(data.map(el => generatePlaceWithUser(el)));
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { name, rooms, bathrooms, location, description, status, area, value, image } =
      req.body;
    try {
      const data = await prisma.place.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          rooms,
          bathrooms,
          location,
          description,
          status,
          area,
          value,
          image,
        },
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
          id: Number(id),
        },
      });
      res.json(data);
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },
};
