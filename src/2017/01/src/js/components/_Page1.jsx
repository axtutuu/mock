import React from 'react';
import Header from './_Header.jsx';


export default class Page1 extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title: title});
  }

  render() {
   return(
     <div>
       <h1> show Page1 </h1>
       <Header title={this.state.title} callback={this.changeTitle.bind(this)} />
     </div>
   );
  }
}


// export default class Page1 extends React.Component {
//   constructor() {
//     suepr();
//     this.state = {
//       title: "Welcome",
//     };
//   }
// 
//   changeTitle(title) {
//     this.setState({title: title});
//   }
// 
//   render() {
//     return(
//       <div>
//         <h1> show Page1 </h1>
//         <Header title={this.state.title} callback={this.changeTitle.bind(this)} />
//       </div>
//     );
//   };
// }
