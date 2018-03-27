import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './ProjectsTable.css'

//Material
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
    thStyle: {
        border:'none',
        fontSize: 16,
        fontWeight: 500,
        color: '#9ea3b4'
    },
    tdStyle: {
        border:'none',
        backgroundColor: '#3a3e52',
        maxHeight:74.65
    }
};

class ProjectsTable extends React.Component {
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
                    projects: res.projects,
                    loadingProjects: false,
                });
            });
    };
    projectTitle = (cell,row) => {
        return(
            <div key={row.id} style={{display:'flex',flexDirection:'column'}}>
                <p style={{margin: 0,fontSize: 16, color:'#fff',fontWeight: 500}}>{row.nameProject}</p>
                <span style={{fontSize: 14, color:'#9ea3b4'}}>{row.company}</span>
            </div>
        )
    };
    projectPrice = (cell,row) => {
      return <p style={{padding:'12px 0', margin: 0,fontSize:16, color:'#fff'}}>${row.price}</p>
    };
    projectDeadline = (cell,row) => {
        return (
            <div key={row.id} style={{display:'flex',flexDirection:'column'}}>
                <p style={{margin: 0,fontSize: 16, color:'#fff',fontWeight: 500}}>{row.deadline}</p>
                <span style={{fontSize: 14, color:'#9ea3b4'}}>{row.timeLeft}</span>
            </div>
        )
    };
    projectTimeSpent = (cell,row) => {
        return <p style={{padding:'12px 0',margin: 0,fontSize:16, color:'#fff'}}>{row.timeSpent} hours</p>
    };
    projectProgress = (cell,row) => {
        return(
            <div style={{ padding:'12px 0',display:'flex',alignItems:'center'}}>
                <p style={{fontSize:16, color:'#fff',margin:0,width: 40.23}}>{row.progress}%</p>
                <div style={{marginLeft: 16, overflow: 'hidden', borderRadius: 8,maxWidth: 170,width:170, backgroundColor:'rgba(158, 163, 180, 0.3)'}}>
                    <span style={row.progress <= 0 ? {display:'block',width: row.progress + '%',height:8,backgroundColor:'#9ea3b4',borderRadius: 8} : row.progress === 100 ? {display:'block',width: row.progress + '%',height:8,backgroundColor:'#4caf50',borderRadius: 8}: {display:'block',width: row.progress + '%',height:8,backgroundColor:'#2196f3',borderRadius: 8}}>-</span>
                </div>
            </div>
        )
    };
    projectStatus = (cell,row) => {
        return <p style={{padding:'12px 0',margin: 0,fontSize:16, color:'#fff'}}>{row.status}</p>
    };
    projectAssignedTo = (cell,row) => {
        const worker = this.state.workers.filter(worker => {
           return (row.assignedTo === worker.mail)
        });
      return (
          <div style={{display:'flex',alignItems:'center'}}>
              <Avatar src={worker[0].img}  size={42}/>
              <div style={{flex:1,marginLeft:20}}>
                  <p style={{margin: 0,fontSize: 16, color:'#fff',fontWeight: 500}}>{worker[0].name}</p>
                  <span style={{fontSize: 14, color:'#9ea3b4'}}>{worker[0].position}</span>
              </div>
          </div>
      )
    };
    projectButton = (cell,row) => {
      return (
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
      )
    };
    trClassFormat(row, rowIndex) {
        return row.progress <= 0 ? "white-project" : row.progress === 100 ?"green-project" : "blue-project";
    }
    render() {
        if (this.state.loadingProjects || this.state.loadingWorkers) {
            return <div style={{backgroundColor: '#2b2d3c',display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100vh'}}>
                <CircularProgress color={'#757da4'} size={60} thickness={7} />
            </div>
        } else {
            return (
                <BootstrapTable
                    data={this.state.projects}
                    tableStyle={{border: 'none', fontFamily: 'Montserrat'}}
                    trClassName={ this.trClassFormat }
                >
                    <TableHeaderColumn dataField="id" dataFormat={this.projectTitle}  thStyle={style.thStyle} tdStyle={style.tdStyle} isKey>Project
                        title</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectPrice}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}
                        width="10%">Value</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectDeadline}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}
                        width="12%">Deadline</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectTimeSpent}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}
                        width="10%">Time spent</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectProgress}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}>Progress</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectStatus}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}
                        width="15%">Status</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectAssignedTo}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}
                        width="18%">Assigned to</TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.projectButton}
                        thStyle={style.thStyle}
                        tdStyle={style.tdStyle}
                        width="5%"> </TableHeaderColumn>
                </BootstrapTable>
            )
        }
    }
}
export default ProjectsTable