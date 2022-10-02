import React, { Component } from "react";

export default class App extends Component {

  state = {
    data: [],
    index: 0
  }

  async componentDidMount(){
    const url = `https://jsonplaceholder.typicode.com/posts/1/comments`;
    try {
      const response = await fetch(url);
      if (!response.ok){
        const error = await response.text();
        throw new Error(error);
      }
      const data = await response.json();
      this.setState({ data });
    } catch(error) {
      console.log(error);
    }
  }

  toggleDiv(index) {
    if (index >= 0 && index < this.state.data.length) {
      this.setState({ index });
      if (index == this.state.data.length - 1) {
        alert('This is the last div');
      }
    }
  }

  render() {
    const { data, index } = this.state;

    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>

        {data.length == 0
          ? 'Loading...'
          : <div>
              <Div data={data[index]} />   
              <button onClick={() => this.toggleDiv(index - 1)}>Back</button>
              <button onClick={() => this.toggleDiv(index + 1)}>Next</button>
            </div>
        }
        
        {index == data.length - 1 && <div style={{ color: 'red' }}>This is the last div</div>}
      </div>
    );
  }
}

function Div({ data }) {
  return(
    <div>
      name: { data.name }
      <br />
      email: { data.email }
    </div>
  )
}
