import { commerce } from "../../lib/commerce";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddressPage, ConfirmPage, PaymentPage } from "..";

const PlaceOrder = ({ cart, onCapture, error, order }) => {
    // Address, payment
    const [curState, setCurState] = useState(0);
    const [checkOutToken, setCheckOutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const navigate = useNavigate();

    // for different carts we should generate different token

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: "cart",
                });
                setCheckOutToken(token);
            } catch (error) {
            }
        };

        generateToken();
    }, [cart]);

    // styles for the buttons denoting the progress step
    const styleState = (num) => {
        if (num == 0) {
            return {
                border: "1px solid #0dcaf0",
                borderColor: "#0dcaf0",
                color: "#0dcaf0",
            };
        } else {
            if (curState == 0) {
                return {
                    border: "1px solid #adb5bd",
                    borderColor: "#adb5bd",
                    color: "#adb5bd",
                };
            } else
                return {
                    border: "1px solid #0dcaf0",
                    borderColor: "#0dcaf0",
                    color: "#0dcaf0",
                };
        }
    };

    // styles for the text and horizontal line
    const styleLine = (num) => {
        if (num == 0) {
            return {
                color: "#0dcaf0",
            };
        } else {
            if (curState == 0) {
                return {
                    color: "#adb5bd",
                };
            } else
                return {
                    color: "#0dcaf0",
                };
        }
    };

    // handle the dispay of next page when current page's
    // details are filled
    const handlePage = () => {
        setCurState(curState + 1);
    };

    // Go to the previous details page
    const handleGoBack = () => {
        curState === 0 ? navigate(-1) : setCurState(curState - 1);
    };

    const next = (data) => {
        setShippingData(data);
        handlePage();
    };

    return (
        <div
            className="container border p-3 mb-5 bg-white"
            style={{ maxWidth: "700px" }}
        >
            <h3 className="text-center">Checkout</h3>
            {/* Display progress bar if cur state is not 2 */}

            {curState != 2 && (
                <div className="path text-center d-flex flex-row justify-content-center align-items-center mb-5">
                    <div className="state text-center " style={styleState(0)}>
                        <p>1</p>
                    </div>
                    <p
                        className="mx-2 fs-7 my-auto text-center fs-6"
                        style={styleLine(0)}
                    >
                        Address
                    </p>
                    <hr
                        className="w-25 text-center line"
                        style={styleLine(1)}
                    />
                    <div
                        className="state text-center ms-2"
                        style={styleState(1)}
                    >
                        <p>2</p>
                    </div>
                    <p
                        className="mx-2 my-auto text-center fs-6"
                        style={styleLine(1)}
                    >
                        Payment
                    </p>
                </div>
            )}

            {/* Address page */}
            {curState === 0 && checkOutToken ? (
                <AddressPage
                    handlePage={next}
                    handleGoBack={handleGoBack}
                    token={checkOutToken ? checkOutToken : null}
                />
            ) : curState === 1 && checkOutToken ? (
                <PaymentPage
                    handleGoBack={handleGoBack}
                    handlePage={handlePage}
                    shippingData={shippingData}
                    checkOutToken={checkOutToken}
                    onCapture={onCapture}
                />
            ) : (
                checkOutToken && (
                    <ConfirmPage
                        handleGoBack={handleGoBack}
                        order={order}
                        error={error}
                    />
                )
            )}
        </div>
    );
};

export default PlaceOrder;
