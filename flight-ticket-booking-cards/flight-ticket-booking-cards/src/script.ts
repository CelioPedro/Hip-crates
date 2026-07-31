import React, { StrictMode } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
import clsx from "https://esm.sh/clsx";
import { LucideIcon, Heart, Plane, Tag } from "https://esm.sh/lucide-react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<main>
			<FlightCard
				city="New York"
				flightClass="Economy"
				price={120}
				airportCode="JFK"
				imageUrl="https://assets.codepen.io/416221/new-york-city.jpeg"
			/>
			<FlightCard
				city="San Francisco"
				flightClass="Premium economy"
				price={240}
				airportCode="SFO"
				imageUrl="https://assets.codepen.io/416221/golden-gate-bridge.jpeg"
				isSplit
			/>
		</main>
	</StrictMode>
);

interface FlightCardProps {
	city: string;
	flightClass: string;
	price: number;
	airportCode: string;
	imageUrl: string;
	isSplit?: boolean;
}
function FlightCard({
	city,
	flightClass,
	price,
	airportCode,
	imageUrl,
	isSplit = false
}: Readonly<FlightCardProps>) {
	const priceFormatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0
	}).format(price);

	return (
		<div className={clsx(
			"flight-card",
			isSplit && "flight-card--split"
		)}>
			<div className="flight-card__image-container">
				<img
					className="flight-card__image"
					src={imageUrl}
					alt={city}
					width={310}
					height={isSplit ? 310 : 545}
				/>
			</div>
			{!isSplit && <>
				<div className="flight-card__overlay"></div>
				<FlightCardFav isGlass />
			</>}
			<div className="flight-card__content">
				<h2 className="flight-card__title">{city}</h2>
				<p className="flight-card__class">{flightClass}</p>
				<div className="flight-card__details">
					<FlightCardDetailItem icon={Tag}>
						from <strong>{priceFormatted}</strong>
					</FlightCardDetailItem>
					<FlightCardDetailItem icon={Plane}>
						<strong>{airportCode}</strong>
					</FlightCardDetailItem>
				</div>
				<div className="flight-card__actions">
					<FlightCardSearch />
					{isSplit && <FlightCardFav />}
				</div>
			</div>
		</div>
	);
}

interface FlightCardDetailItemProps {
	icon: LucideIcon;
	children?: React.ReactNode;
}
function FlightCardDetailItem({
	icon: Icon,
	children
}: Readonly<FlightCardDetailItemProps>) {
	return (

		<div className="flight-card__detail-item">
			<Icon size={16} />
			<span>{children}</span>
		</div>
	);
}

interface FlightCardFavProps {
	isGlass?: boolean;
}
function FlightCardFav({ isGlass }: Readonly<FlightCardFavProps>) {
	return (
		<button
			className={clsx(
				"flight-card__favorite-btn",
				isGlass && "flight-card__favorite-btn--glass"
			)}
			type="button"
			title="Add to favorites"
		>
			<Heart size={18} strokeWidth={2} />
		</button>
	);
}

function FlightCardSearch() {
	return (
		<button className="flight-card__search-btn" type="button">
			Search flight
		</button>
	);
}