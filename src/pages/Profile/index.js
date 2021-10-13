import React from "react";

function Profile(props) {
	return (
		<div class="profile">
			<div class="profile-avatar">
				<img
					src="https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg"
					alt=""
					class="profile-img"
				/>
				<div class="profile-name">Quan Ha</div>
			</div>
			<img
				src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
				alt=""
				class="profile-cover"
			/>
			<div class="profile-menu">
				<a class="profile-menu-link active">Timeline</a>
				<a class="profile-menu-link">About</a>
				<a class="profile-menu-link">Friends</a>
				<a class="profile-menu-link">Photos</a>
				<a class="profile-menu-link">More</a>
			</div>
		</div>
	);
}

export default Profile;
