const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRequests = async (req, res) => {
    const email  = req.query.email;
    console.log(email);
    try{
      const foundUser = await prisma.User.findUnique({
        where: {
          email: email,
        },
      })
    const region = Object.values(foundUser.region)
    const scheme = Object.values(foundUser.scheme)
    
    const requests = await prisma.Trips.findMany({
      where: {
        OR: [
          {
            region: {
              has: parseInt(region[0])
            }
          },
          {
            scheme: {
              has: parseInt(scheme[0])
            }
          }
        ],
        AND: [
          {
            OR: [
              { adminApproval: { in: [0, -1] } },
              { dirApproval: { in: [0, -1] } },
              { supApproval: { in: [0, -1] } }
            ]
          }
        ]
      }
    });
    
    if (requests) {
      res.status(200).json(requests);
    } else {
      res.status(200).json({});
    }
    
    
    }
  catch(error){
    res.status(500).json({"error in finding trip from db": error})
  }
}

  const respondRequest = async (req, res) => {
    const trips  = req.body.trips; 
    try {
      for (var trip of trips) {
        const  {id, adminStatus, dirStatus, supStatus}  = trip;
        await prisma.Trips.update({
          where: { id: parseInt(id) },
          data: {
            adminApproval: adminStatus, 
            dirApproval: dirStatus, 
            supApproval: supStatus
          },
        });
      }
  
      res.status(200).json({ message: "Trips updated successfully!" });
    } catch (error) {
      console.error("Error updating trips:", error);
      res.status(500).json({ error: "Failed to update trips." });
    }
  };


module.exports = { getRequests , respondRequest};