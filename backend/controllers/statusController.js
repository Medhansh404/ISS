const prisma = new PrismaClient();

const getPending = async (req, res) => {
    var eId = req.body.params
    console.log(eId)
    try {
        const trips = await prisma.Trips.findMany(
            {where: 
                {employeeId: parseInt(eId)}, 
                AND: [
                    { adminApproval: { not: -1 } },
                    { dirApproval: { not: -1 } },
                    { supApproval: { not: -1 } }
                ] 
            });
            const ptrips = [];

            for (const obj of trips) {
                if (obj.adminApproval === 0 || obj.dirApproval === 0 || obj.supApproval === 0) {
                    ptrips.push(obj);
                }
            }
            res.json(ptrips);
        }
            catch (error) {
                res.status(500).json({ 'message': 'Error fetching trips', error });
            }
        };

const updatePending = async (req, res) => {
            var eId = req.body.params
            console.log(eId)
            try {
                const trips = await prisma.Trips.findMany(
                    {where: 
                        {employeeId: parseInt(eId)}, 
                        AND: [
                            { adminApproval: { not: -1 } },
                            { dirApproval: { not: -1 } },
                            { supApproval: { not: -1 } }
                        ] 
                    });
                    const ptrips = [];
        
                    for (const obj of trips) {
                        if (obj.adminApproval === 0 || obj.dirApproval === 0 || obj.supApproval === 0) {
                            ptrips.push(obj);
                        }
                    }
                    res.json(ptrips);
                }
                    catch (error) {
                        res.status(500).json({ 'message': 'Error fetching trips', error });
                    }
                };

module.exports = {
    getPending,
    updatePending,
    getDisapproved,
    updateDisapproved,
    deleteDisapproved
};
