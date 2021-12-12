import { Link } from "react-router-dom";

const ProjectCard=(props)=>{
    return(
        <div>
        <h3>{props.title}</h3>
        <div>Description:{props.description}</div>
        <div>Status:{props.status}</div>
        <div>Budget:{props.budget}</div>
        <div>Customer:{props.customer_id}</div>
        <div>Contractor:{props.contractor_id}</div>
        <div>Start Time:{props.start_time}</div>
        <div>End Time:{props.end_time}</div>
        <Link to={`/projects/${props.project_id}`} > Chat</Link>
      </div>  
    )


}

export default ProjectCard;