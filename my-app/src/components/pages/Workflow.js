import React from 'react';
import './Workflow.css';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import store from '../../redux/store';

//Material
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Testing extends React.Component {
    constructor() {
        super();
        this.state = {
            loadingProjects: true,
            loadingWorkers: true
        }
    }
    componentWillMount() {
        fetch('/workers')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    workers: res.workers,
                    loadingWorkers: false,
                });
            });
        fetch('/projects')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    filterProjects: res.projects,
                    projects: res.projects,
                    loadingProjects: false,
                });
                this.filterProjects(store.getState().company)
            });
    }
    projectSum = (el) => {
        let sum = 0;
        this.state.filterProjects.forEach(t => {
            if (el === t.status) {
                sum += t.price
            }
        });
        return sum
    };
    boardChange = (taskId, board) => {
        this.setState({
            filterProjects: this.state.filterProjects.map(project => {
                if(project.id === taskId) {
                    console.log( project.status,board);
                    project.status = board
                    return project
                } else {
                    return project
                }
            })
        })
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
        let tasks = {
            quened: [],
            planning: [],
            design: [],
            development: [],
            testing: [],
            completed: []
        };
        if (!this.state.loadingProjects && !this.state.loadingWorkers) {
            store.subscribe(() => {
                this.filterProjects(store.getState().company);
            });
            this.state.filterProjects.forEach((t) => {
                const worker = this.state.workers.filter(worker => {
                    return (t.assignedTo === worker.mail)
                });
                tasks[t.status.toLowerCase()].push(
                    <li className="task" id={t.id} key={t.id}>
                        <Avatar src={worker[0].img} size={42}/>
                        <div>
                            <p className="task-name">{t.nameProject}</p>
                            <p className="task-info">{t.company} · <span className="price">${t.price}</span></p>
                        </div>
                        <IconMenu
                            iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            iconStyle={{color:'#9ea3b4'}}
                        >
                            <MenuItem primaryText="Quened" onClick={() =>this.boardChange(t.id,'Quened')} />
                            <MenuItem primaryText="Planning" onClick={() =>this.boardChange(t.id,'Planning')}  />
                            <MenuItem primaryText="Design" onClick={() =>this.boardChange(t.id,'Design')}  />
                            <MenuItem primaryText="Development" onClick={() =>this.boardChange(t.id,'Development')}  />
                            <MenuItem primaryText="Testingt" onClick={() =>this.boardChange(t.id,'Testing')}  />
                            <MenuItem primaryText="Completed" onClick={() =>this.boardChange(t.id,'Completed')}  />
                        </IconMenu>
                    </li>
                );
            })
        };
        return (
            <div className="workflow show">
                <ul className="workflow-board-list">
                    <li className="board">
                        <header className="board-header" >
                            <div className="content-wrap">
                                <h4>Quened</h4>
                                <p>{tasks.quened.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Quened')}</span></p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </header>
                        <Sortable
                            // See all Sortable options at https://github.com/RubaXa/Sortable#options
                            className="task-list"
                            options={{
                                group: 'shared',
                                ghostClass:'ghost',
                                animation:150,
                            }}
                            tag="ul"
                            onChange={(order, sortable, evt) => {
                                this.setState({
                                    filterProjects: this.state.filterProjects.map(project => {
                                        if(project.id === evt.item.id) {
                                            project.status = 'Quened'
                                            return project
                                        } else {
                                            return project
                                        }
                                    })
                                })
                            }}

                        >
                            {tasks.quened}
                        </Sortable>
                    </li>
                    <li className="board">
                        <header className="board-header" >
                            <div className="content-wrap">
                                <h4>Planning</h4>
                                <p>{tasks.planning.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Planning')}</span></p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </header>
                        <Sortable
                            // See all Sortable options at https://github.com/RubaXa/Sortable#options
                            className="task-list"
                            options={{
                                group: 'shared',
                                ghostClass:'ghost',
                                animation:150,
                            }}
                            tag="ul"
                            onChange={(order, sortable, evt) => {
                                this.setState({
                                    filterProjects: this.state.filterProjects.map(project => {
                                        if(project.id === evt.item.id) {
                                            project.status = 'Planning'
                                            return project
                                        } else {
                                            return project
                                        }
                                    })
                                })
                            }}

                        >
                            {tasks.planning}
                        </Sortable>
                    </li>
                    <li className="board">
                        <header className="board-header" >
                            <div className="content-wrap">
                                <h4>Design</h4>
                                <p>{tasks.design.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Design')}</span></p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </header>
                        <Sortable
                            // See all Sortable options at https://github.com/RubaXa/Sortable#options
                            className="task-list"
                            options={{
                                group: 'shared',
                                ghostClass:'ghost',
                                animation:150,
                            }}
                            tag="ul"
                            onChange={(order, sortable, evt) => {
                                this.setState({
                                    filterProjects: this.state.filterProjects.map(project => {
                                        if(project.id === evt.item.id) {
                                            project.status = 'Design'
                                            return project
                                        } else {
                                            return project
                                        }
                                    })
                                })
                            }}

                        >
                            {tasks.design}
                        </Sortable>
                    </li>
                    <li className="board">
                        <header className="board-header" >
                            <div className="content-wrap">
                                <h4>Development</h4>
                                <p>{tasks.development.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Development')}</span></p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </header>
                        <Sortable
                            // See all Sortable options at https://github.com/RubaXa/Sortable#options
                            className="task-list"
                            options={{
                                group: 'shared',
                                ghostClass:'ghost',
                                animation:150,
                            }}
                            tag="ul"
                            onChange={(order, sortable, evt) => {
                                this.setState({
                                    filterProjects: this.state.filterProjects.map(project => {
                                        if(project.id === evt.item.id) {
                                            project.status = 'Development'
                                            return project
                                        } else {
                                            return project
                                        }
                                    })
                                })
                            }}

                        >
                            {tasks.development}
                        </Sortable>
                    </li>
                    <li className="board">
                        <header className="board-header" >
                            <div className="content-wrap">
                                <h4>Testing</h4>
                                <p>{tasks.testing.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Testing')}</span></p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </header>
                        <Sortable
                            // See all Sortable options at https://github.com/RubaXa/Sortable#options
                            className="task-list"
                            options={{
                                group: 'shared',
                                ghostClass:'ghost',
                                animation:150,
                            }}
                            tag="ul"
                            onChange={(order, sortable, evt) => {
                                this.setState({
                                    filterProjects: this.state.filterProjects.map(project => {
                                        if(project.id === evt.item.id) {
                                            project.status = 'Testing'
                                            return project
                                        } else {
                                            return project
                                        }
                                    })
                                })
                            }}

                        >
                            {tasks.testing}
                        </Sortable>
                    </li>
                    <li className="board">
                        <header className="board-header" >
                            <div className="content-wrap">
                                <h4>Completed</h4>
                                <p>{tasks.completed.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Completed')}</span></p>
                            </div>
                            <i className="material-icons">keyboard_arrow_right</i>
                        </header>
                        <Sortable
                            // See all Sortable options at https://github.com/RubaXa/Sortable#options
                            className="task-list"
                            options={{
                                group: 'shared',
                                ghostClass:'ghost',
                                animation:150,
                            }}
                            tag="ul"
                            onChange={(order, sortable, evt) => {
                                this.setState({
                                    filterProjects: this.state.filterProjects.map(project => {
                                        if(project.id === evt.item.id) {
                                            project.status = 'Completed'
                                            return project
                                        } else {
                                            return project
                                        }
                                    })
                                })
                            }}

                        >
                            {tasks.completed}
                        </Sortable>
                    </li>
                </ul>
            </div>
        )
    }
}
const  mapState = (state, props) => {
    return {
        draggableTask: state.graggableTask
    }
};
export default connect(mapState)(Testing)