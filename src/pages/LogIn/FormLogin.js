import React, {useState} from 'react'
import { Link } from "react-router-dom";

import classNames from 'classnames'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


function FormLogin(props) {
    const {Login, FaildLogin} = props;

    const [error, setError] = useState({
        email: "",
        password: "",
    })
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [faild, setFaild] = useState("")


    const blurHandler = (e, message = "Vui lòng nhập trường này") => {
        if(e.target.value.trim().length > 0){
            setError({
                ...error,
                [e.target.name]: ""
            })
        }else{
            setError({
                ...error,
                [e.target.name]: message
            })
        }
    }

    function onChangeHanlder(e) {
        if(e.target.value.trim().length > 0){
            setError({
                ...error,
                [e.target.name]: ""
            })
        }
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        
        setFaild(FaildLogin)

        var arrError ={}
        if(!user.email) {
            arrError.email = "Vui lòng nhập trường này"
        }
        if(!user.password) {
            arrError.password = "Vui lòng nhập trường này"
        }
        setError({
            ...error,
            ...arrError
        })

        if(user.email !== "" && !user.password !== "") {
            Login(user)
        }
    }



    return (
        <div className="register" >
            <form autoComplete="off" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Đăng Nhập</h2>
                    <div className={classNames('form-group', {'active': error.email !== ""})}>
                        <input className="form-input"
                            type="text"
                            placeholder="Email" 
                            name="email"
                            onBlur={blurHandler}
                            onChange={onChangeHanlder}
                            />
                        {error.email !== "" ? <ErrorOutlineIcon className="icon"/> : ""}
                        <span className="error">{error.email !== "" ? error.email : ""}</span>
                    
                    </div>
                    <div className={classNames('form-group', {'active': error.password !== ""})}>
                        <input className="form-input" 
                            type="text" 
                            placeholder="Password" 
                            name="password"
                            onBlur={blurHandler}
                            onChange={onChangeHanlder}
                            />
                        {error.password !== "" ? <ErrorOutlineIcon className="icon"/> : ""}
                        <span className="error">{error.password !== "" ? error.password : ""}</span>
                    
                    </div>
                    <span className={classNames({'faild': faild !== ""})}>{faild}</span>
                    <input className="btn-submit" 
                        type="submit" 
                        name="submit" 
                        value="Đăng nhập" />
                </div>
                <div className="toLogin">Bạn chưa có tài khoản. <Link to="/register">Đăng ký</Link></div>
            </form>

        </div>
    )
}

FormLogin.propTypes = {

}

export default FormLogin

