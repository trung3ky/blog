import React, { useEffect, useState } from 'react'
import './ModalNotificationItem.scss'

export function ModalNotificationItem({smallNotification, setHideSmallModal, dataLike}) {
    const [show, setShow] = useState(false)
    const [data, setData] = useState()
    useEffect(() => {
        if(smallNotification === true){
            getItemNotification(dataLike.idBlog, dataLike.idUserLike)
        }
        const sto = setTimeout(() => {
            setShow(() => false)
            if(setHideSmallModal){
                setHideSmallModal()
                setData(() => {})
            }
        }, 2000)
        return () => {
            clearTimeout(sto)
        }
    }, [smallNotification, dataLike.idBlog, dataLike.idUserLike])

    async function getItemNotification(idPost, idUser) {
        console.log("vào")
        try {
            fetch("http://localhost:3001/get-item-notification", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ idUserAction: idUser, idPost: idPost }),
				}).then(res => {
					return res.json();
				})
				.then(data => {
					if(data.type === "success") {
                        console.log(data.data)
						setData(() => data.data)
                        setShow(() => true)
					}
				})
        } catch (error) {
            alert('lỗi get item thông báo')
        }
    }

    return (
        show && data !== undefined &&
        <div className='modal-notification-item'>
            <div className='notification-item'>
                <div className='notification-image'>
                    <img src='https://randomuser.me/api/portraits/men/1.jpg' alt=''/>
                </div>
                <div className='notification-content'>
                    <div className='content'>
                        {console.log(data)}
                        <span>{data.name}</span> đã {data.type} bài viết của bạn
                    </div>
                    <div className='time'>1 giờ trước</div>
                </div>
            </div>
        </div>
    )
}
