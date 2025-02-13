import * as React from "react";
import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {NavBar} from "../../components/navbar/navbar.tsx";
import styles from './style.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../data/store/store.tsx";
import {removeCategory} from "../../data/store/slices/categorySlice.tsx";
import {Category} from "../../data/models/Category.tsx";
import {useState} from "react";
import {CategoryModalChange} from "../../components/category/category_modal_change/category_modal_change.tsx";

export const CategoriesPage: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.categories)
    const products = useSelector((state: RootState) => state.products.products)
    const dispatch = useDispatch();

    const handleDeleteButton = (category_id: string) => {
        dispatch(removeCategory(category_id))
    }

    const [changeCategory, setChangeCategory] = useState<Category | null>(null);
    const handleChangeCategory = (category: Category) => {
        setChangeCategory(category);
    }
    const handleCloseChangeCategory = () => {
        setChangeCategory(null);
    }

    const [addCategory, setAddCategory] = useState<boolean>(false);
    const handleAddCategory = () => {
        setAddCategory(true);
    }
    const handleCloseAddCategory = () => {
        setAddCategory(false);
    }

    const getProductsAmmount = (category_id: string) => {
        return products.filter((product) => product.category_id === category_id).length
    }

    return (
        <Box>
            <NavBar
                onSidebarToggle={() => {
                }}
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
                        onClick={() => handleAddCategory()}
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
                                    <TableCell className={styles['categories-table-cell']}>{getProductsAmmount(category.id)}</TableCell>
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
                <CategoryModalChange category={changeCategory} onClose={handleCloseChangeCategory}/>
            )}

            {addCategory && (
                <CategoryModalChange category={null} onClose={handleCloseAddCategory}/>
            )}
        </Box>
    )
}