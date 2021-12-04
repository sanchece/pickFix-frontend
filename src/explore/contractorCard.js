const ContractorCard=(props)=>{
    return(
        <div>
        <h3>firstname: {props.firstname}</h3>
        <div>lastname:{props.lastname}</div>
        <div>email:{props.email}</div>

      </div>  
    )
}

export default ContractorCard;