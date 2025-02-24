import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {Box, Button, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {Product} from "../../../data/models/Product.tsx";
import {addProduct, updateProduct} from "../../../apis/productApi.ts";
import {Category} from "../../../data/models/Category.tsx";
import {fetchCategories} from "../../../apis/categoryApi.ts";

interface ProductModalChangeProps {
    onClose: () => void;
    product: Product | null;
}

export const ProductModalChange: React.FC<ProductModalChangeProps> = ({onClose, product}) => {
    const [productName, setProductName] = useState(product ? product.name : "");
    const [productCategory, setProductCategory] = useState(product ? product.category_name : "");
    const [productDescription, setProductDescription] = useState(product ? product.description : "");
    const [productQuantity, setProductQuantity] = useState(product ? product.quantity : null);
    const [productPrice, setProductPrice] = useState(product ? product.price : null);
    const [productImage, setProductImage] = useState<string | null>(product ? (product.image ? product.image : null) : null);
    const [productUnit, setProductUnit] = useState(product ? product.unit : "шт");

    const [nameError, setNameError] = useState<string | null>(null);
    const [descError, setDescError] = useState<string | null>(null);
    const [catError, setCatError] = useState<string | null>(null);
    const [quanError, setQuanError] = useState<string | null>(null);
    const [priceError, setPriceError] = useState<string | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);

    const loadCategories = async () => {
        try {
            const categoriesResponse = await fetchCategories();
            setCategories(categoriesResponse);
        } catch {
            console.error("Ошибка при загрузке категорий");
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const resetErrors = () => {
        setNameError(null);
        setDescError(null);
        setCatError(null);
        setQuanError(null);
        setPriceError(null);
    };

    const cat = categories.find((it) => (it.name === productCategory));
    if (cat) {
        setProductCategory(cat.id);
    }

    const handleSaveProduct = async () => {
        resetErrors();
        let errorFlag = false;
        if (productName === "") {
            setNameError("Обязательное поле");
            errorFlag = true;
        }
        if (!productDescription || productDescription === "") {
            setDescError("Обязательное поле");
            errorFlag = true;
        }
        if (!productCategory || productCategory === "") {
            setCatError("Обязательное поле");
            errorFlag = true;
        }
        if (productQuantity === null || isNaN(productQuantity)) {
            setQuanError("Обязательное поле");
            errorFlag = true;
        }
        if (productPrice === null || isNaN(productPrice)) {
            setPriceError("Обязательное поле");
            errorFlag = true;
        }
        if (errorFlag) {
            return;
        }

        const categoryId = categories.find((it) => (it.name === productCategory));
        if (categoryId) {
            setProductCategory(categoryId.id);
        }
        const newProduct = {
            id: product ? product.id : "",
            name: productName,
            description: productDescription,
            category_name: productCategory,
            quantity: productQuantity!,
            price: productPrice!,
            unit: productUnit!,
            image: productImage || null,
        };

        try {
            if (!product) {
                const response = await addProduct(newProduct);
                console.log("Продукт добавлен:", response.data);
            } else {
                const response = await updateProduct(newProduct);
                console.log("Продукт обновлен:", response.data);
            }
            onClose();
        } catch (error) {
            console.error("Ошибка при сохранении продукта:", error);
        }
    };

    return (
        <Modal open={true} onClose={onClose} className={styles['modal']}>
            <Box className={styles['modal-content']}>
                <Typography className={styles['modal-label']}>
                    {product ? "Изменение товара" : "Добавление нового товара"}
                </Typography>

                <Box className={styles['modal-form']}>
                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Название:
                        </Typography>
                        <TextField
                            size="small"
                            error={!!nameError}
                            helperText={nameError}
                            value={productName}
                            onChange={(e) => {
                                setProductName(e.target.value)
                            }}
                        />
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Описание:
                        </Typography>
                        <TextField
                            size="small"
                            error={!!descError}
                            helperText={descError}
                            value={productDescription}
                            onChange={(e) => {
                                setProductDescription(e.target.value)
                            }}
                        />
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Категория:
                        </Typography>
                        <Select
                            size="small"
                            variant="outlined"
                            value={productCategory}
                            error={!!catError}
                            onChange={(e) => {
                                setProductCategory(e.target.value)
                            }}
                        >
                            {categories.map((category) =>
                                <MenuItem value={category.id}>{category.name}</MenuItem>
                            )}
                        </Select>
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Количество, шт.:
                        </Typography>
                        <TextField
                            size="small"
                            error={!!quanError}
                            helperText={quanError}
                            value={productQuantity === null ? "" : productQuantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || !isNaN(Number(value))) {
                                    setProductQuantity(value === "" ? null : Number(value));
                                }
                            }}
                        />
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Ед. измерения:
                        </Typography>
                        <Select
                            size="small"
                            variant="outlined"
                            value={productUnit || "шт"}
                            onChange={(e) => {
                                setProductUnit(e.target.value)
                            }}
                        >
                            <MenuItem value="шт">шт</MenuItem>
                            <MenuItem value="кг">кг</MenuItem>
                            <MenuItem value="л">л</MenuItem>
                        </Select>
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Цена, р.:
                        </Typography>
                        <TextField
                            size="small"
                            error={!!priceError}
                            helperText={priceError}
                            value={productPrice === null ? "" : productPrice}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "" || !isNaN(Number(value))) {
                                    setProductPrice(value === "" ? null : Number(value));
                                }
                            }}
                        />
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            URL фотографии:
                        </Typography>
                        <TextField
                            size="small"
                            value={productImage || ""}
                            onChange={(e) => {
                                setProductImage(e.target.value || null);
                            }}
                        />
                    </Box>
                </Box>
                <Box className={styles['modal-box-save-button']}>
                    <Button
                        className={styles['modal-save-button']}
                        variant="contained"
                        onClick={handleSaveProduct}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

