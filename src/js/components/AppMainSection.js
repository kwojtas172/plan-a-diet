import React from "react";
import FirstAppSection from "./FirstAppSection";
import SecondAppSection from "./SecondAppSection";

export default class AppMainSection extends React.Component {
    render() {
      if(!this.props.isUser) {
          return <FirstAppSection /* changeUser={this.changeUser} */ addName={this.props.addName}/>
      }
      if(this.props.isUser) {
          return <SecondAppSection />
      }
    }
}