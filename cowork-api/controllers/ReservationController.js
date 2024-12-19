// Import required modules
const Reservation  = require('../models/Reservation');
const { Op } = require('sequelize');

// Get available slots for a given date with capacity
exports.getAvailableSlots = async (req, res) => {
    const { date } = req.query;

    try {
        // Buscar todas las reservas para el día especificado
        const reservations = await Reservation.findAll({
            where: { date },
        });

        // Convertir las reservas en un formato que facilite la comparación
        const reservedSlots = reservations.map((reservation) => ({
            startHour: parseInt(reservation.startHour.split(':')[0]),  
            endHour: parseInt(reservation.endHour.split(':')[0]),     
        }));

        const availableSlots = [];

        // Comprobar los horarios disponibles en el rango de 9 a 18 y capacidad restante
        for (let i = 9; i < 18; i++) {
            const isReserved = reservedSlots.filter(
                (slot) => (i >= slot.startHour && i < slot.endHour) || (i + 1 > slot.startHour && i + 1 <= slot.endHour)
            ).length;

            const capacity = 16 - isReserved;  // Capacidad máxima menos las reservas

            if (capacity > 0) {
                availableSlots.push({
                    startHour: `${i}:00:00`,  // Formato de hora: 'HH:00:00'
                    endHour: `${i + 1}:00:00`, // Formato de hora: 'HH:00:00'
                    capacity,
                });
            }
        }

        // Responder con los slots disponibles y la capacidad
        res.json({ availableSlots });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching available slots', error });
    }
};

// Handle reservation creation with capacity check
exports.createReservation = async (req, res) => {
    const { date, startHour, endHour, userId } = req.body;

    try {
        // Verificar si el usuario ya tiene una reserva para esta hora
        const existingReservation = await Reservation.findOne({
            where: { userId, date, startHour, endHour },
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'Ya tienes una reserva en este horario' });
        }

        // Verificar la cantidad de reservas por hora
        const reservations = await Reservation.findAll({
            where: { date, startHour, endHour },
        });

        if (reservations.length >= 16) {
            return res.status(400).json({ message: 'No hay espacio disponible para esta hora' });
        }

        const reservation = await Reservation.create({
            userId,
            date,
            startHour,
            endHour
        });
        res.status(201).json({ reservationId: reservation.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating reservation', error });
    }
};


// Get user reservations
exports.getUserReservations = async (req, res) => {
    const {userId} = req.query;

    try {
        const reservations = await Reservation.findAll({ where: { userId } });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};


exports.cancelReservation = async (req, res) => {
    const { id } = req.params; // ID de la reserva a cancelar

    try {
        // Buscar la reserva por ID
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        // Eliminar la reserva
        await reservation.destroy();
        res.json({ message: 'Reserva cancelada exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error cancelling reservation', error });
    }
};