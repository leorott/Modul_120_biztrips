import {Route, Routes} from "react-router-dom";
import About from "../Components/About";
import Trips from "../Components/Trips/Trips";
import Home from "../Components/Home";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/trips" element={<Trips />}/>
            <Route path="/about" element={<About />}/>
        </Routes>
    );
}

export default Router;
