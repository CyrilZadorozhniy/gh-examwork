import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';

export default class StatisticTable extends React.Component {

    constructor() {
        super();
        this.state = {
            loadingStatisticTable: true,
            filterBtn: 'Campaing',
        }
    }
    componentWillMount() {
        function dynamicSort(property) {
            return function (a,b) {
                return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }
        }
        fetch('/statistic/table')
            .then(res => {
                return res.json()
            })
            .then(res => {
                this.setState({
                    statisticTable: res.statisticTable,
                    filterStatisticTable: res.statisticTable.slice().sort(dynamicSort("campaing")),
                    loadingStatisticTable: false,
                })
            });
    }
    sortable = (filter) => {
        function dynamicSort(property) {
            return function (a,b) {
                return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            }
        }
        switch (filter) {
            case 'Campaing' :
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort(dynamicSort("campaing")),
                    filterBtn: 'Campaing',
                });
                break;
            case 'Time':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.time < b.time) {
                            return 1;
                        }
                        if (a.time > b.time) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'Time',
                });
                break;
            case 'Views':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.views < b.views) {
                            return 1;
                        }
                        if (a.views > b.views) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'Views',
                });
                break;
            case 'Visitors':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.visitors < b.visitors) {
                            return 1;
                        }
                        if (a.visitors > b.visitors) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'Visitors',
                });
                break;
            case 'CTR':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.ctr < b.ctr) {
                            return 1;
                        }
                        if (a.ctr > b.ctr) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'CTR',
                });
                break;
            case 'CPC':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.cpc < b.cpc) {
                            return 1;
                        }
                        if (a.cpc > b.cpc) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'CPC',
                });
                break;
            case 'CPV':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.cpv < b.cpv) {
                            return 1;
                        }
                        if (a.cpv > b.cpv) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'CPV',
                });
                break;
            case 'CPM':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a ,b) => {
                        if (a.cpm < b.cpm) {
                            return 1;
                        }
                        if (a.cpm > b.cpm) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'CPM',
                });
                break;
            case 'Status':
                this.setState({
                    filterStatisticTable: this.state.statisticTable.slice().sort((a,b) => {
                        if (a.status < b.status) {
                            return 1;
                        }
                        if (a.status > b.status) {
                            return -1;
                        }
                        return 0;
                    }),
                    filterBtn: 'Status',
                });
                break;
        }
    };
    render() {
        if (this.state.loadingStatisticTable) {
            return <div style={{backgroundColor: '#2b2d3c',display: 'flex',justifyContent: 'center',alignItems: 'center', height: '100vh'}}>
                <CircularProgress color={'#757da4'} size={60} thickness={7} />
            </div>
        }
        return (
            <table className="statistic-table">
                <thead>
                <tr>
                    <th><p className={this.state.filterBtn === 'Campaing'? 'active-table-btn':null} onClick={() => this.sortable('Campaing')}>Campaing <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'Time'? 'active-table-btn':null} onClick={() => this.sortable('Time')}>Time <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'Views'? 'active-table-btn':null}  onClick={() => this.sortable('Views')}>Views <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'Visitors'? 'active-table-btn':null}  onClick={() => this.sortable('Visitors')}>Visitors <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'CTR'? 'active-table-btn':null}  onClick={() => this.sortable('CTR')}>CTR <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'CPC'? 'active-table-btn':null}  onClick={() => this.sortable('CPC')}>CPC <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'CPV'? 'active-table-btn':null}  onClick={() => this.sortable('CPV')}>CPV <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'CPM'? 'active-table-btn':null} onClick={() => this.sortable('CPM')}>CPM <i className="material-icons">keyboard_arrow_down</i></p></th>
                    <th><p className={this.state.filterBtn === 'Status'? 'active-table-btn':null}  onClick={() => this.sortable('Status')}>Status <i className="material-icons">keyboard_arrow_down</i></p></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.filterStatisticTable.map(row => {
                        return (
                            <tr key={row.id}>
                                <td>{row.campaing}</td>
                                <td>{row.time}</td>
                                <td>{row.views}</td>
                                <td>{row.visitors}</td>
                                <td>{row.ctr}%</td>
                                <td>${row.cpc}</td>
                                <td>${row.cpv}</td>
                                <td>${row.cpm}</td>
                                <td><p style={{display:'flex',alignItems:'center',margin:0}}><span style={row.status ? {marginRight:5,display:'block',width:14,height:14,borderRadius: 50, backgroundColor:'#4caf50'}:{marginRight:5,display:'block',width:14,height:14,borderRadius: 50, backgroundColor:'#f44336'}}></span> Active</p></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}