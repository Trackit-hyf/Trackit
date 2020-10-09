import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from 'semantic-ui-react';
import { GlobalContext } from '../../context/GlobalState';
import { INITIAL_LOGIN_USER } from '../../config';

function Signup() {
  const history = useHistory();
  const [user, setUser] = useState(INITIAL_LOGIN_USER);
  const [error, setError] = useState(false);
  const { loginUser } = useContext(GlobalContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...user };
      const response = await Axios.post(`${process.env.REACT_APP_BACKEND}/api/users/login`, payload);
      if (response.data.token) {
        loginUser(response.data);
        localStorage.setItem('userData', JSON.stringify({...response.data}))
        history.push('/myassets');
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='grey' textAlign='center'>
          User Login
        </Header>
        <Form size='large' onSubmit={handleSubmit} error>
          <Segment stacked>
            <Form.Input
              fluid
              icon='mail'
              iconPosition='left'
              placeholder='E-mail'
              name='email'
              value={user.email}
              onChange={handleChange}
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name='password'
              type='password'
              value={user.password}
              onChange={handleChange}
            />

            <Button color='orange' fluid size='medium'>
              Login
            </Button>
            {error && (
              <Message
                error
                header='Invalid Credentials'
                content='Please type a valid email-password'
              />
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Signup;
