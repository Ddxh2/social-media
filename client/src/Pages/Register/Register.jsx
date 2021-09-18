import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { REGISTER_USER } from "../../graphql";
import { useForm } from "../../hooks";
import { AuthContext } from "../../context/auth";
import { Page } from "../";

import "./Register.css";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    variables: values,
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  function registerUserCallback() {
    addUser();
  }

  return (
    <Page>
      <div className='register__container'>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Register</h1>
          <Form.Input
            label='Username'
            placeholder='Username...'
            name='username'
            type='text'
            error={!!errors.username}
            value={values.username}
            onChange={onChange}
          />
          <Form.Input
            label='Email'
            placeholder='Email...'
            name='email'
            type='email'
            error={!!errors.email}
            value={values.email}
            onChange={onChange}
          />
          <Form.Input
            label='Password'
            placeholder='Password...'
            name='password'
            type='password'
            error={!!errors.password}
            value={values.password}
            onChange={onChange}
          />
          <Form.Input
            label='Confirm Password'
            placeholder='Confirm Password...'
            name='confirmPassword'
            type='password'
            error={!!errors.confirmPassword}
            value={values.confirmPassword}
            onChange={onChange}
          />
          <Button type='submit' primary>
            Register
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Register;
