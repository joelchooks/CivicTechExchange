// @flow

import ProjectSearchDispatcher from '../stores/ProjectSearchDispatcher.js';
import TagDispatcher from '../stores/TagDispatcher.js';
import ProjectCardsContainer from '../componentsBySection/FindProjects/ProjectCardsContainer.jsx';
import ProjectSearchContainer from '../componentsBySection/FindProjects/ProjectSearchContainer.jsx';
import ProjectFilterContainer from '../componentsBySection/FindProjects/ProjectFilterContainer.jsx';
import {FindProjectsArgs} from "../stores/ProjectSearchStore.js";
import SplashScreen from "../componentsBySection/FindProjects/SplashScreen.jsx";
import urls from "../utils/url.js";
import React from 'react';
import _ from 'lodash'

type State = {|
  showSplash: boolean
|};

class FindProjectsController extends React.PureComponent<{||}, State> {
  constructor(): void {
    super();
    this.state = {showSplash: true};
  }
  
  componentWillMount(): void {
    let args: FindProjectsArgs = urls.arguments(document.location.search);
    args = _.pick(args, ['keyword','sortField','location','issues','tech', 'role', 'org', 'stage']);
    ProjectSearchDispatcher.dispatch({type: 'INIT', findProjectsArgs: !_.isEmpty(args) ? args : null});
    TagDispatcher.dispatch({type: 'INIT'});
    this.setState({showSplash: _.isEmpty(args)});
  }
  
  _onClickFindProjects(): void {
    this.setState({showSplash: false});
  }

  render(): React$Node {
    return (
      <React.Fragment>
        {this.state.showSplash ? <SplashScreen onClickFindProjects={this._onClickFindProjects.bind(this)}/> : null}
        <div className="FindProjectsController-root container">
          <ProjectSearchContainer />
          <div className="row">
            <ProjectFilterContainer />
            <ProjectCardsContainer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FindProjectsController;
