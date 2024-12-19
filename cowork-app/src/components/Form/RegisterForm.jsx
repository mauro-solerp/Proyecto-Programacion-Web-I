import { Alert, Button, Card, Grid2 as Grid, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    const RegisterCredentials = {
        username: userName,
        password: registerPassword,
        role: "user"
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (registerPassword !== repeatPassword) {
            setSnackbarMessage("Las contraseñas no coinciden");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
        axios.post("http://localhost:5000/users/register", RegisterCredentials)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <React.Fragment>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Card sx={{ p: 5, mt: 13, mb: 7 }} style={{ width: "30%", borderRadius: 29, backgroundColor: '#191818' }}>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <Grid container spacing={2}>
                            <Grid size={12} textAlign="center">
                                <Typography variant="h4">
                                    Registrate ahora
                                </Typography>

                            </Grid>
                            <Grid size={12} textAlign="center">
                                <img src="/images/cworkv2.png" alt="Logo" style={{ width: '170px', height: '150px' }} />
                            </Grid>
                            <Grid size={12}>
                                <label> Nombre de usuario</label>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    size="small"
                                />
                            </Grid>
                            <Grid size={12}>
                                <label> Contraseña</label>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    required
                                    size="small"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    type="password"
                                />
                            </Grid>
                            <Grid size={12}>
                                <label> Repite la contraseña</label>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    required
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    type="password"
                                />
                            </Grid>
                            <Grid size={12}>
                                <Button variant="contained" fullWidth size="small" type="submit" color="primary">
                                    <b>Registrate</b>
                                </Button>
                            </Grid>
                            <Grid size={12} textAlign="center">
                                Ya tienes cuenta?
                                <Button variant="text" color="secondary" size="small" onClick={() => navigate('/login')}>
                                    <b>Inicia Sesion</b>
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Card>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default RegisterForm;