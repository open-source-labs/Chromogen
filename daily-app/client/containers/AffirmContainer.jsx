
import React, { Component } from 'react';

class Affirm extends Component{
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        item: []
      }
  }
  componentDidMount() {
    // const apiKey = '44de4b2cebccffd325e3e949ad0e6beebfefb6ca';
    // fetch(`https://zenquotes.io/api/today/${apiKey}`)
    // .then(res => res.json())
    // .then((result) => {
    //     this.setState({
    //         isLoaded: true,
    //         item: result
    //     });
    // },
    // (error) => {
    //     this.setState({
    //         isLoaded: true,
    //         error
    //     });
    // })
  }

  render() {
        const { error, isLoaded, item} = this.state;
        if (error){
            return <div>Error</div>
        }else if (!isLoaded) {
            return <div>loading...</div>
        }else {
            return (
         <div className='affirm'> 
           <span id='quote'>
           { `"${item[0]['q']}"`}
           </span>
          <span id='author'>
            {`- ${item[0]['a']}`}
          </span>
        </div>
            )
        }

  }
}

export default Affirm;