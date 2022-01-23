import React, {useEffect, useState} from "react";
import Spinner from "../Spinner";
import useFetch from "../../services/useFetch";
import * as Icon from 'react-bootstrap-icons';

export default function Trips() {
    const [month, setMonth] = useState("");

    const {data: trips, loading: loadingTrips, error: errorTrips} = useFetch("trips");
    const {data: wishlist, loading: loadingWishlist, error: errorWishlist} = useFetch("wishlist");

    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];



    function updateWishlist(trip){
        /*
        const currentWishlist = wishlist;
        if (currentWishlist.includes(trip.id)){
            currentWishlist.splice(currentWishlist.indexOf(trip.id), 1)
        }
        else {
            currentWishlist.push(trip.id)
        }
        console.log(currentWishlist)
        setWishList(currentWishlist)
 */
    }

    function renderTrip(trip) {
        return (
            <div className="col" key={trip.id}>
                <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{backgroundImage: `url(images/items/${trip.id}.jpg)`, backgroundRepeat: 'no-repeat'}}>
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{trip.title}</h2>
                        <ul className="d-flex list-unstyled mt-auto">
                            <li className="d-flex align-items-center me-3">
                                <Icon.GeoFill/>
                                <small>{trip.destination}</small>
                            </li>
                            <li className="d-flex align-items-center me-3" onClick={() => updateWishlist(trip)}>
                                {wishlist.includes(trip.id) ? <Icon.HeartFill size={20}/> :  <Icon.Heart size={20} />}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // if month selected then filter the trips from month === month
    const filteredTrips = month ? trips.filter((trip) => trip.startTrip[1] === parseInt(month)) : trips;

    // if error then throw the error
    if (errorTrips) throw errorTrips;
    if (loadingTrips) return <Spinner/>;
    // shorthand for react fragment
    return (
        <>
            <div>
                <main>
                    <section id="filters">
                        <div className="container">
                            <label htmlFor="month">Filter by Month:</label>
                            <select id="month"
                                    value={month}
                                    onChange={(e) => {
                                        setMonth(e.target.value);
                                    }}
                            >
                                <option value="">All Months</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">Mai</option>
                                <option value="6">June</option>
                            </select>
                            {filteredTrips && filteredTrips[0] ? null : <p>No Trips in {months[month]}</p>}

                            <label htmlFor="filterWishlist">Wishlist</label>
                            <input type={"checkbox"} id={"filterWishlist"}/>
                        </div>
                    </section>
                    <section id="products">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-1">
                                {filteredTrips.map(renderTrip)}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
