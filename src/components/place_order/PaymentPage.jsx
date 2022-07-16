import React from "react";
import {
    Elements,
    CardElement,
    ElementsConsumer,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(
    "pk_test_51KRrv6SHYNgjftQiw4Q7DshsJI99ouDLYkGfSL66AdUnrSaeWr31LsrK72rmC3BYxKBvtl0xyco7A0VLlpi7o3id00mQX3J3Tt"
);

const PaymentPage = ({
    handleGoBack,
    handlePage,
    shippingData,
    checkOutToken,
    onCapture
}) => {

    console.log(shippingData);

    const handleSubmit = async(event, elements, stripe) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkOutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email,
                },
                shipping: {
                    name: "Primary",
                    street: shippingData.address,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingDivision,
                    postal_zip_code: shippingData.zipCode,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };
            console.log(orderData);
            onCapture(checkOutToken.id, orderData);
            handlePage();
        }
    };
    return (
        <div className="p-3">
            <Review checkOutToken={checkOutToken} />
            <hr className="" />
            <h5 className=" float-left me-auto mb-3">Payment Method</h5>
            {/* calling stripe */}
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form
                            onSubmit={(e) => handleSubmit(e, elements, stripe)}
                        >
                            <CardElement />
                            <br />
                            <br />
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleGoBack()}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={!stripe}
                                    className="btn btn-sm btn-info"
                                >
                                    Pay{" "}
                                    {
                                        checkOutToken.live.total
                                            .formatted_with_symbol
                                    }
                                </button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    );
};

export default PaymentPage;
