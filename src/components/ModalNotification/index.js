import React, {useState} from 'react'
import './modal-notification.scss'

export function ModalNotification({data}) {
    return (
        <div className='modal-notification'>
            {
                data.length > 0 
                ? <div className='notification-list'>
                    {
                        data.map(item => {
                            return <div className='notification-item'>
                                <div className='notification-image'>
                                    <img src={item.img} alt=''/>
                                </div>
                                <div className='notification-content'>
                                    <div className='content'>
                                        <span>{item.name}</span> đã {item.type} bài viết của bạn
                                    </div>
                                    <div>{item.content}</div>
                                    <div className='time'>{item.time}</div>
                                </div>
                            </div>
                        })
                    }
                </div>
                : <div className='no-notification'>
                    <span>Bạn chưa có thông báo nào</span>
                </div>
            }
        </div>
    )
}
