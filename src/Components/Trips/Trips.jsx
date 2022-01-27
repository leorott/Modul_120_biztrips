import React, {useEffect, useState} from "react";
import Spinner from "../Spinner";
import useFetch from "../../services/useFetch";
import * as Icon from 'react-bootstrap-icons';
import {Link} from "react-router-dom";

export default function Trips() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const {data: trips, loading: loadingTrips, error: errorTrips} = useFetch("trips");
    const {data: wishlist, loading: loadingWishlist, error: errorWishlist} = useFetch("wishlist");
    const [filteredTrips, setFilteredTrips] = useState([])
    const [filterByMonth, setFilterByMonth] = useState("");
    const [filterByWishlist, setFilterByWishlist] = useState(false)
    const [wishlistArray, setWishlistArray] = useState([]);

    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];
    useEffect(() => {
        const arr = []
        if (!loadingWishlist && wishlist && wishlist[0]){
            wishlist.forEach(li => {
                arr.push(li.tripId)
            })
        }
        console.log('arr', arr)
        setWishlistArray(arr)
    }, [wishlist, loadingWishlist]);

    useEffect(() => {
        setFilteredTrips(trips)
    }, [trips]);

    useEffect(() => {
        if (filterByMonth !== "" && !filterByWishlist){
            setFilteredTrips(trips
                .filter((trip) => trip.startTrip[1] === parseInt(filterByMonth)))
        }
        if (filterByMonth !== "" && filterByWishlist){
            setFilteredTrips(trips
                .filter((trip) => trip.startTrip[1] === parseInt(filterByMonth))
                .filter((trip) => wishlistArray.includes(trip.id) ? trip : null))
        }
        if (filterByMonth === "" && filterByWishlist){
            setFilteredTrips(trips
                .filter((trip) => wishlistArray.includes(trip.id) ? trip : null))
        }
        if (filterByMonth === "" && !filterByWishlist){
            setFilteredTrips(trips)
        }
    }, [filterByMonth, filterByWishlist]);

    // if error then throw the error
    if (errorTrips) throw errorTrips;
    if (loadingTrips) return <Spinner/>;
    // shorthand for react fragment

    async function updateWishlist(trip) {
        console.log('here')
        if (wishlistArray.includes(trip.id)) {
            console.log('delete')
            return fetch(baseUrl + "wishlist", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    tripId: trip.id
                })],
            });
        }
    else {
        console.log('create')
            return fetch(baseUrl + "wishlist", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: [JSON.stringify({
                    tripId: trip.id
                })],
            });
        }
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
                                {wishlistArray.includes(trip.id) ? <Icon.HeartFill size={20}/> :  <Icon.Heart size={20} />}
                            </li>
                            <li className="d-flex align-items-center me-3">
                                <Link to={`/trips/${trip.id}`} className="btn btn-primary">Show Details</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div>
                <main>
                    <section id="filters">
                        <div className="container">
                            <label htmlFor="month">Filter by Month</label>
                            <select id="month"
                                    value={filterByMonth}
                                    onChange={(e) => {
                                        setFilterByMonth(e.target.value);
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
                            <label htmlFor="filterWishlist">Wishlist</label>
                            <input type={"checkbox"} id={"filterWishlist"} onChange={(e) => {setFilterByWishlist(e.target.checked);}}/>
                        </div>
                    </section>
                    <section id="products">
                        <div className="container">
                            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-1">
                                {filteredTrips && filteredTrips[0] ? filteredTrips.map(renderTrip) : <p>No Trips in {months[filterByMonth]}</p>}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
