import React from 'react';
import  ProjectsTable from '../organisms/ProjectsTable'

class AllProjects extends React.Component {
    render() {
        return (
            <div className="all-projects show">
                <ProjectsTable/>
            </div>
        )
    }
}
export default AllProjects