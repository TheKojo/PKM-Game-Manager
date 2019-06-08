import React, { Component } from 'react';
import './Import.css';


export class Import extends Component {
    displayName = Import.name

    constructor(props) {
        super(props);
        this.state = { title: "" }
        this.submitThing = this.submitThing.bind(this);
    }

    render() {
        return (
            <div>
                <form class="pbstext" onSubmit={this.submitThing}>
                    <textarea rows="15" cols="80" name="text"/>
                    <br />
                    <input type="submit" value="Import" />
                    
                </form>
            </div>
        );
    }

    submitThing(event) {
        const data = new FormData(event.target);
        fetch('api/Import/SubmitPBS',{
            method: 'POST',
            body: data
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("/import");
            }) 
        this.props.history.push('/')
    }
}

//<button onClick={this.submitThing}>Import</button>
//<input type="text" name="text"/>