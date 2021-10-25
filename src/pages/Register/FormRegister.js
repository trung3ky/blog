import React, {useState} from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link } from "react-router-dom";

import classNames from 'classnames'

function FormRegister({ Register }) {

    const model = {
        name: "",
        email: "",
        password: "",
        date: "",
        gender: "",
        image: ""
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [getUser, setUser] = useState(model)
    const [getError, setError] = useState(model)


    const submitHandler = e => {
        e.preventDefault();
        var arrError ={}
        if(!getUser.name) {
            arrError.name = "Vui lòng nhập trường này"
        }
        if(!getUser.email) {
            arrError.email = "Vui lòng nhập trường này"
        }else if(!re.test(getUser.email.toLowerCase())){
            arrError.email = "Email không hợp lệ"
        }
        if(!getUser.date) {
            arrError.date = "Vui lòng nhập trường này"
        }
        if(!getUser.password) {
            arrError.password = "Vui lòng nhập trường này"
        }else if(getUser.password.length < 6){
            arrError.password = "Độ dài mật khẩu tối thiểu là 6"
        }
        if(!getUser.gender) {
            arrError.gender = "Vui lòng chọn trường này"
        }

        setError({...getError, ...arrError})
        
        if(getUser.name !== "" && re.test(getUser.email.toLowerCase()) && getUser.date !== "" && getUser.password.length >= 6 && getUser.gender !== "" && getUser.image !== ""){
            Register(getUser)
        }
        
    }

    const blurHandler = (e, message = "Vui lòng nhập trường này") => {
        if(e.target.value.trim().length > 0){
            setError({
                ...getError,
                [e.target.name]: ""
            })
        }else{
            setError({
                ...getError,
                [e.target.name]: message
            })
        }

        if(e.target.name === "email" && !re.test(getUser.email.toLowerCase())){
            setError({
                ...getError,
                [e.target.name]: "Email không hợp lệ"
            })
        }
        if(e.target.name === "password" && e.target.value.trim().length < 6){
            setError({
                ...getError,
                [e.target.name]: "Độ dài mật khẩu tối thiểu là 6"
            })
        }
    }
    
    function onChangeHanlder(e) {
        if(e.target.value.trim().length > 0){
            setError({
                ...getError,
                [e.target.name]: ""
            })
        }
        setUser( getUser => ({
            ...getUser,
            [e.target.name]: e.target.value.trim()
        }))
       
    }

    function handlerClick(e){
        const {name, value} = e.target;
        if(e.target.name === "gender" && e.target.value === "Nam") {
            setUser(getUser => ({
                ...getUser,
                image: "./images/user-male.jpg",
                [name]: value
            }))
        }
        
        if(e.target.name === "gender" && e.target.value === "Nu"){
            setUser(getUser => ({
                ...getUser,
                image: "./images/user-female.jpg",
                gender: "Nu"
            }))
        }
    }

    return (
        <div className="register">   
            <form onSubmit={submitHandler} autoComplete="off">
                <div className="form-inner">
                    <h2>Đăng ký</h2>
                    <div className={classNames('form-group', {'active': getError.name !== ""})}>
                        <input className="form-input" type="text" placeholder="Họ và tên" name="name" onBlur={blurHandler} onChange={onChangeHanlder}/>
                        {getError.name !== "" ? <ErrorOutlineIcon className="icon"/> : ""}
                        <span className="error">{getError.name !== "" ? getError.name : ""}</span>
                    </div>
                    <div className={classNames('form-group', {'active': getError.email !== ""})}>
                        <input className="form-input" type="" placeholder="Email" name="email" onBlur={blurHandler} onChange={onChangeHanlder}/>
                        {getError.email !== "" ? <ErrorOutlineIcon className="icon"/> : ""}
                        <span className="error">{getError.email !== "" ? getError.email : ""}</span>
                    </div>
                    <div className={classNames('form-group', {'active': getError.password !== ""})}>
                        <input className="form-input" type="password" placeholder="Password" name="password" onBlur={blurHandler} onChange={onChangeHanlder}/>
                        {getError.password !== "" ? <ErrorOutlineIcon className="icon"/> : ""}
                        <span className="error">{getError.password !== "" ? getError.password : ""}</span>
                    </div>
                    <div className={classNames('form-group', {'active': getError.date !== ""})}>
                        <label className="form-title">Ngày sinh:</label>
                        <input className="form-input" type="date" name="date" onChange={onChangeHanlder} onBlur={blurHandler} />
                        <span className="error">{getError.date !== "" ? getError.date : ""}</span>
                    </div>
                    <div className={classNames('form-group', {'active': getError.gender !== ""})}>
                        <label className="form-title">Giới tính:</label>
                        <div className="form-gender">
                            <div className="gender">
                                <label>Nữ</label>
                                <input type="radio" 
                                    name="gender" 
                                    value="Nu" 
                                    onClick={handlerClick}/>
                            </div>
                            <div className="gender">
                                <label>Nam</label>
                                <input type="radio" 
                                    name="gender" 
                                    value="Nam" 
                                    onClick={handlerClick}/>
                            </div>
                        </div>
                        <span className="error">{getError.gender !== "" ? getError.gender : ""}</span>
                    </div>
                    <input className="btn-submit" type="submit" name="submit" value="Đăng ký" />
                </div>
                <div className="toLogin">Bạn đã có tài khoản. <Link to="/login">Đăng nhập</Link></div>
            </form>
        </div>
    )
}

export default FormRegister
