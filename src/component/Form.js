import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";

export default function Form() {
  // Step: State lagu keydiyo waxa form-ka lagu qoro

  const initialFormState = {
    name: "",
    email: "",
    password: "",
    motivation: "",
    positions: "",
    img: "",
    terms: false
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  // Step 2: Isku xir state-ka kore iyo form inputs

  // Step 3: Samee labo function, mid ka dhig handleChange, midna handleSubmit

  const handleChange = (event) => {
    // Copy ka samee state-ka kore, kadib waxaad soo jiidataa input-ka ama qaybta aad formka ooga jirto, magaca (name) iyo value

    const inputData = {
      ...formState,

      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    };

    handleValidationChange(event);
    setFormState(inputData);
  };

  // Handle Submit

  const handleSubmit = (event) => {
    // Controlled Component
    event.preventDefault();

    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log(res);

        setFormState(initialFormState);
      })
      .catch((err) => console.log(err));
  };

  // step 4: Form Validation - AFTER BREAK!

  // Validation waa labo qaybood, qaybta hore waxaan isticmaaleynaa 'yup', qaybta labaadna waa function hubinaayo is badalka formka

  let schema = yup.object().shape({
    name: yup.string().required("Waa ku qasbantahay inaa magac galiso"),
    email: yup.string().email("Email sax ah gali").required(),
    password: yup
      .string()
      .min(4, "Passwords must be at least 4 characters long")
      .required("Password is Required"),
    motivation: yup.string(),
    positions: yup.string(),
    img: yup.string(),
    terms: yup.boolean().oneOf([true], "Must Accept Terms of Service")
  });

  const handleValidationChange = (event) => {
    // Habka Yup ay ku ogaaneyso wixii is badalay

    yup
      .reach(schema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({ ...errors, [event.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [event.target.name]: err.errors[0] });
      });
  };

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
          {errors.name.length > 0 ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </label>

        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
          {errors.email.length > 0 ? (
            <p className="error">{errors.email}</p>
          ) : null}
        </label>

        <label htmlFor="password">
          Password
          <input
            type="Password"
            placeholder="Password in here"
            name="Password"
            id="Password"
            value={formState.password}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="motivation">
          Why would you like to volunteer?
          <textarea
            name="motivation"
            value={formState.motivation}
            onChange={handleChange}
          />
          {errors.motivation.length > 0 ? (
            <p className="error">{errors.motivation}</p>
          ) : null}
        </label>

        <label>
          What would like to help with?
          <select
            name="positions"
            value={formState.positions}
            onChange={handleChange}
          >
            <option>--Please choose an option--</option>
            <option value="Newsletter">Newsletter</option>
            <option value="Yard Work">Yard Work</option>
            <option value="Admin Work">Admin</option>
            <option value="Tabling">Tabling</option>
          </select>
          {errors.positions.length > 0 ? (
            <p className="error">{errors.positions}</p>
          ) : null}
        </label>

        <label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            value={formState.img}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="terms" className="terms">
          <input
            type="checkbox"
            name="terms"
            value={formState.terms}
            onChange={handleChange}
          />
          Terms and Conditions
          {errors.terms.length > 0 ? (
            <p className="error">{errors.terms}</p>
          ) : null}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
