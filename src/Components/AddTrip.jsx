import React from "react";

export default function AddTrip(){
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    function addTrip(event){
        return fetch(baseUrl + "trips", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: [JSON.stringify({
                title: event.target[0].value,
                description: event.target[1].value,
                startTrip: event.target[2].value,
                endTrip: event.target[3].value,
                destination: event.target[4].value,
            })],
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <h2>Add a new Trip</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={event => {
                        event.preventDefault()
                        addTrip(event)
                    }}>
                        <div className="form">
                            <div className="mb-3">
                                <input placeholder="title" className="form-control" type="text" />
                            </div>
                            <div className="mb-3">
                                <input placeholder="description" className="form-control" type="text" />
                            </div>
                            <div className="mb-3">
                                <input placeholder="start" className="form-control" type="datetime-local" />
                            </div>
                            <div className="mb-3">
                                <input placeholder="end" className="form-control" type="datetime-local" />
                            </div>
                            <div className="mb-3">
                                <input placeholder="destination" className="form-control" type="text" />
                            </div>
                            <button className="btn btn-primary">Add Trip</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}