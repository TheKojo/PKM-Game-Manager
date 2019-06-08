import React, { Component } from 'react';
import './Home.css';



export class Home extends Component {
    displayName = Home.name

    constructor() {
        super();
        this.state = {
            pkmList: [],
            isLoading: false,
        };

        this.changeInfo = this.changeInfo.bind(this);
        this.capitalize = this.capitalize.bind(this);


    }

    componentDidMount() {
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({ pkmList: data, isLoading: false }));

    }

    changeInfo() {
        var nameBox = document.getElementById('namebox');
        var internalNameBox = document.getElementById('internalname');
        var kindBox = document.getElementById('kind');
        var pkmListForm = document.getElementById('pkmlist');
        var pkmIndex = pkmListForm.selectedIndex;

        nameBox.value = this.state.pkmList[pkmIndex].name;
        internalNameBox.value = this.state.pkmList[pkmIndex].internalName;
        kindBox.value = this.state.pkmList[pkmIndex].kind;

        var typeOneForm = document.getElementById('type1');
        var typeTwoForm = document.getElementById('type2');
        typeOneForm.value = this.capitalize(this.state.pkmList[pkmIndex].type1);
        var typeTwoStr = this.state.pkmList[pkmIndex].type2;
        if (typeTwoStr == null) {
            typeTwoForm.value = "None";
        }
        else {
            typeTwoForm.value = this.capitalize(typeTwoStr);
        }
        

    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
    }

    render() {
        const { pkmList, isLoading } = this.state;
        

        return (
            <div>
                <form class="searchb">
                    Filter:<br/>
                    <input type="text" name="search"></input>
                </form>

                
                <select id="pkmlist" size="20" onChange={this.changeInfo}>
                    {this.state.pkmList.map(pkm =><option key={pkm.pokemonId}>{pkm.name}</option>)}
                </select>


                <form class="pkminfo">
                    Name:<br/>
                    <input id="namebox" type="text" name="pkmname"></input>
                    <br />
                    <div class="type1">
                        Type-1:<br />
                        <select id="type1">
                            <option>Normal</option>
                            <option>Fighting</option>
                            <option>Flying</option>
                            <option>Poison</option>
                            <option>Ground</option>
                            <option>Rock</option>
                            <option>Bug</option>
                            <option>Ghost</option>
                            <option>Steel</option>
                            <option>Fire</option>
                            <option>Water</option>
                            <option>Grass</option>
                            <option>Electric</option>
                            <option>Psychic</option>
                            <option>Ice</option>
                            <option>Dragon</option>
                            <option>Dark</option>
                            <option>Fairy</option>
                        </select>

                        <div class="type2">
                            Type-2:<br />
                            <select id="type2">
                            <option>None</option>
                            <option>Normal</option>
                            <option>Fighting</option>
                            <option>Flying</option>
                            <option>Poison</option>
                            <option>Ground</option>
                            <option>Rock</option>
                            <option>Bug</option>
                            <option>Ghost</option>
                            <option>Steel</option>
                            <option>Fire</option>
                            <option>Water</option>
                            <option>Grass</option>
                            <option>Electric</option>
                            <option>Psychic</option>
                            <option>Ice</option>
                            <option>Dragon</option>
                            <option>Dark</option>
                            <option>Fairy</option>
                            </select>
                        </div>
                    </div>
                    <br />InternalName:<br></br>
                    <input type="text" id="internalname"></input>
                    <br />Kind:<br></br>
                    <input type="text" id="kind"></input>
                </form>
            </div>    


        /*
        <h1>Hello, world!</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we've also set up:</p>
        <ul>
          <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
          <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
          <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
        */
    );
    }





}

export class Pokemon {
    name: string;
}
