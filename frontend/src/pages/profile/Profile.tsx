import React from "react";
import {Box, Typography} from "@mui/material";
import {NavBar} from "../../components/components.tsx";
import styles from "./style.module.css"
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {RootState} from "../../data/store/store.tsx";
import {useNavigate} from "react-router";

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const user = useSelector((state: RootState) =>
        state.users.users.find(user => user.id === id)
    );

    return (
        <Box>
            <NavBar
                isHome={false}
                onSidebarToggle={() => {}}
            />

            <Box className={styles['profile-body']}>
                <Typography className={styles['profile-label']}>
                    Ваш профиль:
                </Typography>

                <Box
                    component="img"
                    src={user!.image_url}
                    className={styles['profile-img']}
                />

                <Typography className={styles['profile-option']}>
                    Имя: {user!.name}
                </Typography>

                <Typography className={styles['profile-option']}>
                    Почта: {user!.email}
                </Typography>

                <Typography className={styles['profile-option']}>
                    Группа: {user!.group}
                </Typography>

                {id === "0" ? (
                    <Typography sx={{marginTop: "40px", cursor: "pointer", color:"blue"}} onClick={() => {navigate("/profile/1")}}>
                        Зацените так же профиль Роберта
                    </Typography>
                ) : (
                    <Box></Box>
                )}
            </Box>
        </Box>
    )
}