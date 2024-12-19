import { Button, Card, Grid2 as Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const LoginForm = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginCredentials = {
        username: userName,
        password: loginPassword
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/users/login", loginCredentials)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                window.location.href = "/";
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '100%' }}>
                <Card sx={{ p: 5, mt: 18, mb: 12 }} style={{ width: "30%", borderRadius: 29, backgroundColor: '#191818' }}>
                    <form onSubmit={(e) => handleLogin(e)}>
                        <Grid container spacing={2}>
                            <Grid size={12} textAlign="center">
                                <Typography variant="h4">
                                    Iniciar Sesión
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
                                    size="small"
                                    value={loginPassword}
                                    required
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    type="password"
                                />
                            </Grid>
                            <Grid size={12}>
                                <Button variant="contained" fullWidth size="small" type="submit" color="primary">
                                    <b>Login</b>
                                </Button>
                            </Grid>
                            <Grid size={12} textAlign="center">
                                No tienes cuenta?
                                <Button variant="text" color="secondary" size="small" onClick={() => navigate('/register')}>
                                    <b>Crear Cuenta</b>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default LoginForm;