const prisma = require('../prisma');

module.exports = {
  async create(req, res){
    
    const { name, description, email, phone, location, created_at } = req.body;
  
    const data = await prisma.user.create({
      data: {
        name: name,
        description: description,
        email: email,
        password: password,
        phone: phone,
        location: location,
        created_at: created_at
      }
    });
  
    res.json(data);
  },

  
  async index(req, res){
    try{
      const data = await prisma.user.findMany();
      res.json(data);
    }catch(error){
      console.log(error.name + ":" + error.message);
      res.status(400).send();
    }
  },
  
  async update(req, res){
    const { id, newName, newDescription, newEmail, newPassword, newPhone, newLocation } = req.body;
  
    const data = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        name: newName,
        description: newDescription,
        email: newEmail,
        password: newPassword,
        phone: newPhone,
        location: newLocation
      }
    });
  
    res.json(data);
  },
  
  async delete(req, res){
    const id = req.params.id;
    const data = await prisma.user.delete({
      where: {
        id: Number(id)
      },
    });
    res.json(data);
  }
}