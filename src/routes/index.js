import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Deliveries from '../pages/Deliveries';
import DeliveryForm from '../pages/Deliveries/Form';

import Deliverymen from '../pages/Deliverymen';
import DeliverymanForm from '../pages/Deliverymen/Form';

import Recipients from '../pages/Recipients';
import RecipientAdd from '../pages/Recipients/CreateForm';
import RecipientUpdate from '../pages/Recipients/UpdateForm';

import Problems from '../pages/Problems';
// import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/delivery"
        exact
        component={DeliveryForm}
        isPrivate
      />
      <Route
        path="/deliveries/delivery/:id"
        exact
        component={DeliveryForm}
        isPrivate
      />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/deliveryman"
        exact
        component={DeliverymanForm}
        isPrivate
      />
      <Route
        path="/deliverymen/deliveryman/:id"
        exact
        component={DeliverymanForm}
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
