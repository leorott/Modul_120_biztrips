import React, {useState} from "react";
import Spinner from "./Spinner";
import useFetch from "../../services/useFetch";

export default function Trips() {
    const [month, setMonth] = useState("");

    const {data: trips, loading: loadingTrips, error: errorTrips} = useFetch("trips");
    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

    function renderTrip(trip) {
        return (
            <div className="container" key={trip.id}>
            <div className="col">
                <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{backgroundImage: `url(images/items/${trip.id}.jpg)`, objectFit: 'contain'}}>
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{trip.title}</h2>
                        <ul className="d-flex list-unstyled mt-auto">
                            <li className="d-flex align-items-center me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/></svg>
                                <small>{trip.destination}</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    // if month selected then filter the trips from month === month
    const filteredTrips = month
        ? trips.filter((t) => t.startTrip[1] === parseInt(month))
        : trips;

    // if error then throw the errror
    if (errorTrips) throw errorTrips;
    if (loadingTrips) return <Spinner/>;
    // shorthand for react fragment
    return (
        <>
            <div>
                <main>
                    <section id="filters">
                        <label htmlFor="month">Filter by Month:</label>
                        <select
                            id="month"
                            value={month} // controlled component
                            onChange={(e) => {
                                //debugger;
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
                        {month && (
                            <h2>
                                Found {filteredTrips.length}
                                {filteredTrips.length > 1 ? " trips" : " trip"} for the month of
                                {" " + months[month]}
                            </h2>
                        )}

                    </section>
                    <section id="products">{filteredTrips.map(renderTrip)}</section>
                </main>
            </div>
        </>
    );
}
