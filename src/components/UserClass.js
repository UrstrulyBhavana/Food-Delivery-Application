import React from "react";

class UserClass extends React.Component{
    constructor(props){
      super(props);
      //console.log(props);

        this.state = {
            UserInfo: { 
                name: "Dummy",
                location: "Default",
                company: "Default",
            }
        };
       //console.log( this.props.name + "Child Constructor")
    }

    async componentDidMount(){
     //console.log(this.props.name + "Child Component Did Mount")
     const data = await fetch("https://api.github.com/users/UrstrulyBhavana");
     const json = await data.json();

     this.setState({
        UserInfo : json,
     })

     console.log(json)
    }

    componentDidUpdate(){
        console.log("Component Did Update")
    }

    render() {
        const { name , location , company} = this.state.UserInfo;
        // debugger;

        //console.log(this.props.name  +  "Child Render")

        return (
            <div className="user-card">
                <h2>Name: {name}</h2>
                <h3>Location:{location}</h3>
                <h3>Company : {company}</h3>
            </div>
        )
    }

}


export default UserClass;