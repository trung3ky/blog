import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import FormRegister from './FormRegister.js'
import { Redirect } from 'react-router'

function Register(props) {

    const [type, setType] = useState("")
    // const [email, sêtmail] = useState("")

    // useEffect(() => {

    // }, [])

    const RegisterHanlder = data =>{
        try {
            fetch("http://localhost:3001/register",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data), //
            }
            ).then( res => {
                return res.json()
            }).then( data => {
                if(data.type === 'success'){
                    setType("Success")
                }else{
                    setType("Error")
                    console.log("thất bại")
                }
            })
            
        } catch (error) {
            console.log("message erro", error.message)
        }
    }


    return (
        type === "Success" ? 
        (
            <Redirect to="/login" />
        ) : 
        (<FormRegister Register={RegisterHanlder}/>)
        
        
    )
}

Register.propTypes = {

}

export default Register
