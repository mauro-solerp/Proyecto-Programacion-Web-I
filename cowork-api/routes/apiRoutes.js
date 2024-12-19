// Import required modules
const express = require('express');
const userController = require('../controllers/UserController');
const reservationController = require('../controllers/ReservationController');
const authenticateToken = require('../middlewares/authenticate');

// Initialize the router
const router = express.Router();

// User routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);

// Reservation routes
router.post('/reservations', reservationController.createReservation);
router.get('/reservations', reservationController.getUserReservations);
router.get('/reservations/available', reservationController.getAvailableSlots);
router.delete('/reservations/:id', reservationController.cancelReservation);

module.exports = router;