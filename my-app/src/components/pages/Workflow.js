import React from 'react';
import './Workflow.css';
import Sortable from 'sortablejs/Sortable.min';

//Material
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Workflow extends React.Component {
    componentDidMount() {
        var quened = document.getElementById('quened');
        var sortable = Sortable.create(quened,{
            ghostClass: 'ghost',
            group: {
                name: "taskBoard",
            },
            sort:true,
            animation: 200
        });
        var planning = document.getElementById('planning');
        var sortable = Sortable.create(planning,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            animation: 200
        });
        var design = document.getElementById('design');
        var sortable = Sortable.create(design,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            animation: 200
        });
        var development = document.getElementById('development');
        var sortable = Sortable.create(development,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            animation: 200
        });
        var testing = document.getElementById('testing');
        var sortable = Sortable.create(testing,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            animation: 200
        });
        var completed = document.getElementById('completed');
        var sortable = Sortable.create(completed,{
            ghostClass: 'ghost',
            group: "taskBoard",
            sort:true,
            animation: 200
        });
    };
    render() {
        return (
            <div className="workflow show">
               <ul className="workflow-board-list">
                   <li className="board">
                       <header className="board-header" >
                           <div className="content-wrap">
                                <h4>Quened</h4>
                                <p>1 project · <span>$1500</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="quened">
                           <li className="task">
                               <Avatar size={42}/>
                               <div>
                                   <p className="task-name">Wordpress theme</p>
                                   <p className="task-info">Symu.co · <span>$1500</span></p>
                               </div>
                               <IconMenu
                                   iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                   iconStyle={{color:'#9ea3b4'}}
                               >
                                   <MenuItem primaryText="Refresh" />
                                   <MenuItem primaryText="Send feedback" />
                                   <MenuItem primaryText="Settings" />
                                   <MenuItem primaryText="Help" />
                                   <MenuItem primaryText="Sign out" />
                               </IconMenu>
                           </li>
                       </ul>
                   </li>
                   <li className="board">
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Planning</h4>
                               <p>1 project · <span>$1500</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="planning">
                           <li className="task">
                               <Avatar size={42}/>
                               <div>
                                   <p className="task-name">Wordpress theme</p>
                                   <p className="task-info">Symu.co · <span>$1500</span></p>
                               </div>
                               <IconMenu
                                   iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                   iconStyle={{color:'#9ea3b4'}}
                               >
                                   <MenuItem primaryText="Refresh" />
                                   <MenuItem primaryText="Send feedback" />
                                   <MenuItem primaryText="Settings" />
                                   <MenuItem primaryText="Help" />
                                   <MenuItem primaryText="Sign out" />
                               </IconMenu>
                           </li>
                       </ul>
                   </li>
                   <li className="board">
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Design</h4>
                               <p>1 project · <span>$1500</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="design">
                           <li className="task">
                               <Avatar size={42}/>
                               <div>
                                   <p className="task-name">Wordpress theme</p>
                                   <p className="task-info">Symu.co · <span>$1500</span></p>
                               </div>
                               <IconMenu
                                   iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                   iconStyle={{color:'#9ea3b4'}}
                               >
                                   <MenuItem primaryText="Refresh" />
                                   <MenuItem primaryText="Send feedback" />
                                   <MenuItem primaryText="Settings" />
                                   <MenuItem primaryText="Help" />
                                   <MenuItem primaryText="Sign out" />
                               </IconMenu>
                           </li>
                       </ul>
                   </li>
                   <li className="board">
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Development</h4>
                               <p>1 project · <span>$1500</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="development">
                           <li className="task">
                               <Avatar size={42}/>
                               <div>
                                   <p className="task-name">Wordpress theme</p>
                                   <p className="task-info">Symu.co · <span>$1500</span></p>
                               </div>
                               <IconMenu
                                   iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                   iconStyle={{color:'#9ea3b4'}}
                               >
                                   <MenuItem primaryText="Refresh" />
                                   <MenuItem primaryText="Send feedback" />
                                   <MenuItem primaryText="Settings" />
                                   <MenuItem primaryText="Help" />
                                   <MenuItem primaryText="Sign out" />
                               </IconMenu>
                           </li>
                       </ul>
                   </li>
                   <li className="board">
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Testing</h4>
                               <p>1 project · <span>$1500</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="testing">
                           <li className="task">
                               <Avatar size={42}/>
                               <div>
                                   <p className="task-name">Wordpress theme</p>
                                   <p className="task-info">Symu.co · <span>$1500</span></p>
                               </div>
                               <IconMenu
                                   iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                   iconStyle={{color:'#9ea3b4'}}
                               >
                                   <MenuItem primaryText="Refresh" />
                                   <MenuItem primaryText="Send feedback" />
                                   <MenuItem primaryText="Settings" />
                                   <MenuItem primaryText="Help" />
                                   <MenuItem primaryText="Sign out" />
                               </IconMenu>
                           </li>
                       </ul>
                   </li>
                   <li className="board">
                       <header className="board-header" >
                           <div className="content-wrap">
                               <h4>Completed</h4>
                               <p>1 project · <span>$1500</span></p>
                           </div>
                           <i className="material-icons">keyboard_arrow_right</i>
                       </header>
                       <ul className="task-list" id="completed">
                           <li className="task">
                               <Avatar size={42}/>
                               <div>
                                   <p className="task-name">Wordpress theme</p>
                                   <p className="task-info">Symu.co · <span>$1500</span></p>
                               </div>
                               <IconMenu
                                   iconButtonElement={<IconButton ><MoreVertIcon/></IconButton>}
                                   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                   targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                   iconStyle={{color:'#9ea3b4'}}
                               >
                                   <MenuItem primaryText="Refresh" />
                                   <MenuItem primaryText="Send feedback" />
                                   <MenuItem primaryText="Settings" />
                                   <MenuItem primaryText="Help" />
                                   <MenuItem primaryText="Sign out" />
                               </IconMenu>
                           </li>
                       </ul>
                   </li>
               </ul>
            </div>
        )
    }
}
export default Workflow