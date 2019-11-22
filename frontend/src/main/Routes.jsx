import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import AlarmCrud from "../components/user/AlarmCrud";
import EquipmentCrud from "../components/user/EquipmentCrud";
import AlarmAt from "../components/user/AlarmAt";
import Management from "../components/user/Management";
export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/alarm' component={AlarmCrud} />
        <Route path='/equipment' component={EquipmentCrud}/>
        <Route path='/alarmat' component={AlarmAt}/>
        <Route path='/management' component={Management}/>
        <Redirect from='*' to='/' />
    </Switch>
