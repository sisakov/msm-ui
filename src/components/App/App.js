import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import LiveStreamPage from '../LiveStreamPage/LiveStreamPage';
import WorkloadsPage from '../WorkloadsPage/WorkloadsPage';

function App() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/landing" component={LandingPage} exact />
      <Route path="/dashboard" component={DashboardPage} exact />
      <Route path="/live-stream" component={LiveStreamPage} exact />
      <Route path="/workloads" component={WorkloadsPage} exact />
    </Switch>
  );
}

export default App;
