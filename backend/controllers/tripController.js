const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTrip = async (req, res) => {
    try {
        const trips = await prisma.Trips.findMany();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ 'message': 'Error fetching trips', error });
    }
};

const createNewTrip = async (req, res) => {

    const { src, dest, departureTime, arrivalTime, scheme,region, distance, fare, employeeId } = req.body.trip;
    if (!src || !dest || !departureTime || !arrivalTime || !scheme || !region || !distance || !fare || !employeeId) {
        return res.status(400).json({ 'message': 'All fields except for approvals and nDays are required.' });
    }

    try {
        const newTrip = await prisma.Trips.create({
            data: {
                src,
                dest,
                departureTime,
                arrivalTime,
                scheme,
                region,
                distance: parseInt(distance),
                fare: parseInt(fare),
                adminApproval: false,
                supApproval: false,
                dirApproval: false,
                employeeId
            }
        });
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ 'message': 'Error creating trip', error });
    }
};

const updateTrip = async (req, res) => {
    const { id, src, dest, departureTime, arrivalTime, scheme, distance, fare, adminApproval, supApproval, dirApproval } = req.body;

    try {
        const trip = await prisma.Trips.findUnique({
            where: { id: parseInt(id) }
        });

        if (!trip) {
            return res.status(400).json({ "message": `Trip ID ${id} not found. Please check in Tours for the trip` });
        }

        const updatedTrip = await prisma.Trips.update({
            where: { Id: parseInt(id) },
            data: {
                src,
                dest,
                departureTime,
                arrivalTime,
                scheme,
                distance,
                fare,
                adminApproval,
                supApproval,
                dirApproval,
                employeeId
            }
        });

        res.json(updatedTrip);
    } catch (error) {
        res.status(500).json({ 'message': 'Error updating trip', error });
    }
};

const deleteTrip = async (req, res) => {
    const { id } = req.body;

    try {
        const trip = await prisma.Trips.findUnique({
            where: { id: parseInt(id) }
        });

        if (!trip) {
            return res.status(400).json({ "message": `Trip ID ${id} not found` });
        }

        await prisma.trip.delete({
            where: { id: parseInt(id) }
        });

        res.json({ "message": `Trip ID ${id} deleted` });
    } catch (error) {
        res.status(500).json({ 'message': 'Error deleting trip', error });
    }
};

const getTrip = async (req, res) => {
    const { id } = req.params.emp_id;
    console.log(id)
    try {
        const trip = await prisma.Trips.findUnique({
            where: { employeeId: parseInt(id) }
        });

        if (!trip) {
            return res.status(400).json({ "message": `Trip ID ${id} not found` });
        }

        res.json(trip);
    } catch (error) {
        res.status(500).json({ 'message': 'Error fetching trip', error });
    }
};

const addAnotherTrip = async (req, res) => {
    const trip_id = req.params.id;
    const { src, dest, departureTime, arrivalTime, scheme, region, distance, fare, employeeId } = req.body.trip;
    if (!src || !dest || !departureTime || !arrivalTime || !scheme || !region || !distance || !fare || !employeeId) {
        return res.status(400).json({ 'message': 'All fields except for approvals and nDays are required.' });
    }

    try {
        const newTrip = await prisma.Trips.create({
            data: {
                t_id: parseInt(trip_id),
                src,
                dest,
                departureTime,
                arrivalTime,
                scheme,
                region,
                distance: parseInt(distance),
                fare: parseInt(fare),
                adminApproval: false,
                supApproval: false,
                dirApproval: false,
                employeeId
            }
        });
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ 'message': 'Error creating trip', error });
    }
};
module.exports = {
    getAllTrip,
    createNewTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    addAnotherTrip
};
