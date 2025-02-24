import * as React from "react";
import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {NavBar} from "../../components/navbar/navbar.tsx";
import styles from './style.module.css';
import {Category} from "../../data/models/Category.tsx";
import {useEffect, useState} from "react";
import {CategoryModalChange} from "../../components/category/category_modal_change/category_modal_change.tsx";
import {deleteCategory, fetchCategories} from "../../apis/categoryApi.ts";

export const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [changeCategory, setChangeCategory] = useState<Category | null>(null);
    const handleChangeCategory = (category: Category) => {
        setChangeCategory(category);
    };
    const handleCloseChangeCategory = async () => {
        setChangeCategory(null);
        await loadCategories();
    };

    const [addCategory, setAddCategory] = useState<boolean>(false);
    const handleAddCategory = () => {
        setAddCategory(true);
    };
    const handleCloseAddCategory = async () => {
        setAddCategory(false);
        await loadCategories();
    };

    const loadCategories = async () => {
        try {
            const categoriesResponse = await fetchCategories();
            setCategories(categoriesResponse);
            setIsLoading(false);
        } catch {
            setError("Ошибка при загрузке категорий");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleDeleteButton = async (category_id: string) => {
        try {
            await deleteCategory(category_id);
            await loadCategories();
        } catch {
            setError("Ошибка при удалении категории");
        }
    };

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box>
            <NavBar
                onSidebarToggle={() => {}}
                isHome={false}
            />

            <Box className={styles['categories-body']}>
                <Typography className={styles['categories-label']}>
                    Категории товаров:
                </Typography>

                <Box>
                    <Button
                        variant="contained"
                        className={styles['categories-add-button']}
                        onClick={handleAddCategory}
                    >
                        + Добавить новую категорию
                    </Button>
                </Box>

                <Paper elevation={3} className={styles['categories-table']}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles['categories-table-head']}>ID</TableCell>
                                <TableCell className={styles['categories-table-head']}>Название</TableCell>
                                <TableCell className={styles['categories-table-head']}>Описание</TableCell>
                                <TableCell className={styles['categories-table-head']}>Товаров в категории</TableCell>
                                <TableCell className={styles['categories-table-head']}>Управление</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className={styles['categories-table-cell']}>{category.id}</TableCell>
                                    <TableCell className={styles['categories-table-cell']}>{category.name}</TableCell>
                                    <TableCell className={styles['categories-table-cell']}>{category.description}</TableCell>
                                    <TableCell className={styles['categories-table-cell']}>{category.productCount}</TableCell>
                                    {category.id !== "0" ? (
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                className={styles['categories-table-change-button']}
                                                onClick={() => handleChangeCategory(category)}
                                            >
                                                Изменить
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className={styles['categories-table-delete-button']}
                                                onClick={() => handleDeleteButton(category.id)}
                                            >
                                                Удалить
                                            </Button>
                                        </TableCell>
                                    ) : (
                                        <TableCell></TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>

            {changeCategory && (
                <CategoryModalChange category={changeCategory} onClose={handleCloseChangeCategory} />
            )}

            {addCategory && (
                <CategoryModalChange category={null} onClose={handleCloseAddCategory} />
            )}
        </Box>
    );
};