import React, {useState} from "react";
import { Cart } from ".";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/fashopy_logo.png";
import search_icon from "../assets/search_icon.png";

const NavBar = ({ totalItems }) => {
    const location = useLocation();
    const [searchval, setSearchval] = useState("");
    // useLocation is a hook use to modify some
    // content based on the current page

    return (
        <div className="navbar text-light navbar-light mb-0 justify-content-between px-5 border-0 outline-0">
            <div className="d-flex flex-row justify-content-between w-100">
                <div className="d-flex flex-row justify-content-around left_tabs align-items-center">
                    <Link
                        to="/"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                        <img className="img-fluid img-responsive fashopy_logo" src={logo} alt="logo"/>
                    </Link>      
                    <Link
                        to="/"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                        
                    >
                        <p className="services_tab m-0">Services</p>
                    </Link>
                    <Link
                        to="/"
                        style={{ textDecoration: "inherit", color: "inherit" }}
                        
                    >
                        <p className="services_tab m-0">About</p>
                    </Link>
                    <div className="inp_div d-flex flex-row">
                        <img src={search_icon} className="img-fluid search_icon" alt="search icon" />
                        <input className="form-control inp border-0 outline-0 rounded-pill" type="text" name="search_product" placeholder="Seach products..." value={searchval} onChange={(e)=>{setSearchval(e.target.value)}}/> 
                    </div>
                    
                </div>
                <div className="d-flex flex-row justify-content-around">
                    {location.pathname == "/" && (
                        <Link
                            to="/cart"
                            style={{ textDecoration: "inherit", color: "inherit" }}
                        >
                            <a role="button">
                                <i className="material-icons cart_icon" badgeContent={totalItems}>
                                    shopping_cart
                                </i>
                                <span
                                    id="badge"
                                    className="badge text-light bg-danger rounded-pill badge-notification text-start border"
                                >
                                    {totalItems}
                                </span>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
            
            
            {/* only on home page display the cart icon with a badge 
                denoting number of items in the cart */}

            
        </div>
    );
};

export default NavBar;
