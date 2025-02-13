import React, {useState} from "react";
import styles from "./style.module.css";
import {Box, Button, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store/store.tsx";
import {addProduct, updateProduct} from "../../../data/store/slices/productSlice.tsx";
import {Product} from "../../../data/models/Product.tsx";

interface ProductModalChangeProps {
    onClose: () => void;
    product: Product | null;
}

export const ProductModalChange: React.FC<ProductModalChangeProps> = ({onClose, product}) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [productName, setProductName] = useState(product ? product.name : "");
    const [productCategory, setProductCategory] = useState(product ? product.category : "");
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

    const resetErrors = () => {
        setNameError(null);
        setDescError(null);
        setCatError(null);
        setQuanError(null);
        setPriceError(null);
    };

    const handleSaveProduct = () => {
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

        const category = categories.find((category) => category.name === productCategory);
        let category_id = "0";
        if (category) {
            category_id = category.id;
        }

        if (!product) {
            dispatch(
                addProduct({
                    id: Date.now().toString(),
                    name: productName,
                    description: productDescription,
                    category: productCategory,
                    category_id: category_id,
                    quantity: productQuantity!,
                    price: productPrice!,
                    unit: productUnit,
                    image: productImage
                })
            );
        } else {
            dispatch(
                updateProduct({
                    id: product.id,
                    name: productName,
                    description: productDescription,
                    category: productCategory,
                    category_id: category_id,
                    quantity: productQuantity!,
                    price: productPrice!,
                    unit: productUnit,
                    image: productImage
                })
            )
        }
        onClose();
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
                            value={productCategory || "Любое"}
                            error={!!catError}
                            onChange={
                                (e) => {
                                    setProductCategory(e.target.value)
                                }
                            }
                        >
                            {categories.map((category) =>
                                <MenuItem value={category.name}>{category.name}</MenuItem>
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
                            value={productQuantity}
                            onChange={(e) => {
                                setProductQuantity(Number(e.target.value))
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
                            onChange={
                                (e) => {
                                    setProductUnit(e.target.value)
                                }
                            }
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
                            value={productPrice}
                            onChange={(e) => {
                                setProductPrice(Number(e.target.value))
                            }}
                        />
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            URL фотографии:
                        </Typography>
                        <TextField
                            size="small"
                            value={productImage}
                            onChange={(e) => {
                                setProductImage(e.target.value)
                            }}
                        />
                    </Box>
                </Box>
                <Box className={styles['modal-box-save-button']}>
                    <Button
                        className={styles['modal-save-button']}
                        variant="contained"
                        onClick={() => handleSaveProduct()}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

