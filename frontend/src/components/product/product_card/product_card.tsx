import * as React from 'react';
import Card from '@mui/material/Card';
import styles from "./style.module.css";
import {Box, Button, Tooltip, Typography} from "@mui/material";

interface ProductCardProps {
    product: {
        id: string
        name: string;
        description?: string;
        category: string;
        quantity: number;
        unit: string;
        price: number;
        image?: string | null;
    };
    onCardClick: () => void;
    onDeleteClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, onCardClick, onDeleteClick}) => {
    return (
        <Tooltip title={product.description} arrow>
            <Card className={styles['card']}>
                <Box onClick={onCardClick}>
                    <Typography className={styles['card-product-name']}>
                        {product.name}
                    </Typography>

                    <Box
                        component="img"
                        src={product.image ?? "https://pic.onlinewebfonts.com/svg/img_47726.svg"}
                        alt="product" className={styles['card-product-img']}
                    />

                    <Box className={styles['props-box']}>
                        <Typography className={styles['card-prop']}>
                            Категория: {product.category}
                        </Typography>

                        <Typography className={styles['card-prop']}>
                            Количество: {product.quantity} {product.unit}
                        </Typography>

                        <Typography className={styles['card-prop']}>
                            Цена: {product.price} р.
                        </Typography>
                    </Box>
                </Box>

                <Button className={styles['card-delete-button']} onClick={onDeleteClick} variant="contained">
                    Удалить
                </Button>
            </Card>
        </Tooltip>
    );
};
