import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import AlarmCrud from "../components/user/AlarmCrud";
import EquipmentCrud from "../components/user/EquipmentCrud";
import AlarmAt from "../components/user/AlarmAt";
export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/alarm' component={AlarmCrud} />
        <Route path='/equipment' component={EquipmentCrud}/>
        <Route path='/alarmat' component={AlarmAt}/>
        <Redirect from='*' to='/' />
    </Switch>
