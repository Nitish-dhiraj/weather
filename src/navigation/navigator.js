import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../components/screens/home/Home'
import FrontPage from '../components/screens/frontpage/FrontPage'
import SearchPage from '../components/screens/searchpage/SearchPage'
import { LINKS } from "../components/constants";

export default function Navigator () {

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path={LINKS.home} element={<Home/>}/>
            <Route path={LINKS.searchpage} element={<SearchPage/>}/>
            
        </Routes>
        </BrowserRouter>

    )
}
