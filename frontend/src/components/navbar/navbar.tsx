import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import styles from "./style.module.css";
import {Box, List, ListItem, Typography} from "@mui/material";
import {useNavigate} from "react-router";

interface NavbarProps {
    onSidebarToggle: () => void;
    isHome: boolean;
}

export const NavBar: React.FC<NavbarProps> = ({ onSidebarToggle, isHome }) => {
    const navigate = useNavigate();

    const handleCategoriesButton = () => {
        navigate("/categories");
    }
    const handleProductsButton = () => {
        navigate("/");
    }
    const handleProfileButton = () => {
        navigate("/profile/0");
    }

    return (
        <AppBar position="absolute" color="default" className={styles['navbar']}>
            {isHome ? (
                <Typography className={styles['navbar-left']} onClick={onSidebarToggle}>
                    Меню
                </Typography>
            ) : (
                <Box></Box>
            )}

            <List className={styles['navbar-list']}>
                <ListItem className={styles['navbar-item']} onClick={handleProductsButton}>Товары</ListItem>
                <ListItem className={styles['navbar-item']} onClick={handleCategoriesButton}>Категории товаров</ListItem>
                <ListItem className={styles['navbar-item']}>Склады</ListItem>
                <ListItem className={styles['navbar-item']}>О системе</ListItem>
                <ListItem className={styles['navbar-item']} onClick={handleProfileButton}>Личная страница</ListItem>
            </List>
        </AppBar>
    );
};