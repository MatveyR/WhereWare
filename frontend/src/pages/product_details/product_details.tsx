import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import {NavBar, ProductModalChange} from "../../components/components.tsx";
import {useNavigate} from "react-router";
import styles from "./style.module.css";
import {useParams} from "react-router-dom";
import {deleteProduct, fetchProductById} from "../../apis/productApi.ts";
import {Product} from "../../data/models/Product.tsx";

export const ProductDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [changeProduct, setChangeProduct] = useState<boolean>(false);
    const handleChangeProduct = () => {
        setChangeProduct(true);
    };
    const handleCloseChangeProduct = async () => {
        setChangeProduct(false);
        await loadProduct();
    };

    const loadProduct = async () => {
        try {
            const productResponse = await fetchProductById(id!);
            setProduct(productResponse);
            setIsLoading(false);
        } catch {
            setError("Ошибка при загрузке продукта");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadProduct();
        }
    }, [id]);

    const handleDeleteButton = async (product_id: string) => {
        try {
            await deleteProduct(product_id);
            navigate("/");
        } catch {
            setError("Ошибка при удалении товара");
        }
    };

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!product) {
        return <Typography>Товара не существует</Typography>;
    }

    return (
        <Box>
            <NavBar
                onSidebarToggle={() => {}}
                isHome={false}
            />

            <Box className={styles['product-details-body']}>
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
                        Категория: {product.category_name || "Не указано"}
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
                        onClick={handleChangeProduct}
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
                    <ProductModalChange onClose={handleCloseChangeProduct} product={product} />
                )}
            </Box>
        </Box>
    );
};