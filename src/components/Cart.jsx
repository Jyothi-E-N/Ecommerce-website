import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from ".";

const Cart = ({ cart, removeAll, updateQty, removeItem }) => {
    if (!cart.line_items) return "Loading...";
    const Swtch = cart.total_items ? true : false;
    console.log(cart);
    return (
        <div>
            {Swtch && (
                <div className="container px-4 py-3 overflow-hidden">
                    {cart.line_items.map((item) => (
                        <CartItem
                            item={item}
                            update={updateQty}
                            remove={removeItem}
                        />
                    ))}

                    <div className="w-100 text-end my-3">
                        <a
                            role="button"
                            className="clear-all-cart btn btn-dark btn-sm"
                            onClick={() => removeAll()}
                        >
                            <i
                                className="material-icons"
                                style={{ fontSize: "16px" }}
                            >
                                remove_shopping_cart
                            </i>{" "}
                            Remove All
                        </a>
                    </div>
                </div>
            )}

            {Swtch && (
                <div className="container bg-white my-5 py-2 price-details d-flex flex-row justify-content-around align-items-center">
                    <div>
                        <h4 className="m-0">${cart.subtotal.formatted}</h4>
                        <p
                            style={{ fontSize: "12px" }}
                            className="price-text m-0 text-primary"
                        >
                            total price
                        </p>
                    </div>
                    <Link to="/placeorder">
                        <button className="btn btn-sm btn-info my-3 text-white">
                            Place Order
                        </button>
                    </Link>
                </div>
            )}
            {/* if cart is empty  */}
            {!Swtch && (
                <div className="bg-white p-3 my-auto container">
                    <h2 className="fw-normal text-secondary text-center mb-3">
                        Your cart is empty!
                    </h2>
                    <p className="text-primary text-center mb-4">
                        Add items to it now
                    </p>
                    <div className="text-center w-100">
                        <Link to="/">
                            <button className="mb-3 btn btn-info text-center text-light">
                                Add items
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
