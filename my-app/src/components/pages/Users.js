import React from 'react'
import './Users.css'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';

const style = {
    thStyle: {
        border:'none',
        fontSize: 16,
        fontWeight: 500,
        color: '#9ea3b4',
        textAlign:'center'
    },
    tdStyle: {
        border:'none',
        backgroundColor: '#3a3e52',
        maxHeight:74.65
    }
};


class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            loadingWorkers: true,
        }
    };
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
    }
    workersTitle = (cell,row) => {
        return (
            <div style={{display:'flex'}}>
                <Badge
                    badgeContent={1}
                    style={{padding: 0,}}
                    badgeStyle={row.online ?{color:'#4caf50',backgroundColor:'#4caf50',top: 0, right: 0, border: '2px solid #2f3242',width: 15,height:15}:{display:'none'}}
                >
                    <Avatar src={row.img}  size={42}/>
                </Badge>
                <div style={{marginLeft:25}}>
                    <p style={{margin:0,fontSize:15,fontWeight:500,color:'#fff'}}>{row.name}</p>
                    <span style={{margin:0,fontSize:14,fontWeight:500,color:'#9ca1b2'}}>{row.position}</span>
                </div>
            </div>
        )
    };
    workersMail = (cell,row) => {
        return(
                <h1 style={{margin:10,fontSize:15,fontWeight:500,color:'#fff',textAlign:'center'}}>{row.mail}</h1>
        )
    };
    workersPhone = (cell,row) => {
        return(
                <h1 style={{margin:10,fontSize:15,fontWeight:500,color:'#fff',textAlign:'center'}}>{row.phone}</h1>
        )
    };
    workersCompany = (cell,row) => {
        return(
                <h1 style={{margin:10,fontSize:15,fontWeight:500,color:'#fff',textAlign:'center'}}>{row.company}</h1>
        )
    };
    render() {
        if (this.state.loadingWorkers) {
            return(
                <div style={{backgroundColor: '#2b2d3c',display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100vh'}}>
                    <CircularProgress color={'#757da4'} size={60} thickness={7} />
                </div>)
        } else {
            return (
                <div className="section-users show">
                    <BootstrapTable
                        data={ this.state.workers }
                        tableStyle={{border: 'none', fontFamily: 'Montserrat'}}>
                        <TableHeaderColumn
                            dataField='id'
                            dataFormat={this.workersTitle}
                            thStyle={style.thStyle}
                            tdStyle={style.tdStyle}
                            isKey>User</TableHeaderColumn>
                        <TableHeaderColumn
                            dataFormat={this.workersMail}
                            thStyle={style.thStyle}
                            tdStyle={style.tdStyle}>Mail</TableHeaderColumn>
                        <TableHeaderColumn
                            dataFormat={this.workersPhone}
                            thStyle={style.thStyle}
                            tdStyle={style.tdStyle}>Phone</TableHeaderColumn>
                        <TableHeaderColumn
                            dataFormat={this.workersCompany}
                            thStyle={style.thStyle}
                            tdStyle={style.tdStyle}>Company</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        }
    }
}
export default Users