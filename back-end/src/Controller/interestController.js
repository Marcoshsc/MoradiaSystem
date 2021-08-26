const { place, user } = require('../prisma');
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

    async getInterest(req, res) {
        try {
            console.log(req.params.id)
            const data = await prisma.interest.findUnique({
                where: {
                    id: Number.parseInt(req.params.id)
                },
                include: {
                    place: true
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
            const data = await prisma.interest.findMany({
                where: {
                    id_user:Number(req.params.id)
                },
                include: {
                    place : {
                        include: {
                            user: true
                        }
                    }
                }
            });
            

            res.json(data);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async interestList(req, res) {

        try {
            const data = await prisma.place.findMany({
                where: {
                   id_user: Number(req.params.id)
                }
                
            });
            

            const places = await prisma.interest.findMany({
                where: {
                   id_place: {
                       in: data.map(d => d.id)
                   }
                },
                include: {
                    place: {
                        include:{
                            user: true
                        }
                    }
                }
            });
            res.json(places);
        } catch (error) {
            console.log(error.name + ":" + error.message);
            res.status(400).send();
        }
    },

    async acceptInterest(req, res) {

        try {
            const interest = await prisma.interest.findFirst({
                where: {
                   id: Number(req.params.id)
                },
                include: {
                    user: true,
                    place: true
                }
            });

            console.log(interest);

            // await prisma.interest.deleteMany({
            //     where:{
            //         id_place: interest.id_place
            //     },
                
            // })

            await prisma.place.update({
                where: {
                    id: Number(interest.id_place),
                  },
                  data:{
                      status: 'USING'
                  }
            })

            // if(interest.place.status === 'SELL'){
            //     await prisma.sellcontract.create({
            //         data:{
            //             value: interest.proposed_value,
            //             created_at: new Date(),
            //             id_place: interest.id_place,
            //             id_user: interest.id_user,
            //         }
            //     })
            // }else{
            //     await prisma.rentcontract.create({
            //         data:{
            //             value: interest.proposed_value,
            //             created_at: new Date(),
            //             id_place: interest.id_place,
            //             id_user: interest.id_user,
            //         }
            //     })
            // }

            res.status(201).send();
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