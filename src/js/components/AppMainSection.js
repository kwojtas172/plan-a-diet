import React from "react";
import FirstAppSection from "./FirstAppSection";
import SecondAppSection from "./SecondAppSection";

export default class AppMainSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // isUser: false
        }
    }

    // changeUser = () => {
    //     this.setState({
    //         isUser: true
    //     })
    //     console.log("Działa")
    // }


    render() {
      if(!this.props.isUser) {
          return <FirstAppSection /* changeUser={this.changeUser} */ addName={this.props.addName}/>
      }
      if(this.props.isUser) {
          return <SecondAppSection />
      }
    }
}