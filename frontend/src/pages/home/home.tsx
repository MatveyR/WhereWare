import * as React from "react";
import {useState} from "react";
import {NavBar, ProductModalChange, ProductCard, Sidebar} from "../../components/components";
import styles from "./style.module.css";
import {Product} from "../../data/models/Product.tsx";
import {Box, Button, Pagination, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {removeProduct} from "../../data/store/slices/productSlice.tsx";
import {RootState} from "../../data/store/store.tsx";
import {useNavigate} from "react-router";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [addNewProduct, setAddNewProduct] = useState<boolean>(false);
    const handleAddNewProduct = (flag: boolean) => {
        setAddNewProduct(flag);
    }
    const handleCloseAddNewProduct = () => {
        setAddNewProduct(false);
    }

    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const handleSidebarToggle = () => {
        setIsSidebarClosed(!isSidebarClosed);
    }

    const [filters, setFilters] = useState({textMask: '', category: '', nonZeroQ: false});
    const handleFilters = (filters: { textMask: string, category: string, nonZeroQ: boolean }) => {
        setFilters(filters);
        setCurrentPage(1);
    };

    const handleProductClick = (product_id: string) => {
        navigate(`/products/${product_id}`)
    }

    const {products} = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();
    const handleRemoveProduct = (product_id: string) => {
        dispatch(removeProduct(product_id));
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
    const filtratedData = products.filter((product) => {
        return (
            (filters.textMask === '' || product.name.toLowerCase().includes(filters.textMask)) &&
            (!filters.nonZeroQ || product.quantity > 0) &&
            (filters.category === '' || product.category === filters.category)
        )
    });
    const paginatedData = filtratedData.reverse().slice((currentPage - 1) * 10, currentPage * 10);

    return (
        <Box>
            <Sidebar isOpen={isSidebarClosed} onClose={handleSidebarToggle} onFiltrate={handleFilters}/>
            <NavBar
                onSidebarToggle={handleSidebarToggle}
                isHome={true}
            />

            <Box className={styles['box-button']}>
                <Button
                    variant="contained"
                    className={styles['add-new-button']}
                    onClick={() => handleAddNewProduct(true)}
                >
                    + Добавить новый товар
                </Button>
            </Box>

            {filtratedData.length !== 0 ? (
                <Box>
                    <Box className={styles.productsGrid}>
                        {paginatedData.map((product: Product, index: number) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onCardClick={() => handleProductClick(product.id)}
                                onDeleteClick={() => handleRemoveProduct(product.id)}
                            />
                        ))}
                    </Box>

                    <Pagination
                        count={Math.ceil(filtratedData.length / 10)}
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

            {isSidebarClosed &&
                <Box
                    className={styles["blurOverlay"]}
                    onClick={handleSidebarToggle}
                ></Box>
            }
        </Box>
    );
};
