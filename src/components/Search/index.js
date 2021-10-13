import React from "react";

function Search(props) {
	return (
		<div class="search-bar">
			<input type="text" placeholder="Search" />
			<button class="right-side-button">
				<svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="css-i6dzq1"
				>
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
				</svg>
			</button>
		</div>
	);
}

export default Search;
