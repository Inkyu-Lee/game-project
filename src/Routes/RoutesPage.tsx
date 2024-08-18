import { Route, Routes, useLocation } from "react-router-dom";
import ArticleUpdate from "../Pages/ArticleUpdate";
import ArticleView from "../Pages/ArticleView";
import Board from "../Pages/Board";
import EditorPage from "../Pages/EditorPage";
import LottoPage from "../Pages/LottoPage";
import RpsGamePage from "../Pages/RpsGamePage";

const RoutesPage: React.FC = () => {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/article/update/:articleId" element={<ArticleUpdate/>} />
            <Route path="/article/:articleId" element={<ArticleView/>} />
            <Route path="/" element={<LottoPage />} />
            <Route path="/rps" element={<RpsGamePage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/article/create" element={<EditorPage />} />
        </Routes>
    );
};

export default RoutesPage;