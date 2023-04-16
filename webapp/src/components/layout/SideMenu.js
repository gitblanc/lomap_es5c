import React, { useContext, useEffect } from "react";

import { LatLng, setOptions } from "leaflet";
import { useSession } from "@inrupt/solid-ui-react";
import { listFriends } from "../Pods/PodsFunctions";
import { listLocationsOfAUser } from "../Pods/PodsFunctions";
import MarkerCard from "./podsCards/MarkerCard";

import PodCreateForm from "../Pods/PodCreateForm";
import LoadingSpinner from "../UI/LoadingSpinner";

import UserSessionContext from "../../store/session-context";

import FriendsList from "../Friends/FriendsList";

import { Button } from "react-bootstrap";

import OptionsMenu from "./OptionsMenu";
import FilterCard from "./FilterCard";

const SideMenu = ({ option, prevOption, coords, handleOption }) => {
	const ctx = useContext(UserSessionContext);

	const [loaded, setLoaded] = React.useState(false);
	const [loadedUserPods, setLoadedUserPods] = React.useState(false);
	const [loadedFriends, setLoadedFriends] = React.useState(false);

	const { session } = useSession(); // Hook for providing access to the session in the component
	const { webId } = session.info; // User's webId

	const [firstLoad, setFirstLoad] = React.useState(true);

	const [updatePoints, setUpdatePoints] = React.useState(false);

	const [closed, setClosed] = React.useState(false);

	const loadUserPodsMarkers = async () => {
		setClosed(false);
		setLoaded(false);
		ctx.handleLoaded(false);
		ctx.handleFilterOption("all");

		var locations = [];

		locations.push(await listLocationsOfAUser(webId, session));

		ctx.handleMarkers(locations);
		ctx.handleFilteredMarkers([]); // we add the markers to the context
		setLoadedUserPods(true);
		setFirstLoad(false);
		setUpdatePoints(false);
	};

	const loadPodsMarkers = async () => {
		setClosed(false);
		setLoaded(false);
		ctx.handleLoaded(false);
		ctx.handleFilterOption("all");
		var usersIds = await listFriends(webId);
		// usersIds.push(webId); uncomment if u want to also load your own markers
		var locations = [];
		for (let i = 0; i < usersIds.length; i++) {
			let aux = await listLocationsOfAUser(usersIds[i], session);
			if (aux !== null) {
				locations.push(aux);
			}
		}

		setLoadedUserPods(false);
		ctx.handleMarkers(locations);
		ctx.handleFilteredMarkers([]);
		setLoaded(true);
		setUpdatePoints(false);
	};

	const handleClick = () => {
		setFirstLoad(!firstLoad);
	};

	useEffect(() => {
		if (firstLoad) {
			loadUserPodsMarkers();
		}
	}, []);

	useEffect(() => {
		if (option === "read" && !loaded) {
			setLoaded(false);
			loadPodsMarkers();
		} else if (option === "userPods" && !firstLoad && !loadedUserPods) {
			loadUserPodsMarkers();
		}
	}, [option]);

	useEffect(() => {
		if (updatePoints) {
			loadUserPodsMarkers();
		}
	}, [updatePoints]);

	useEffect(() => {
		if (ctx.selectedMarker !== null) {
			handleOption("markerInfo");
		}
	}, [ctx.selectedMarker]);

	let styleButton =
		ctx.pageStyle === "light"
			? "btn-close mx-3 mt-2"
			: "btn-close mx-3 mt-2 btn-close-white";

	return (
		<>
			<OptionsMenu
				changeOption={(opt) => {
					handleOption(opt);
				}}
			/>
			{option === "userPods" && !loadedUserPods && (
				<div className="d-flex justify-content-center align-items-center h-100">
					<LoadingSpinner />
				</div>
			)}
			{loadedUserPods &&
				ctx.filteredMarkers.length === 0 &&
				option === "userPods" &&
				ctx.markers.map((marker, i) => {
					return <MarkerCard key={i} marker={marker} />;
				})}
			{option === "userPods" &&
				ctx.filteredMarkers.length > 0 &&
				ctx.filteredMarkers.map((marker, i) => {
					return <MarkerCard key={i} marker={marker} />;
				})}

			{option === "create" && (
				<PodCreateForm
					coords={coords}
					close={handleOption}
					prevOption={prevOption}
					needsUpdate={setUpdatePoints}
				/>
			)}
			{option === "read" && !loaded && (
				<div className="d-flex justify-content-center align-items-center h-100">
					<LoadingSpinner />
				</div>
			)}
			{option === "read" &&
				loaded &&
				ctx.markers.map((marker, i) => {
					return <MarkerCard key={i} marker={marker} />;
				})}
			{option === "friends" && (
				<>
					<div className="d-flex justify-content-end">
						<button
							type="button"
							// className="btn-close mx-3 mt-2"
							className={styleButton}
							style={{ fontSize: "1rem" }}
							aria-label="Close"
							onClick={() => {
								// handleOption("userPods");
								handleOption(prevOption);
								setClosed(true);
								ctx.handleSelectedMarker(null);
							}}
						></button>
					</div>
					<FriendsList
						close={handleOption}
						handleLoad={(opt) => {
							setLoadedFriends(opt);
						}}
					/>
				</>
			)}
			{option === "friends" && !loadedFriends && (
				<div className="d-flex justify-content-center align-items-center h-100">
					<LoadingSpinner />
				</div>
			)}
			{option === "markerInfo" && (
				<>
					<div className="d-flex justify-content-end">
						<button
							type="button"
							// className="btn-close mx-3 mt-2"
							className={styleButton}
							style={{ fontSize: "1rem" }}
							aria-label="Close"
							onClick={() => {
								setClosed(true); // Search for memory leaks here MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 login listeners added.
								// handleOption("userPods");
								handleOption(prevOption);
								ctx.handleSelectedMarker(null);
							}}
						></button>
					</div>
					<MarkerCard marker={ctx.selectedMarker} />
				</>
			)}
			{option === "filter" && (
				<>
					<div className="d-flex justify-content-end my-2">
						<button
							type="button"
							// className="btn-close mx-3 mt-2"
							className={styleButton}
							style={{ fontSize: "1rem" }}
							aria-label="Close"
							onClick={() => {
								setClosed(true);
								// handleOption("userPods");
								handleOption(prevOption);
								ctx.handleSelectedMarker(null);
							}}
						></button>
					</div>
					<FilterCard />
				</>
			)}
		</>
	);
};

export default SideMenu;
