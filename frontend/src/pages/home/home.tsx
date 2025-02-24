import * as React from "react";
import {useEffect, useState} from "react";
import {NavBar, ProductCard, ProductModalChange, Sidebar} from "../../components/components";
import styles from "./style.module.css";
import {Product} from "../../data/models/Product.tsx";
import {Box, Button, Pagination, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {deleteProduct, fetchProducts} from "../../apis/productApi.ts";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [addNewProduct, setAddNewProduct] = useState<boolean>(false);
    const handleAddNewProduct = (flag: boolean) => {
        setAddNewProduct(flag);
    };
    const handleCloseAddNewProduct = async () => {
        setAddNewProduct(false);
    };

    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const handleSidebarToggle = () => {
        setIsSidebarClosed(!isSidebarClosed);
    };

    const [filters, setFilters] = useState({textMask: '', category: '', nonZeroQ: false});
    const handleFilters = (filters: { textMask: string; category: string; nonZeroQ: boolean }) => {
        setFilters(filters);
        setCurrentPage(1);
    };

    const handleProductClick = (product_id: string) => {
        navigate(`/products/${product_id}`);
    };

    const handleRemoveProduct = async (product_id: string) => {
        try {
            await deleteProduct(product_id);
            await loadProducts();
        } catch {
            setError("Ошибка при удалении товара");
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const loadProducts = async () => {
        try {
            const {products, totalAmount} = await fetchProducts(
                (currentPage - 1) * 10,
                10,
                filters.textMask,
                filters.category,
                filters.nonZeroQ
            );
            setProducts(products);
            setTotalCount(totalAmount);
            setIsLoading(false);
        } catch {
            setError("Ошибка при загрузке товаров");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [filters, currentPage, addNewProduct]);

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box>
            <Sidebar isOpen={isSidebarClosed} onClose={handleSidebarToggle} onFiltrate={handleFilters}/>
            <NavBar onSidebarToggle={handleSidebarToggle} isHome={true}/>

            <Box className={styles['box-button']}>
                <Button
                    variant="contained"
                    className={styles['add-new-button']}
                    onClick={() => handleAddNewProduct(true)}
                >
                    + Добавить новый товар
                </Button>
            </Box>

            {products.length !== 0 ? (
                <Box>
                    <Box className={styles.productsGrid}>
                        {products.map((product: Product, index: number) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onCardClick={() => handleProductClick(product.id)}
                                onDeleteClick={() => handleRemoveProduct(product.id)}
                            />
                        ))}
                    </Box>

                    <Pagination
                        count={Math.ceil(totalCount / 10)}
                        page={currentPage}
                        onChange={handlePageChange}
                        sx={{display: 'flex', justifyContent: 'center'}}
                    />
                </Box>
            ) : (
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px"}}>
                    <Typography>Ничего не найдено!</Typography>
                </Box>
            )}

            {addNewProduct && (
                <ProductModalChange onClose={handleCloseAddNewProduct} product={null}/>
            )}

            {isSidebarClosed && (
                <Box className={styles["blurOverlay"]} onClick={handleSidebarToggle}></Box>
            )}
        </Box>
    );
};