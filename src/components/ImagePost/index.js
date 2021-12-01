import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import Swiper core and required modules
import SwiperCore, {
  Navigation,Pagination,Mousewheel,Keyboard
} from 'swiper';
// install Swiper modules
SwiperCore.use([Navigation,Pagination,Mousewheel,Keyboard]);
function ImagePost({imageList}) {
    return (
        <Swiper 
            slidesPerView={1} 
            spaceBetween={30} 
            keyboard={{"enabled": true}} 
            pagination={{"clickable": true}} 
            navigation={true} className="mySwiper"
        >
            {
                imageList.map(image => {
                    return  <SwiperSlide>
                        <div 
                        className="okokokok"
                            style={{
                                backgroundColor:'white',
                                height:'100%',
                                display:'block',
                                alignItems: 'center'
                            }}
                        >
                            <img style={{ objectFit: 'top'}}
                                className="d-block w-100"
                                src={`http://localhost:3001/assets/images/${image}`}
                                alt="First slide"
                            />
                        </div>
                    </SwiperSlide>
                })
            }
        </Swiper>
    )
}

ImagePost.propTypes = {

}

export default ImagePost

