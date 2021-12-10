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
        <Link to={`/projects/${props.project_id}`} > Chat</Link>
      </div>  
    )


}

export default ProjectCard;