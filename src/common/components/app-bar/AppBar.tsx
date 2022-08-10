import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../../assets/img/logo_incubator.png'
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {PATH} from "../RoutesBlock/RoutesBlock";
import {useNavigate} from "react-router-dom";
import {logOutTC} from "../../../features/auth/login-page/login-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../app/store";
import {Button} from "@mui/material";


const settings = [
    {name: 'Profile', page: PATH.PROFILEPAGE},
    {name: 'Logout', page: PATH.LOGINPAGE}
];

export const ResponsiveAppBar = () => {

    const isAuth = useSelector<AppStateType>(state => state.login.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const avatar = useAppSelector(state => state.login.avatar)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const nickName = useAppSelector(state => state.login.name)

    const loginRoute = () => {
        navigate(PATH.LOGINPAGE)

    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position={'static'} style={{background: '#FCFCFC'}} color={'default'}>
            <Container maxWidth="xl">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}} disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <img src={logo}/>
                    </Typography>
                    {isAuth
                        ?<Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }} sx={{flexGrow: 0}}>
                            <div className={'name'}>{nickName}</div>
                            <Tooltip title="Open settings">
                                <IconButton style={{marginLeft: "15px"}} onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Avatar" src={avatar ? avatar : undefined}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => {
                                    const onClickHandler = () => {
                                        if (setting.page === PATH.LOGINPAGE) {
                                            dispatch(logOutTC())
                                        } else {
                                            navigate(setting.page)
                                        }
                                        handleCloseUserMenu()

                                    }
                                    return (
                                        <MenuItem key={setting.name} onClick={onClickHandler}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </MenuItem>

                                    )
                                })}
                            </Menu>
                        </Box>


                        : <Button onClick={loginRoute} variant={'contained'}
                                  color="primary">Sign in</Button>}

                </Toolbar>
            </Container>
        </AppBar>
    );
};

{/*           <Box sx={{flexGrow: 1}}>
                <AppBar style={{background: '#FCFCFC'}} color={'default'} position="static">
                    <Toolbar style={{justifyContent: 'center'}}>
                        <div style={{display: 'flex', width: '80%', justifyContent: 'space-between'}}>
                            <img alt={'logo'} src={logo}/>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                {isAuth
                                    ? <div className={'name'}>{nickName}</div>


                                    : <Button onClick={routeChange} variant={'contained'}
                                              color="primary">Sign in</Button>}
                                {avatar && <img className={'avatar'} src={avatar}/>}
                            </div>

                        </div>

                    </Toolbar>
                </AppBar>
            </Box>*/
}
