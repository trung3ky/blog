import React from "react";
import avatarFriend1 from "../../assets/images/avatarFriend1.png";
function Stories(props) {
	return (
		<div className="user">
			<img src={avatarFriend1} alt="" className="user-img" />
			<div className="username">
				Lisandro Matos
				<div className="album-date">12 hours ago</div>
			</div>
		</div>
	);
}

export default Stories;
