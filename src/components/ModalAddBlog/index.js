import React, {useRef, useState, useEffect} from 'react';
import classNames from 'classnames'
import { Modal} from 'react-bootstrap';

const ModalAddBlog = (props) => {
    const {name, image, id, getdata, reset} = props;
    const fileObj = [];
    const fileArray = [];

    
    const [data, setData] = useState({
      idUserPost: 0,
      statusPost: 0,
      contentPost: "",
      imagePost: []
    })

    const [src, setSrc] = useState([])

    useEffect(() => {
      setData( prev => ({
        ...prev,
        contentPost: "",
        imagePost: []
      }))
    }, [reset])

    const inputFileRef = useRef(null) 

    const styleHeading = {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    }


    function handlerClickStatus(e) {
      data.statusPost = Number(e.target.value)
    }

    function handlerChangeContent(e){
      setData({
        ...data,
        contentPost: e.target.value,
        idUserPost: id
      })
    }

    function handlerImage(){
      inputFileRef.current.click();
    }

    function handlerInputImage(e){
      fileObj.push(e.target.files)
      for (let i = 0; i < fileObj[0].length; i++) {
        if(fileObj[0][i].name.match(/\.(jpg|jpeg|png|gif)$/)){
          fileArray.push(fileObj[0][i])
          setSrc( prev => ([
            ...prev,
            URL.createObjectURL(fileObj[0][i])
          ]))
          
          
        }else{
          alert("file không hợp lệ")
        }
      }

      setData( prev => ({
        ...prev,
        imagePost: fileArray,
        idUserPost: id
      }))
    }

    function handlerAddBlog() {
      if(data.contentPost || data.imagePost){
        getdata(data)
      }
    }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={styleHeading}>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontWeight: 700}}>
          Tạo bài viết
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content--header">
          <div className="wraper-iamge">
            <img src={image} alt="img" />
          </div>
          <div className="wraper-infor">
            <span>{name}</span>
            <select onClick={handlerClickStatus}>
              <option value="0">Công khai</option>
              <option value="1">Bạn bè</option>
              <option value="2">Chỉ mình tôi</option>
            </select>
          </div>
        </div>
        <div className="content--input">
          <textarea 
            value={data.contentPost}
            name="" 
            placeholder={`${name} ơi, bạn đang nghĩ gì thế?`} 
            onChange={handlerChangeContent}
          />
          <div className="content--image">
            {
              src.map( (item, index) => {
                return <div className="image-item" key={index}>
                  <img src={item} alt="" />
                </div>
              })
            }
          </div>
        </div>
        <div className="content-add-media">
          <span>Thêm vào bài viét</span>
          <div className="warper-media">
            <div 
              class="media media--image"
              onClick={handlerImage}
            >
              <i class="fas fa-image"></i>
              <input 
                type='file' 
                id='file' 
                ref={inputFileRef} 
                style={{display: 'none'}}
                onChange={handlerInputImage}
                multiple
              />
            </div>
          </div>  
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button 
          onClick={handlerAddBlog}
          disabled={!data.contentPost && !data.imagePost.length > 0}
          className={classNames("btn-add-blog", {"active": data.contentPost || data.imagePost.length > 0})}
        >
            Đăng
        </button>
      </Modal.Footer>
    </Modal>
  );

}

export default ModalAddBlog;
