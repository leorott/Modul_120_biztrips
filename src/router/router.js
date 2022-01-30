import {Route, Routes} from "react-router-dom";
import About from "../Components/About";
import Trips from "../Components/Trips/Trips";
import Home from "../Components/Home";
import TripDetailsPage from "../Components/Trips/TripDetailsPage";
import AddTrip from "../Components/AddTrip";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/trips" element={<Trips />}/>
            <Route path="/trips/:id" element={<TripDetailsPage />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/add-trip" element={<AddTrip />}/>
        </Routes>
    );
}

export default Router;
