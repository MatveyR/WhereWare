import React, {useState} from "react";
import styles from "../../product/product_modal_change/style.module.css";
import {Box, Button, Modal, TextField, Typography} from '@mui/material';
import {Category} from "../../../data/models/Category.tsx";
import {addCategory, updateCategory} from "../../../apis/categoryApi.ts";

interface CategoryModalChangeProps {
    onClose: () => void;
    category: Category | null;
}

export const CategoryModalChange: React.FC<CategoryModalChangeProps> = ({onClose, category}) => {
    const [categoryName, setCategoryName] = useState(category ? category.name : "");
    const [categoryDescription, setCategoryDescription] = useState(category ? category.description : "");

    const [nameError, setNameError] = useState<string | null>(null);

    const handleSaveCategory = async() => {
        if (categoryName === "") {
            setNameError("Обязательное поле");
            return;
        }

        try {
            if (!category) {
                const response = await addCategory({name: categoryName, description: categoryDescription, id: "", productCount: 0});
                console.log(response.data);
            } else {
                const response = await updateCategory(category);
                console.log(response.data);
            }
            onClose();
        } catch (error) {
            console.error("Ошибка при сохранении категории:", error);
        }
    };

    return (
        <Modal open={true} onClose={onClose} className={styles['modal']}>
            <Box className={styles['modal-content']}>
                <Typography className={styles['modal-label']}>
                    {category ? "Изменение категории" : "Добавление новой категории"}
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
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value)
                            }}
                        />
                    </Box>

                    <Box className={styles['modal-form-option']}>
                        <Typography>
                            Описание:
                        </Typography>
                        <TextField
                            size="small"
                            value={categoryDescription}
                            onChange={(e) => {
                                setCategoryDescription(e.target.value)
                            }}
                        />
                    </Box>
                </Box>
                <Box className={styles['modal-box-save-button']}>
                    <Button
                        className={styles['modal-save-button']}
                        variant="contained"
                        onClick={() => handleSaveCategory()}
                    >
                        Сохранить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

