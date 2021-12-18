import axios from "axios";
// const BASE_URL = "https://pickfix-backend.herokuapp.com" || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";
// const BASE_URL = "https://pickfix-backend.herokuapp.com";
class pickFixApi{
    static token;
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { authorization: `Bearer ${pickFixApi.token}` };
        try {
          return (await axios({ url, method, data, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
    static async signUp(data){
        let res= await this.request('users/register',data,"post");
        return res.token;
    }
    static async logIn(data){
        console.log("api logIn data: ",data)
        console.log("2 BASE_URL: ",BASE_URL)
        let res= await this.request('users/login',data,"post");
        return res.token;
    }
    static async getCurrentUser(id,userType){
        let res= await this.request(`users/${id}/${userType}`);
        return res
    }
    static async updateUser(id,data){
        let res= await this.request(`users/${id}`, data,"patch" );
        return res
    }
    static async getProjects(id,userType){
      let res= await this.request(`projects/user/${userType}/${id}`) ;
      return res.projects;
    }
    static async getProject(id){
      let res= await this.request(`projects/${id}`) ;
      return res;
    }
    static async updateProject(id,data){
      let res= await this.request(`projects/${id}`,data, "patch") ;
      return res;
    }
    static async getProjectChat(id){
      let res= await this.request(`projects/chat/${id}`) 
      return res.chat;
    }
    static async addProjectChat(data,id){
      console.log("1 api add Chat:",{data,id})
      let res= await this.request(`projects/chat/${id}`,data,"post")
      console.log("2 api add Chat:", res)
    }
    static async getContractors(data){     
      let res= await this.request(`users/contractors`,data,"post");
      console.log("api get contractors: ", res)
      return res;
    }
    static async getEvents(id,userType){
      let res= await this.request(`events/${userType}/${id}`);
      console.log("api events:", res.event);
      return res.event;
    }
    static async addProject(data){
      let res= await this.request(`projects/add`,data, "post");
      console.log("api addProject:", res)
      return res;
    }
    static async addLocation(data,id){
      let res= await this.request(`location/add/${id}`,data, "post");
      console.log("api addProject:", res)
      return res;
    }
}

export default pickFixApi;