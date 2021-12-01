import React, { useState, useEffect } from 'react';
import './like.scss'

export const Like = ({ idBlog, socket, idUserPost }) => {
    const [like, setLike] = useState(false);
    const [checkLike, setCheckLike] = useState({});
    const [data, setData] = useState([])
    const idUser = localStorage.getItem("IdUser")

    const handleLike = (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:3001/add-like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idBlog, idUser }),
            }).then(res => {
                return res.json();
            })
            .then(data => {
                if (data.type === 'success') {
                    addNotification()
                    setLike(data.status)
                    if (data.status === true) {
                        sendLike(Number(idBlog), idUser)
                    }
                    if (data.status === false) {
                        removeLike(Number(idBlog), idUser)
                    }
                }
            });
        } catch (error) {
            alert(error.message)
        }
    }

    function sendLike(idBlog, idUserLike) {
        socket.current.emit('send-like', { idBlog, idUserLike })
    }

    function removeLike(idBlog, idUserLike) {
        socket.current.emit('remove-like', { idBlog, idUserLike })
    }

    useEffect(() => {
        console.log('fetch')
        try {
            fetch("http://localhost:3001/get-like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idBlog }),
            }).then(res => {
                return res.json();
            })
                .then(data => {
                    if (data.type === "success") {
                        setData(data.data)
                        data.data.map(item => {
                            if (item.id === Number(idUser)) {
                                setLike(true)
                            }
                        })
                    }
                });
        } catch (error) {
            alert(error.message)
        }
    }, [like, checkLike, idBlog, idUser])

    useEffect(() => {
        socket.current.on('have-like', data => {
            // addNotification()
            setCheckLike(() => ({ status: true }))
        })
    }, [])

    useEffect(() => {
        socket.current.on('cancel-like', data => {
            // addNotification()
            setCheckLike(() => ({ status: false }))
        })
    }, [])

    function addNotification() {
        try {
            fetch("http://localhost:3001/add-notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    idPost: idBlog,
                    idUser: idUserPost,
                    idUserAction: idUser,
                    type: 'like'
                 }),
            }).then(res => {
                return res.json();
            })
            .then(data => {
            });
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <a href="#like" className="album-action" onClick={handleLike}>
            {like ?
                <i class="fas fa-heart" /> :
                <i class="far fa-heart" />
            }
            {data.length > 0 ? data.length : '0'}
            {data.length > 0 &&
                <div className="modal-like">
                    {data.map((item, index) => {
                        return <div key={index}>{item.name}</div>
                    })}
                </div>
            }
        </a>
    );
}
