import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import theme from '../../theme';
import { Avatar, Button, Divider, IconButton, Menu, MenuItem, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth/useAuth';
import { useState } from 'react';


const HeadBar = () => {
    const navigate = useNavigate();

    const [avatarMenuEl, setAvatarMenuEl] = useState(null);
    const handleRedirect = (page) => {
        navigate(page);
    };


    const { user, logout } = useAuth();

    const handleAvatarMenuOpen = (event) => {
        setAvatarMenuEl(event.currentTarget);
    };

    const handleCloseAvatarMenu = () => {
        setAvatarMenuEl(null);
    };

    const StyledButton = styled(Button)(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        borderRadius: 0,
        padding: '20px 25px',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={styles.textLogo} >
                        CWork Space
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />
                    <StyledButton onClick={() => handleRedirect('/')} >Inicio</StyledButton>
                    <StyledButton onClick={() => handleRedirect('/my-reservations')}>Mis Reservas</StyledButton>
                    {user ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={handleAvatarMenuOpen} color="inherit">
                                <Avatar sx={{ bgcolor: 'grey' }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={avatarMenuEl}
                                open={Boolean(avatarMenuEl)}
                                onClose={handleCloseAvatarMenu}
                            >
                                <MenuItem onClick={logout} sx={{color: 'black'}}>Cerrar sesión</MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <StyledButton onClick={() => handleRedirect('/login')} sx={{ color: 'white' }}>
                            Login
                        </StyledButton>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const styles = {
    textLogo: {
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '6px',
        fontStyle: 'italic',
        fontFamily: 'monospace',
    }
}

export default HeadBar;
