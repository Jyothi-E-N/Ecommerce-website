import React from "react";

const Review = ({ checkOutToken }) => {
    console.log(checkOutToken);
    return (
        <div className="">
            <h5 className=" float-left me-auto mb-3">Order Summary</h5>
            {checkOutToken.line_items.map((item) => (
                <div className="d-flex flex-row justify-content-between align-items-center p-2 mx-auto mb-3">
                    <div className="d-flex flex-column">
                        <h6 className="m-0 float-left">{item.product_name}</h6>
                        <p className="m-0">Quantity: {item.quantity}</p>
                    </div>
                    <h5>{item.price.formatted_with_symbol}</h5>
                </div>
            ))}
            <div className="p-2">
                <h6>Total</h6>
                <h6 className="fw-bold">{checkOutToken.live.total.formatted_with_symbol}</h6>
            </div>
        </div>
    );
};

export default Review;
