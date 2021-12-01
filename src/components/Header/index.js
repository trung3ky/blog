import React, {useState} from "react";
import SideBar from "../SideBar";
import Friends from "../Friends";
import MainTop from "../MainTop";
import Blog from "../Blog";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAddBlog from "../ModalAddBlog";
import Loader from "../Loader";


function Header({info}) {
	const {name, image, id} = info
	const [modalShow, setModalShow] = useState(false);
	const [loader, setLoader] = useState(false);
	const [reset, setReset] = useState(false);
	const [add, setAdd] = useState(false);

	async function handlerAddBlog(data){
		setLoader(true);
		try {
			const { idUserPost, statusPost, contentPost, imagePost} = data
			const url = "http://localhost:3001/add-post"
			const fd = new FormData();
			for(let i = 0; i < imagePost.length; i ++){
				fd.append('file', imagePost[i]);
			}
			fd.append('idUserPost', idUserPost);
			fd.append('statusPost', statusPost);
			fd.append('contentPost', contentPost);
			fd.append('imagePost', imagePost.length);
			const options = {
				method: "POST",
				body: fd
			}
			const request = await fetch(url, options)
			const response = await request.json()
			const {type} = response

			if(type === "success"){
				setLoader(false)
				setModalShow(false)
				if(add){
					setAdd(false)
				}else{
					setAdd(true)
				}
				if(reset){
					setReset(false)
				}else{
					setReset(true)
				}
			}

		} catch (error) {
			alert(error.message)
		}
	}
	return (
		<div className="header">
			{loader ? <Loader /> : ""}
			<div className="container">
				<SideBar />
				<div className="main">
					<MainTop />
					<div className="main-container">
						<div className="timeline">
							<div className="timeline-right">
								<div className="status box">
									<div className="status-menu">
										<a className="status-menu-item active" href="#a">
											Status
										</a>
										<a className="status-menu-item" href="#b">
											Photos
										</a>
										<a className="status-menu-item" href="#c">
											Videos
										</a>
									</div>
									<div className="status-main">
										<img
											src={image}
											className="status-img"
											alt=""
										/>
										<div type="text"
											onClick={() => setModalShow(true)}
											className="status-textarea"
										>{name + " ơi, bạn đang nghĩ gì thế?"}</div>
									</div>
								</div>
								<Blog change={add}/>
							</div>
						</div>
					</div>
				</div>
				<Friends name={name} image={image}/>
				<div className="overlay"></div>
			</div>
			<ModalAddBlog
				show={modalShow}
				onHide={() => setModalShow(false)}
				name={name}
				getdata={handlerAddBlog}
				image={image}
				id={id}
				reset={reset}
			/>
		</div>
		
	);
}

export default Header;
