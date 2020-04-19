import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';
import DeliveryAdd from '../pages/Deliveries/CreateForm';
import DeliveryUpdate from '../pages/Deliveries/UpdateForm';

import Deliverymen from '../pages/Deliverymen';
import DeliverymanAdd from '../pages/Deliverymen/CreateForm';
import DeliverymanUpdate from '../pages/Deliverymen/UpdateForm';

import Recipients from '../pages/Recipients';
import RecipientAdd from '../pages/Recipients/CreateForm';
import RecipientUpdate from '../pages/Recipients/UpdateForm';

import Problems from '../pages/Problems';
// import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      {/* <Route path="/register" component={SignUp} /> */}

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/delivery"
        exact
        component={DeliveryAdd}
        isPrivate
      />
      <Route
        path="/deliveries/delivery/:id"
        exact
        component={DeliveryUpdate}
        isPrivate
      />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/deliveryman"
        exact
        component={DeliverymanAdd}
        isPrivate
      />
      <Route
        path="/deliverymen/deliveryman/:id"
        exact
        component={DeliverymanUpdate}
        isPrivate
      />

      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/recipients/recipient" component={RecipientAdd} isPrivate />
      <Route
        path="/recipients/recipient/:id"
        component={RecipientUpdate}
        isPrivate
      />

      <Route path="/problems" component={Problems} isPrivate />
      {/* <Route path="/profile" component={Profile} isPrivate /> */}
    </Switch>
  );
}
