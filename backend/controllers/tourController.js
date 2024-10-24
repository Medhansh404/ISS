const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTours = async (req, res) => {
    var eId = req.query.empID
    console.log(req.query.empId)
    try {
        const trips = await prisma.Trips.findMany(
            {where: 
                {employeeId: parseInt(req.query.empId)},
            orderBy: 
                { departureTime: 'asc' },  
            });
    
            // Group trips by t_id
            const tours = trips.reduce((acc, trip) => {
                if (!acc[trip.t_id]) {
                    acc[trip.t_id] = [];
                }
                acc[trip.t_id].push(trip);
                return acc;
            }, {});
            res.json(tours);
        }
            catch (error) {
                res.status(500).json({ 'message': 'Error fetching trips', error });
            }
        };

module.exports = {
    getAllTours,
};
