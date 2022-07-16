import React from "react";

const CartItem = ({ item , remove, update}) => {
    
    return (
        <div
            className="cart-items-card row d-flex justify-content-around align-items-center bg-white overflow-hidden mb-4 py-3 px-2 rounded"
            style={{ letterSpacing: "0.02rem" }}
        >
            <div className="col-sm-8 col-6 justify-content-around">
                <h5 className="text-info fw-normal lh-1">
                    {item.product_name}
                </h5>
                <h6 className="my-2 lh-1">${item.price.formatted}</h6>
                <div className="mt-4 d-flex flex-row align-items-center">
                    <a
                        role="button"
                        className="inc-quantity text-decoration-none btn btn-default text-dark    border-left border-top border-bottom"
                        onClick={() => update(item.id, item.quantity + 1)}
                    >
                        +
                    </a>
                    <p className=" border-top border-bottom py-2 px-2 fw-normal mb-0">
                        Qty: {item.quantity}
                    </p>
                    <a
                        role="button"
                        className="dec-quantity border-top border-right border-bottom text-decoration-none btn btn-default text-dark"
                        onClick={() => update(item.id, item.quantity - 1)}
                    >
                        -
                    </a>
                </div>
            </div>
            <div className="col-sm-3 col-4 col-md-2 image-col text-end">
                <img
                    src={item.image.url}
                    className="img-fluid img-thumbnail cart-img h-50 bg-light"
                />
                <div className=" d-flex align-items-center justify-content-end ">
                    <a
                        role="button"
                        className="clear-each-item btn btn-sm btn-default text-danger mt-2 "
                        onClick={()=>remove(item.id)}
                    >
                        <i
                            className="material-icons"
                            style={{ fontSize: "16px" }}
                        >
                            clear
                        </i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CartItem;