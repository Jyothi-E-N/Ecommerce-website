import React from "react";
import { Link } from "react-router-dom";

const DisplayCard = ({ prod, id, addToCart }) => {
    // return <div>Loading...</div
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-6 prod-cols overflow-hidden">
            <div
                className="card prod-card p-3 my-3 rounded-lg bg-white text-dark"
                style={{ minWidth: "200px!important" }}
            >
                <img
                    src={prod.image.url}
                    className="img-responsive img-fluid prod-img"
                />
                <div className="card-body prod-div">
                    <div className="d-flex flex-row justify-content-between">
                        <h6 className="text-info">{prod.name}</h6>
                        <h6>${prod.price.raw}</h6>
                    </div>
                    <p
                        dangerouslySetInnerHTML={{ __html: prod.description }}
                        className="text-start prod-desc mt-2"
                    ></p>
                    <a
                        role="button"
                        className="text-decoration-none pointer-cursor w-100 prod-btn my-3 p-1 text-info d-flex flex-row justify-content-end align-items-end addToCart"
                        onClick={() => addToCart(prod.id, 1)}
                    >
                        <span className="cart-add material-icons text-end">
                            add_shopping_cart
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DisplayCard;
