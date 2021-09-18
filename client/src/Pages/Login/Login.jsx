import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { LOGIN_USER } from "../../graphql";
import { useForm } from "../../hooks";
import { AuthContext } from "../../context/auth";
import { Page } from "..";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    variables: values,
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Page>
      <div className='register__container'>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>Login</h1>
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
            label='Password'
            placeholder='Password...'
            name='password'
            type='password'
            error={!!errors.password}
            value={values.password}
            onChange={onChange}
          />
          <Button type='submit' primary>
            Login
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

export default Login;
