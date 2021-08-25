const prisma = require("../prisma");
const { comparePassword, hashPassword } = require("../utils/bcrypt");

const generateUserToSend = (el) => ({
  ...el,
  password: undefined,
  place: undefined,
  email: undefined,
  number_rent: el.place.filter((p) => p.status === "RENT").length,
  number_sell: el.place.filter((p) => p.status === "SELL").length,
});

const generateLoggedUserToSend = (el) => ({
  ...el,
  password: undefined,
  number_rent: el.place.filter((p) => p.status === "RENT").length,
  number_sell: el.place.filter((p) => p.status === "SELL").length,
})

module.exports = {
  async create(req, res) {
    const { name, description, email, phone, location, password } = req.body;
    const hashedPass = await hashPassword(password);
    try {
      const data = await prisma.user.create({
        data: {
          name: name,
          description: description,
          email: email,
          password: hashedPass,
          phone: phone,
          location: location,
        },
        include: {
          place: true
        }
      });
      res.json(generateLoggedUserToSend(data));
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    let data;
    try {
      data = await prisma.user.findFirst({
        where: {
          email,
        },
        include: {
          place: true,
        },
      });
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }

    if (!data) {
      res.status(404).send();
    }

    const compare = await comparePassword(password, data.password);

    if (!compare) {
      res.status(401).send();
    }

    res.json(generateLoggedUserToSend(data));
  },

  async index(req, res) {
    try {
      const data = await prisma.user.findMany({
        include: {
          place: true,
        },
      });
      res.json(data.map(generateUserToSend));
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async getInterest(req, res) {
    const id = req.params.id;
    try {
      const data = await prisma.interest.findMany({
        where: {
          id_user: id,
        },
      });
      res.json(data);
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async getUser(req, res) {
    const id = req.params.id;
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: Number.parseInt(id),
        },
        include: {
          place: true
        }
      });
      res.json(generateLoggedUserToSend(data));
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async getPlaces(req, res) {
    const id = req.params.id;
    try {
      const data = await prisma.place.findMany({
        where: {
          id_user: id,
        },
      });
      res.json(data);
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async update(req, res) {
    const { id } = req.params
    const { name, description, email, phone, location } = req.body;

    try {
      const data = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          description,
          email,
          phone,
          location,
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
      const data = await prisma.user.delete({
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
