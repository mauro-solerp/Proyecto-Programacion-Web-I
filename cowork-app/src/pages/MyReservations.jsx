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
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import HeadBar from '../components/HeadBar/HeadBar';
import { useAuth } from '../utils/auth/useAuth';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
    const token = localStorage.getItem('token');

    const {user} = useAuth();

    // Obtener reservas del usuario
    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/reservations?userId=${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(response.data);
        } catch (error) {
            console.error('Error obteniendo reservas', error);
        } finally {
            setLoading(false);
        }
    };

    // Cancelar reserva
    const cancelReservation = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:5000/reservations/${reservationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSnackbarMessage('Reserva cancelada exitosamente');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            fetchReservations();
        } catch (error) {
            setSnackbarMessage('Error cancelando reserva');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <HeadBar />
            <Container sx={{mt: 15}}>

                <Box mt={4}>
                    <Typography variant="h4">Mis Reservas</Typography>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    reservations.length > 0 && (
                        <Box mt={4}>
                            <Typography variant="h5">Horas</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'> Hora de Inicio </TableCell>
                                        <TableCell  align='center'>Hora de Fin</TableCell>
                                        <TableCell  align='center'>Fecha</TableCell>
                                        <TableCell  align='center'>Accion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reservations.map((reservation, index) => (
                                        <TableRow key={index}>
                                            <TableCell  align='center'>{reservation.startHour}</TableCell>
                                            <TableCell  align='center'>{reservation.endHour}</TableCell>
                                            <TableCell  align='center'>{reservation.date}</TableCell>
                                            <TableCell  align='center'>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => cancelReservation(reservation.id)}
                                                >
                                                    Cancelar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    )
                )}

                {reservations.length === 0 && !loading && (
                    <Box mt={4}>
                        <Typography variant="h6" color="textSecondary">
                           No tienes ninguna reserva
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
        </>
    );
};

export default MyReservations;
