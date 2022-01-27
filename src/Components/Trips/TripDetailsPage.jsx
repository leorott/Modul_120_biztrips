import React, {useEffect, useState} from "react";
import Spinner from "../Spinner";
import useFetch from "../../services/useFetch";
import {useParams} from "react-router-dom";

export default function TripDetailsPage(){

    const params = useParams()
    const {data: trip, loading: loadingTrips, error: errorTrips} = useFetch(`trips/?id=${params.id}`);

    // if error then throw the error
    if (errorTrips) throw errorTrips;
    if (loadingTrips) return <Spinner/>;
    // shorthand for react fragment

    return (
        <div className="container">
            {trip.map(trip => (
                <div key={trip.id} className="row mb-3">
                    <div className="col-md">
                        <div className="pb-3">
                            <h3 className="p-0">Title</h3>
                            <p>{trip.title}</p>
                        </div>
                        <div className="pb-3">
                            <h3 className="p-0">Description</h3>
                            <p>{trip.description}</p>
                        </div>
                        <div className="pb-3">
                            <h3 className="p-0">Destination</h3>
                            <p>{trip.destination}</p>
                        </div>
                        <div className="pb-3">
                            <h3 className="p-0">Start date</h3>
                            <p>{`${trip.startTrip[2]}.${trip.startTrip[1]} ${trip.startTrip[0]} at ${trip.startTrip[3]}:${trip.startTrip[4]}`}</p>
                        </div>
                        <div className="pb-3">
                            <h3 className="p-0">End date</h3>
                            <p>{`${trip.endTrip[2]}.${trip.endTrip[1]} ${trip.endTrip[0]} at ${trip.endTrip[3]}:${trip.endTrip[4]}`}</p>
                        </div>
                    </div>
                        <div className="col-md">
                            <img src={`${window.location.origin}/images/items/${trip.id}.jpg`} className="img-fluid" style={{}}/>
                        </div>

                </div>
            ))}
        </div>
    )
}