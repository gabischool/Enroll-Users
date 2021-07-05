import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from 'yup';



export default function Form () {

 
        const initialFormState = {
            name: "",
            email: "",
            motivation: "",
            positions: "",
            terms: ""
          };


          const [formState, setFormState] = useState(initialFormState);
          const [errors, setErrors] = useState(initialFormState)
          const [ users, setUsers ] = useState([])
               
                
                
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
                
                setUsers(res.data)
                setFormState(initialFormState)
            })
            .catch((err) => {
                console.log(err)
            })}


      



                    
            const formSchema = yup.object().shape({
                name: yup.string().required("Name is required"),
                email: yup.string().email("Must be a valid email").required("Must have an email"),
                motivation: yup.string().required("explainf why you want to volunteer"),
                positions: yup.string(),
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
                  <label htmlFor="motivation">
                    Why would you like to volunteer?
                    <textarea
                      name="motivation"
                      value={formState.motivation}
                      onChange={handleChange}
                    />
                  {errors.motivation.length > 0 ? <p className="error">{errors.motivation}</p> : null}
                  </label>
            
                  <label>
                    What would like to help with?
            
                    <select name="positions" value={formState.positions} onChange={handleChange}>
                      <option>--Please choose an option--</option>
                      <option value="Newsletter">Newsletter</option>
                      <option value="Yard Work">Yard Work</option>
                      <option value="Admin Work">Admin</option>
                      <option value="Tabling">Tabling</option>
            
                    </select>
                    {errors.positions.length > 0 ? <p className="error">{errors.positions}</p> : null}
                    
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
            
                <pre>{JSON.stringify(users, null, 2)}</pre>

                  
                </div>
              );
            }
            