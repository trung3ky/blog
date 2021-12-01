import React, {useState, useEffect, useContext} from 'react'
import ImagePost from '../ImagePost'
import {Like} from './like'
import {socketContext} from '../../socketProvider'

function Blog(props) {
    const [blog, setBlog] = useState([])
    const socket = useContext(socketContext)
    const idUser = localStorage.getItem("IdUser")

    useEffect(() => {
        if(blog.length > 0) {
            blog.map(item => {
                socket.current.emit('create-room-like', {idPost: item.id_post, idUser: item.id_user_post})
            })
        }
    },[blog])

    useEffect(() => {
        socket.current.emit('user-connected', idUser)
    }, [])

    useEffect(() => {
        (async () =>{
            try {
                const urlBlog = "http://localhost:3001/blog"
                const requestBlog = await fetch(urlBlog)
                const responseBlog = await requestBlog.json()

                const {type, data} = responseBlog
                if(type ===  'success' && data.length > 0) {
                    setBlog(data)
                }
            } catch (error) {
                
            }
        })();

    },[props.change])
    
    return (
        blog.length > 0 && blog.map( (item,index) => {
            const {image_post} = item
            let imageList = []
            if(image_post !== null && image_post.split(',')){
                imageList = image_post.split(',')
            }
            return <div className="album box" key={item.id_post}>
                        <div className="status-main">
                            <img
                                src={item.imageUserPost}
                                alt=""
                                className="status-img"
                            />
                            <div className="album-detail">
                                <div className="album-title">
                                    <strong>{item.nameUserPost}</strong>
                                </div>
                                <div className="album-date">{item.time_post}</div>
                            </div>
                            <button className="intro-menu"></button>
                        </div>
                        <div className="album-content">
                            {item.content_post}
                            {item.image_post ? 
                                <div className="album-photos">
                                    {imageList.length > 1 ? 
                                        <ImagePost imageList={imageList} />
                                    :
                                        <img
                                            src={`http://localhost:3001/assets/images/${imageList[0]}`}
                                            alt=""
                                            className="album-photo"
                                        />
                                    }
                                </div>
                            : ""}
                        </div>
                        <div className="album-actions">
                            <Like idBlog={item.id_post} socket={socket} idUserPost={item.id_user_post}/>
                            <a href="#" className="album-action">
                                <svg
                                    stroke="currentColor"
                                    stroke-width="2"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="css-i6dzq1"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                </svg>
                                20
                            </a>
                            <a href="#" className="album-action">
                                <svg
                                    stroke="currentColor"
                                    stroke-width="2"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="css-i6dzq1"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 1l4 4-4 4" />
                                    <path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" />
                                    <path d="M21 13v2a4 4 0 01-4 4H3" />
                                </svg>
                                13
                            </a>
                        </div>
                    </div>
        })
    )
}


export default Blog

