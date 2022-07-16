import React, { useState, useEffect } from "react";
import { commerce } from "../../lib/commerce";
import { useForm, FormProvider } from "react-hook-form";

const AddressPage = ({ handlePage, handleGoBack, token }) => {
    const methods = useForm();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingCountries, setShippingCountries] = useState("");
    const [shippingDivisions, setShippingDivisions] = useState("");
    const [shippingDivision, setShippingDivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const options = shippingOptions
        ? shippingOptions.map((so) => ({
            id: so.id,
            label: `${so.description}-${so.price.formatted_with_symbol}`,
        }))
        : [];

    // fetch shipping contries
    const fetchShippingCountries = async (token) => {
        const { countries } =
            await commerce.services.localeListShippingCountries(token);
        //  storing the key of the first country in the shipping countries list
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    // fetch the shipping divisions
    const fetchShippingDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );
        setShippingDivisions(subdivisions);
        setShippingDivision(Object.keys(subdivisions)[0]);
    };

    // fetch shipping options available to specific region
    const fetchShippingOptions = async (token, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(token, {
            country,
            region,
        });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    console.log(shippingOption);

    // call the shipping countries to fetch shipping countries from commerce.js
    useEffect(() => {
        fetchShippingCountries(token.id);
    }, []);

    // call the subdivisions of selected country from commerce.js
    // only when the shipping country is selected

    useEffect(() => {
        if (shippingCountry) fetchShippingDivisions(shippingCountry);
    }, [shippingCountry]);

    // after the subdivision we can get the shipping options

    useEffect(() => {
        if (shippingDivision)
            fetchShippingOptions(token.id, shippingCountry, shippingDivision);
    }, [shippingDivision]);

    return (
        <div className="border ship-details mx-auto p-3">
            <h4 className="">Address details</h4>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(() =>
                        handlePage({ firstName , lastName, address, email, city, zipCode, shippingCountry, shippingDivision, shippingOption})
                    )}
                    className="needs-validation mt-4 align-items-center"
                    novalidate
                >
                    <div className="row g-1 align-items-center justify-content-around">
                        {/* firstName */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <input
                                type="text"
                                className="form-control-sm form-control inputfield rounded-lg border-0 mb-3"
                                id="firstName"
                                placeholder="Enter your first name "
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <label for="firstName" className="">
                                First name
                            </label>
                        </div>
                        {/* Last Name */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <input
                                type="text"
                                className="form-control-sm form-control inputfield rounded-lg border-0 mb-3"
                                id="lastName"
                                placeholder="Enter your first name "
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <label for="lastName" className="">
                                Last name
                            </label>
                        </div>
                        {/*  Address */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <input
                                type="text"
                                className="form-control-sm form-control inputfield rounded-lg border-0 mb-3"
                                id="address"
                                placeholder="Enter your first name "
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <label for="address" className="">
                                Address
                            </label>
                        </div>
                        {/* email */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <input
                                type="email"
                                className="form-control-sm form-control inputfield rounded-lg border-0 mb-3"
                                id="email"
                                placeholder="Enter your first name "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label for="email" className="">
                                Email
                            </label>
                        </div>
                        {/* City */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <input
                                type="city"
                                className="form-control-sm form-control inputfield rounded-lg border-0 mb-3"
                                id="city"
                                placeholder="Enter your first name "
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                            <label for="city" className="">
                                City
                            </label>
                        </div>
                        {/* Zip code */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <input
                                type="number"
                                className="form-control-sm form-control inputfield rounded-lg border-0 mb-3"
                                id="zipCode"
                                placeholder="Enter your first name "
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required
                            />
                            <label for="zipCode" className="">
                                Zip/ Pin code
                            </label>
                        </div>
                        {/* Shipping country */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <select
                                className="form-select form-select-sm form-control form-control-sm inputfield rounded-lg border-0 mb-3"
                                id="shippingCountry"
                                required
                                value={shippingCountry}
                                onChange={(e) =>
                                    setShippingCountry(e.target.value)
                                }
                            >
                                <option selected disabled value="">
                                    Choose...
                                </option>
                                {Object.entries(shippingCountries).map(
                                    (country) => (
                                        <option value={country[0]}>
                                            {country[1]}
                                        </option>
                                    )
                                )}
                            </select>
                            <label for="shippingCountry" className="">
                                Shipping Country
                            </label>
                        </div>
                        {/* Shipping subdivisions */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <select
                                className="form-select form-select-sm form-control form-control-sm inputfield rounded-lg border-0 mb-3"
                                id="shippingDivision"
                                required
                                value={shippingDivision}
                                onChange={(e) =>
                                    setShippingDivision(e.target.value)
                                }
                            >
                                <option selected disabled value="">
                                    Choose...
                                </option>
                                {Object.entries(shippingDivisions).map(
                                    (division) => (
                                        <option value={division[0]}>
                                            {division[1]}
                                        </option>
                                    )
                                )}
                            </select>
                            <label for="shippingDivision" className="">
                                Shipping Division
                            </label>
                        </div>
                        {/* Shipping Options */}
                        <div class="col-12 col-sm-11 col-md-5 col-lg-5 form-floating input-group-sm">
                            <select
                                className="float-left form-select form-select-sm form-control form-control-sm inputfield rounded-lg border-0 mb-3"
                                id="shippingOption"
                                required
                                value={shippingOption}
                                onChange={(e) =>
                                    setShippingOption(e.target.value)
                                }
                            >
                                <option selected disabled value="">
                                    Choose...
                                </option>
                                {options.map((option) => (
                                    <option value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <label for="shippingOption" className="">
                                Shipping Option
                            </label>
                        </div>
                    </div>

                    {/* buttons */}
                    <div className="p-3 d-flex flex-row justify-content-between">
                        <button
                            onClick={() => handleGoBack()}
                            className="btn btn-sm btn-secondary"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="btn btn-sm btn-info"
                        >
                            Next
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddressPage;
