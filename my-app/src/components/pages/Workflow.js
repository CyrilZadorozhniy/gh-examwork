import React from 'react';
import './Workflow.css';
import Sortable from 'sortablejs/Sortable.min';
import { connect } from 'react-redux'
import store from '../../redux/store'

//Material
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Workflow extends React.Component {
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
    componentDidMount() {
        var quened = document.getElementById('quened');
        var sortable = Sortable.create(quened,{
            ghostClass: 'ghost',
            group: {
                name: "taskBoard",
            },
            sort:true,
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement

            },
            animation: 200
        });
        var planning = document.getElementById('planning');
        var sortable = Sortable.create(planning,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement

            },
            animation: 200
        });
        var design = document.getElementById('design');
        var sortable = Sortable.create(design,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement

            },
            animation: 200
        });
        var development = document.getElementById('development');
        var sortable = Sortable.create(development,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement

            },
            animation: 200
        });
        var testing = document.getElementById('testing');
        var sortable = Sortable.create(testing,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement

            },
            animation: 200
        });
        var completed = document.getElementById('completed');
        var sortable = Sortable.create(completed,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
            },
            animation: 200
        });
    };
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

    onDragStart = (ev, id) => {
        console.log(ev,id);
        ev.dataTransfer.setData("id", id);
    };
    onDragOver = (ev) => {
        console.log('bbb',ev)
    };
    onDrop = (ev) => {
        console.log('aaa',ev)
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
                    <li className="task" id={t.id} key={t.id} onDragStart={(e) => this.onDragStart(e, t.id)}>
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
                   <li className="board"   onDragOver={() => this.onDragOver('Quened')} >
                       <header className="board-header" >
                           <div className="content-wrap">
                                <h4>Quened</h4>
                                <p>{tasks.quened.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Quened')}</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="quened" onDrop={() => this.onDrop('Quened')}>
                           {tasks.quened}
                       </ul>
                   </li>
                   <li className="board" onDrop={() => this.onDrop('Planning')}  onDragOver={() => this.onDragOver('Planning')}>
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Planning</h4>
                               <p>{tasks.planning.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Planning')}</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="planning">
                           {tasks.planning}
                       </ul>
                   </li>
                   <li className="board" onDrop={() => this.onDrop('Design')}  onDragOver={() => this.onDragOver('Design')}>
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Design</h4>
                               <p>{tasks.design.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Design')}</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="design">
                           {tasks.design}
                       </ul>
                   </li>
                   <li className="board" onDrop={() => this.onDrop('Development')}  onDragOver={() => this.onDragOver('Development')}>
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Development</h4>
                               <p>{tasks.development.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Development')}</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="development">
                           {tasks.development}
                       </ul>
                   </li>
                   <li className="board" onDrop={() => this.onDrop('Testing')}  onDragOver={() => this.onDragOver('Testing')}>
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Testing</h4>
                               <p>{tasks.testing.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Testing')}</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="testing">
                           {tasks.testing}
                       </ul>
                   </li>
                   <li className="board" onDrop={() => this.onDrop('Completed')}  onDragOver={() => this.onDragOver('Completed')}>
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Completed</h4>
                               <p>{tasks.completed.length} project · <span>${this.state.loadingProjects? null :this.projectSum('Completed')}</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="completed">
                           {tasks.completed}
                       </ul>
                   </li>
               </ul>
            </div>
        )
    }
}
const  mapState = (state, props) => {
    return {
        dndChangeBoard: state.changeTask
    }
};
export default connect(mapState)(Workflow)