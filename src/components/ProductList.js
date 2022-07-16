import React from "react";
import { DisplayCard, NavBar } from ".";

const ProductList = ({ products, onAddToCart }) => {
    return (
        <>
            <div className="container overflow-hidden mb-5">
                <h4 className="prod-heading text-info mb-4">Products</h4>
                <div className="row no-gutters justify-content-center align-items-center">
                    {products.map((prod, id) => (
                        <DisplayCard
                            prod={prod}
                            addToCart={onAddToCart}
                            id={id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductList;
