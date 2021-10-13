import React from "react";
import avatarFriends from "../../assets/images/avatarFriends.png";
function ContactItem(props) {
	return (
		<div className="user">
			<img src={avatarFriends} alt="" className="user-img" />
			<div className="username">
				Aryn Jacobssen
				{/* class online if active , offline if no active */}
				<div className="user-status offline"></div>
			</div>
		</div>
	);
}

export default ContactItem;
