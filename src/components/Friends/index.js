import React from "react";
import { ContactItem, Stories, SearchFriends } from "..";

import avatar from "../../assets/images/avatar.jpg";
function Friends({ name }) {
	return (
		<div className="right-side">
			<div className="account">
				<button className="account-button">
					<svg
						stroke="currentColor"
						stroke-width="2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="css-i6dzq1"
						viewBox="0 0 24 24"
					>
						<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
					</svg>
				</button>
				<span className="account-user">
					{name}
					<img src={avatar} alt="" className="account-profile" />
					<span>▼</span>
				</span>
			</div>
			<div className="side-wrapper stories">
				<div className="side-title">STORIES</div>
				<Stories />
				<Stories />
			</div>
			<div className="side-wrapper contacts">
				<div className="side-title">CONTACTS</div>
				<ContactItem />
				<ContactItem />
			</div>
			<div className="search-bar right-search">
				<SearchFriends />
			</div>
		</div>
	);
}

export default Friends;
