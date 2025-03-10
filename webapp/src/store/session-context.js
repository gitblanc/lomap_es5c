import React, { createContext, useState } from "react";

import { LatLng } from "leaflet";

const UserSessionContext = createContext({
	webId: "",
	markers: [],
	filteredMarkers: [],
	handleMarkers: () => {},
	handleFilteredMarkers: () => {},
	changedFilter: false,
	handleChangedFilter: () => {},
	filterOption: "all",
	handleFilterOption: () => {},
	loaded: false,
	handleLoaded: () => {},
	selectedMarker: null,
	createMarker: false,
	handleCreateMarker: () => {},
	handleSelectedMarker: () => {},
	handleAddComment: () => {},
	handleAddRating: () => {},
	pageStyle: "dark",
	handleStyle: () => {},
});

export const UserSessionProvider = ({ children }) => {
	const [webId, setWebId] = useState("");

	const [markers, setMarkers] = useState([]);
	const [filteredMarkers, setFilteredMarkers] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [createMarker, setCreateMarker] = useState(null);

	const [changedFilter, setChangedFilter] = useState(false);
	const [filterOption, setFilterOption] = useState("all");

	const [selectedMarker, setSelectedMarker] = useState(null);

	const [pageStyle, setPageStyle] = useState("dark");

	const handleSessionWebId = (webId) => {
		window.localStorage.setItem("webId", webId);
		setWebId(webId);
	};

	const handleMarkers = (newMarkers, canDelete = false) => {
		if (newMarkers !== null) {
			setMarkers([]);
			newMarkers.forEach((place) => {
				if (place !== null) {
					for (let i = 0; i < place.length; i++) {
						setMarkers((prevValue) => [
							...prevValue,
							{
								id: place[i].id,
								title: place[i].name,
								coords: new LatLng(place[i].latitude, place[i].longitude),
								description: place[i].description,
								category: place[i].category,
								comments: place[i].comments,
								score: place[i].reviewScores,
								pictures: place[i].pictures,
								isOwnMarker: canDelete,
							},
						]);
					}
				}
			});

			setLoaded(true);
		}
	};

	const handleFilteredMarkers = (newMarkers) => {
		if (newMarkers.length === 0) {
			setFilteredMarkers([]);
			return;
		}
		setFilteredMarkers([]);
		newMarkers.forEach((place) => {
			setFilteredMarkers((prevValue) => [
				...prevValue,
				{
					id: place.id,
					title: place.title,
					coords: new LatLng(place.coords.lat, place.coords.lng),
					description: place.description,
					category: place.category,
					comments: place.comments,
					score: place.score,
					pictures: place.pictures,
				},
			]);
		});
	};

	const handleAddComment = (markerId, comment) => {
		markers.forEach((marker) => {
			if (marker.id === markerId) {
				marker.comments.push(comment);
			}
		});

		filteredMarkers.forEach((marker) => {
			if (marker.id === markerId) {
				marker.comments.push(comment);
			}
		});
	};

	const handleAddRating = (markerId, rating) => {
		markers.forEach((marker) => {
			if (marker.id === markerId) {
				marker.score.push(rating);
			}
		});
	};

	const handleLoaded = (bool) => {
		setLoaded(bool);
	};

	const handleCreateMarker = (marker) => {
		setCreateMarker(marker);
	};

	const handleChangedFilter = (bool) => {
		setChangedFilter(bool);
	};

	const handleFilterOption = (option) => {
		setFilterOption(option);
	};

	const handleSelectedMarker = (bool) => {
		setSelectedMarker(bool);
	};

	const handleStyle = (style) => {
		setPageStyle(style);
	};

	return (
		<UserSessionContext.Provider
			value={{
				webId,
				markers,
				handleMarkers,
				loaded,
				handleLoaded,
				filteredMarkers,
				handleFilteredMarkers,
				createMarker,
				handleCreateMarker,
				changedFilter,
				handleChangedFilter,
				filterOption,
				handleFilterOption,
				selectedMarker,
				handleSelectedMarker,
				handleSessionWebId,
				handleAddComment,
				handleAddRating,
				pageStyle,
				handleStyle,
			}}
		>
			{children}
		</UserSessionContext.Provider>
	);
};

export default UserSessionContext;
