import React from 'react';
import './Projects.css';
import { NavLink, Route } from 'react-router-dom';
import Select from '../atoms/Select'

import AllProjects from './AllProjects'
import Workflow from './Workflow'

class Projects extends React.Component {
    constructor() {
        super();
        this.state = {
            loadingProjects: true,
        }
    }
    componentWillMount() {
        fetch('/projects')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    projects: res.projects,
                    loadingProjects: false,
                });
            });
    }
    render() {
        return (
            <div className="section-projects show">
                <header className="section-project-header">
                    <ul className="section-project-link-list" >
                        <li>
                            <NavLink to='/projects/all'>All Projects ({this.state.loadingProjects? null:this.state.projects.length})</NavLink>
                        </li>
                        <li>
                            <NavLink to='/projects/workflow'>Workflow</NavLink>
                        </li>
                    </ul>
                    <Select styleTitle={{color:'#fff'}} style={{color:'#fff',border:'1px solid #fff'}} data={['all']}/>
                </header>
                <div className="section-projects-body">
                    <Route path='/projects/all' component={ AllProjects }/>
                    <Route path='/projects/workflow' component={ Workflow }/>
                </div>
            </div>
        )
    }
}
export default Projects