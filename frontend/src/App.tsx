import {HomePage, ProductDetailsPage, CategoriesPage} from "./pages/pages";
import {Route, Routes} from "react-router-dom";
import {ProfilePage} from "./pages/profile/Profile.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/products/:id" element={<ProductDetailsPage/>}/>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/profile/:id" element={<ProfilePage/>}/>
        </Routes>
    )
}

export default App