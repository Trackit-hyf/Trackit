import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { INITIAL_SIGNUP_USER } from '../../config';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from 'semantic-ui-react';
import Axios from 'axios';

function Signup() {
  const [user, setUser] = useState(INITIAL_SIGNUP_USER);
  const [error, setError] = useState(false);
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...user };
      const response = await Axios.post('/api/users/signup', payload);
      if (response.data.token) history.push('/login');
      // add loading state
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='grey' textAlign='center'>
          Create an account
        </Header>
        <Form size='large' onSubmit={handleSubmit} error>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Name'
              name='name'
              value={user.name}
              onChange={handleChange}
            />

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
              Signup
            </Button>
            {error && (
              <Message
                error
                header='Invalid Credentials'
                content='Please fill the fields correctly'
              />
            )}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Signup;
