const prisma = require('../prisma');
const { comparePassword, hashPassword } = require('../utils/bcrypt') 

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
          location: location
        }
      });
      res.json(data);
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    let data 
    try {
      data = await prisma.user.findFirst({
        where: {
          email
        }
      });
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }

    if(!data){
      res.status(404).send();
    }

    const compare = await comparePassword(password, data.password)

    if(!compare){
      res.status(401).send();
    }

    res.json(data)
  },

  async index(req, res) {
    try {
      const data = await prisma.user.findMany();
      res.json(data);
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
        }
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
          id: id,
        }
      });
      res.json(data);
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
        }
      });
      res.json(data);
    } catch (error) {
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },

  async update(req, res) {
    const { id, newName, newDescription, newEmail, newPassword, newPhone, newLocation } = req.body;

    const newPass = hashPassword(newPassword);
    try {
      const data = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data: {
          name: newName,
          description: newDescription,
          email: newEmail,
          password: newPass,
          phone: newPhone,
          location: newLocation
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
      const data = await prisma.user.delete({
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