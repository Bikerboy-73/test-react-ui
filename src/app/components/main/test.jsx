import React, { Component } from 'react';

class Test extends Component {
    state = { 
        name: "Jarett"
     }

    render() { 
        const handleClick = () => {
            this.setState({name: "Jarett Rodrigues"})
        }
           
        return ( 
            <div>
                <p>{this.state.name}</p>
                <button onClick={handleClick}>CLick</button>
            </div>
         );
    }
}
 
export default Test;