import React, { StrictMode } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import clsx from "https://esm.sh/clsx";
import { Heart, Plane, Tag } from "https://esm.sh/lucide-react";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement("main", null,
        React.createElement(FlightCard, { city: "New York", flightClass: "Economy", price: 120, airportCode: "JFK", imageUrl: "https://assets.codepen.io/416221/new-york-city.jpeg" }),
        React.createElement(FlightCard, { city: "San Francisco", flightClass: "Premium economy", price: 240, airportCode: "SFO", imageUrl: "https://assets.codepen.io/416221/golden-gate-bridge.jpeg", isSplit: true }))));
function FlightCard({ city, flightClass, price, airportCode, imageUrl, isSplit = false }) {
    const priceFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
    }).format(price);
    return (React.createElement("div", { className: clsx("flight-card", isSplit && "flight-card--split") },
        React.createElement("div", { className: "flight-card__image-container" },
            React.createElement("img", { className: "flight-card__image", src: imageUrl, alt: city, width: 310, height: isSplit ? 310 : 545 })),
        !isSplit && React.createElement(React.Fragment, null,
            React.createElement("div", { className: "flight-card__overlay" }),
            React.createElement(FlightCardFav, { isGlass: true })),
        React.createElement("div", { className: "flight-card__content" },
            React.createElement("h2", { className: "flight-card__title" }, city),
            React.createElement("p", { className: "flight-card__class" }, flightClass),
            React.createElement("div", { className: "flight-card__details" },
                React.createElement(FlightCardDetailItem, { icon: Tag },
                    "from ",
                    React.createElement("strong", null, priceFormatted)),
                React.createElement(FlightCardDetailItem, { icon: Plane },
                    React.createElement("strong", null, airportCode))),
            React.createElement("div", { className: "flight-card__actions" },
                React.createElement(FlightCardSearch, null),
                isSplit && React.createElement(FlightCardFav, null)))));
}
function FlightCardDetailItem({ icon: Icon, children }) {
    return (React.createElement("div", { className: "flight-card__detail-item" },
        React.createElement(Icon, { size: 16 }),
        React.createElement("span", null, children)));
}
function FlightCardFav({ isGlass }) {
    return (React.createElement("button", { className: clsx("flight-card__favorite-btn", isGlass && "flight-card__favorite-btn--glass"), type: "button", title: "Add to favorites" },
        React.createElement(Heart, { size: 18, strokeWidth: 2 })));
}
function FlightCardSearch() {
    return (React.createElement("button", { className: "flight-card__search-btn", type: "button" }, "Search flight"));
}