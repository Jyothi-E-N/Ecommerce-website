import React from "react";
import { Link } from "react-router-dom";

let ConfirmPage = ({ handleGoBack, error, order }) => {
    if(error) return (
        <div className="p-3">
            <h5 className="text-danger text-center fs-5">{error}</h5>
            <Link to="/">
                <button className="btn btn-sm btn-secondary mx-auto text-center">
                    Back to home
                </button>{" "}
            </Link>
        </div>
    );
    return order.customer ? (
        <div className="p-3">
            <h5>Thank you for purchasing the order {order.customer.firstname} {order.customer.lastname}</h5>
            <Link to="/">
                <button className="btn btn-sm btn-secondary mx-auto text-center">
                    Back to home
                </button>{" "}
            </Link>
        </div>
    ) : (
        <div className="">
            Loading
        </div>
    );

};

export default ConfirmPage;