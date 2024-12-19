import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { useAuth } from '../../utils/auth/useAuth';

const ReservationForm = () => {
    //Obtener la fecha de hoy en el formato YYYY-MM-DD
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];

    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(todayFormatted);
    const [loading, setLoading] = useState(false);
    const [userReservations, setUserReservations] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const token = localStorage.getItem('token');

    // Obtener el usuario autenticado
    const { user } = useAuth();

    // Obtener los slots disponibles para la fecha seleccionada
    const fetchAvailableSlots = async (date) => {
        if (!date) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/reservations/available?date=${date}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            //Asignar los slots disponibles 
            setAvailableSlots(response.data.availableSlots);
        } catch (error) {
            console.error('Error fetching available slots:', error);
        } finally {
            setLoading(false);
        }
    };

    // Obtener las reservas del usuario
    const fetchUserReservations = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reservations?userId=${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserReservations(response.data);
        } catch (error) {
            console.error('Error fetching user reservations:', error);
        }
    };

    // Manejar la creación de reservas
    const handleReserve = async (startHour, endHour) => {
        if (!selectedDate) return;
        try {
            await axios.post(
                'http://localhost:5000/reservations',
                {
                    date: selectedDate,
                    startHour,
                    endHour,
                    userId: user.id,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setSnackbarMessage('Reservacion exitosa');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            // Actualizar slots disponibles y reservas del usuario
            fetchAvailableSlots(selectedDate);
            fetchUserReservations(user.id);
        } catch (error) {
            console.error('Error creating reservation:', error);
            setSnackbarMessage('Reservacion fallida');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const isHourAndDateReserved = (startHour) => {
        return userReservations.some(
            (reservation) => reservation.date === selectedDate && reservation.startHour === startHour
        );
    };

    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
            fetchUserReservations(user.id);
        }
    }, [selectedDate]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container >
            <Box >
                <Typography variant="h4" >Reserva tu espacio de Coworking</Typography>
            </Box>
            <Box sx={{mt: 2}} >
                <TextField
                    type="date"
                    fullWidth
                    variant="filled"
                    color='primary'
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                availableSlots.length > 0 && (
                    <Box mt={4}>
                        <Typography variant="h5">Horas disponibles</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'> Hora de inicio</TableCell>
                                    <TableCell align='center'> Hora de fin </TableCell>
                                    <TableCell align='center'> Reservar </TableCell>
                                    <TableCell align='center'> Capacidad </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {availableSlots.map((slot, index) => (
                                    <TableRow key={index}>
                                        <TableCell align='center'>{slot.startHour}</TableCell>
                                        <TableCell align='center'>{slot.endHour}</TableCell>
                                        <TableCell align='center'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleReserve(slot.startHour, slot.endHour)}
                                                disabled={isHourAndDateReserved(slot.startHour)}
                                            >
                                                {isHourAndDateReserved(slot.startHour) ? 'Ya reservado' : 'Reservar'}
                                            </Button>
                                        </TableCell>
                                        <TableCell align='center'>{slot.capacity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )
            )}

            {availableSlots.length === 0 && !loading && (
                <Box mt={4}>
                    <Typography variant="h6" color="textSecondary">
                        No hay horarios disponibles para la fecha seleccionada
                    </Typography>
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ReservationForm;
