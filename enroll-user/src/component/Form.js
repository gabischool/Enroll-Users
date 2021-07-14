import React, { useState } from "react";
import axios from "axios"
import * as yup from 'yup';

export default function Form() {
  // can declare initialState once and use as initial state for form, for errors, and reset form
  const initialFormState = {
    name: "",
    email: "",
    terms: "",
    password: ""
  };

  // Form state
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState)

  const [users , setUsers ] = useState([]);



  const handleChange = (event) => {
    event.persist()
    const inputData = {...formState, 
      
      [event.target.name]: event.target.type === "checkbox" ? event.target.isChecked : event.target.value}

    handleValidationChange(event)
    setFormState(inputData)
 

  }


  const handleSubmit = (event) => {
    event.preventDefault()
    

    axios.post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log(res.data)
        setUsers(formState)
  
        console.log(" formatss", users.name)

        setFormState(initialFormState)
        
      })
      .catch((err) => {
        console.log(err)
      })


  }


  // Yup schema/template

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Must be a valid email").required("Must have an email"),
    password: yup.string().required("Must have an password"),
    terms: yup.boolean("Please agree on terms").required()
  })

  const handleValidationChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({...errors, [event.target.name]: ""})
      })
      .catch((err) => {
        setErrors({...errors, [event.target.name]: err.errors[0]})
      })

  }
 
  
 





  return (
    <div>
    <form onSubmit={handleSubmit}>
     
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
       {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>

      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
       {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      </label>


      <label htmlFor="password">
      password
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
       {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
      </label>



      

     

      <label htmlFor="terms" className="terms" >
        <input 
          type="checkbox"
          name="terms"
          isChecked={formState.terms}
          onChange={handleChange}
        />
        Terms and Conditions
      </label>
     
     
      <button type="submit">
        Submit
      </button>
    </form>

    <p>name:   {users.name}</p>
    <p>email:   {users.email}</p>
    <p>password:  {users.password}</p>
    


    
    </div>
  );
}
