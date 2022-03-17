import React, { Component } from 'react';

class AffirmContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: []
    }
}

componentDidMount() {

  this.setState({
    isLoaded: true,
    item: [{q: 'I do not exist to impress the world. I exist to live my life in a way that will make me happy.', a: 'Richard Bach'}]
  })
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

export default AffirmContainer;