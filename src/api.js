import axios from "axios";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://localhost:3001";
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
      let res= await this.request(`projects/${userType}/${id}`) ;
      return res.projects;
    }

    static async getContractors(){
      let res= await this.request(`users/contractors`);
      return res;
    }

    static async getEvents(id,userType){
      let res= await this.request(`events/${userType}/${id}`);
      console.log("api events:", res.event);
      return res.event;
    }
}

export default pickFixApi;