import React from 'react';
import './Projects.css';
import { NavLink, Route } from 'react-router-dom';
import Select from '../atoms/Select'
import store from '../../redux/store'


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
                    filterProjects: res.projects,
                    loadingProjects: false,
                });
            });
    };
    changeSelect = (e) => {
        store.dispatch({
            type: 'COMPANY_SELECT',
            payload: {
                company: e
            }
        });
    };
    filterProjects = (company) => {
        switch (company) {
            case ('Microsoft'):
                this.setState({
                    filterProjects: this.state.projects.filter(project=> {
                        return (project.company === company)
                    })
                });
                break;
            case ('Google'):
                this.setState({
                    filterProjects: this.state.projects.filter(project=> {
                        return (project.company === company)
                    })
                });
                break;
            case ('Symu.co'):
                this.setState({
                    filterProjects: this.state.projects.filter(project=> {
                        return (project.company === company)
                    })
                });
                break;
            case ('JCD.pl'):
                this.setState({
                    filterProjects: this.state.projects.filter(project=> {
                        return (project.company === company)
                    })
                });
                break;
            case ('Facebook'):
                this.setState({
                    filterProjects: this.state.projects.filter(project=> {
                        return (project.company === company)
                    })
                });
                break;
            case ('Themeforest'):
                this.setState({
                    filterProjects: this.state.projects.filter(project=> {
                        return (project.company === company)
                    })
                });
                break;
            case ('all'):
                this.setState({
                    filterProjects: this.state.projects
                });
                break;
        }
    };
    render() {
        store.subscribe(() => {
            this.filterProjects(store.getState().company)
        });
        return (
            <div className="section-projects show">
                <header className="section-blue-header">
                    <ul className="section-blue-link-list" >
                        <li>
                            <NavLink to='/projects' exact>All Projects ({this.state.loadingProjects? null:this.state.filterProjects.length})</NavLink>
                        </li>
                        <li>
                            <NavLink to='/projects/workflow' exact>Workflow</NavLink>
                        </li>
                    </ul>
                    <Select styleTitle={{color:'#fff'}} style={{color:'#fff',border:'1px solid #fff',backgroundColor:'#2481ce'}} data={['all','Microsoft','Google','Symu.co','JCD.pl','Facebook','Themeforest']} onChangeSelect={this.changeSelect}/>
                </header>
                <div className="section-projects-body">
                    <Route exact path='/projects' component={ AllProjects }/>
                    <Route exact path='/projects/workflow' component={ Workflow }/>
                </div>
            </div>
        )
    }
}
export default Projects