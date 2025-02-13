import React, {useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {NavBar, ProductModalChange} from "../../components/components.tsx";
import {useNavigate} from "react-router";
import styles from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../data/store/store.tsx";
import {useParams} from "react-router-dom";
import {removeProduct} from "../../data/store/slices/productSlice.tsx";

export const ProductDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();
    const product = useSelector((state: RootState) =>
        state.products.products.find(product => product.id === id)
    );

    const handleDeleteButton = (product_id: string) => {
        dispatch(removeProduct(product_id));
        navigate("/");
    }

    const [changeProduct, setChangeProduct] = useState<boolean>(false);
    const handleChangeProduct = () => {
        setChangeProduct(true);
    }
    const handleCloseChangeProduct = () => {
        setChangeProduct(false);
    }

    return (
        <Box>
            <NavBar
                onSidebarToggle={() => {}}
                isHome={false}
            />

            <Box className={styles['product-details-body']}>
                {product ? (
                    <Box>
                        <Typography className={styles['product-details-label']}>
                            {product.name}
                        </Typography>

                        <Box
                            className={styles['product-details-img']}
                            component="img"
                            src={product.image ?? "https://pic.onlinewebfonts.com/svg/img_47726.svg"}
                            alt="product"
                        />

                        <Box>
                            <Typography>
                                Категория: {product.category || "Не указано"}
                            </Typography>

                            <Typography>
                                Количество: {product.quantity} {product.unit}
                            </Typography>

                            <Typography>
                                Цена: {product.price} р.
                            </Typography>
                        </Box>

                        <Box className={styles['product-details-buttons']}>
                            <Button
                                variant="contained"
                                className={styles['product-details-change-button']}
                                onClick={() => handleChangeProduct()}
                            >
                                Изменить
                            </Button>

                            <Button
                                variant="contained"
                                className={styles['product-details-delete-button']}
                                onClick={() => handleDeleteButton(product.id)}
                            >
                                Удалить
                            </Button>
                        </Box>

                        {changeProduct && (
                            <ProductModalChange onClose={handleCloseChangeProduct} product={product}/>
                        )}
                    </Box>
                ) : (
                    <Typography>Товара не существует</Typography>
                )}
            </Box>
        </Box>
    )
}