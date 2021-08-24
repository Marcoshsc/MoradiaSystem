const prisma = require('../prisma');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function hashPassword (password){
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, (errorInSalt, salt) => {
      if (errorInSalt) {
        reject(errorInSalt);
      }
      bcrypt.hash(password, salt, (errorInHash, hash) => {
        if (errorInHash) {
          reject(errorInHash);
        }
        resolve(hash);
      });
    });
  });
};

async function comparePassword(password, hash,) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

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