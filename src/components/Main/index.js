import React from "react";
// import SideBar from "../SideBar";
// import Friends from "../Friends";
// import Search from "../Search";
import { SideBar, Friends, Search, PostNews, News } from "..";
// import { Profile, TimeLine } from "../../pages";

function Main() {
	return (
		<div className="header">
			<div className="container">
				<SideBar />
				<div className="main">
					<Search />
					<div className="main-container">
						<div className="timeline">
							<div className="timeline-right">
								<PostNews />
								<News />
							</div>
						</div>
					</div>
				</div>
				<Friends />
				<div className="overlay"></div>
			</div>
		</div>
	);
}

export default Main;
