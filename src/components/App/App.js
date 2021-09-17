import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import MemberClustersOverviewPage from '../MemberClustersOverviewPage/MemberClustersOverviewPage';
import ConnectivityDomainsPage from '../ConnectivityDomainsPage/ConnectivityDomainsPage';
import WorkloadsPage from '../WorkloadsPage/WorkloadsPage';
import ManageWCMPage from '../ManageWCMPage/ManageWCMPage';

function App() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/landing" component={LandingPage} exact />
      <Route path="/dashboard" component={DashboardPage} exact />
      <Route path="/member-clusters-overview" component={MemberClustersOverviewPage} exact />
      <Route path="/live-stream" component={ConnectivityDomainsPage} exact />
      <Route path="/workloads" component={WorkloadsPage} exact />
      <Route path="/manage-wcm" component={ManageWCMPage} exact />
    </Switch>
  );
}

export default App;
