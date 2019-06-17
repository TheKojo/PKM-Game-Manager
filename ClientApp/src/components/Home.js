import React, { Component } from 'react';
import './Home.css';
import ReactTable from "react-table";
import "react-table/react-table.css";



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
        this.checkTop = this.checkTop.bind(this);

    }

    componentDidMount() {
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({ pkmList: data, isLoading: false }));
    }

    checkTop() {
        var tb = document.getElementById("tbodyid");
        if (tb.scrollTop === 0) {
            tb.classList.remove("scrolled");
        }
        else {
            tb.classList.add("scrolled");
        }
    }

    changeInfo(pkmId) {

        var nameBox = document.getElementById('namebox');
        var internalNameBox = document.getElementById('internalname');
        var kindBox = document.getElementById('kind');
        //var pkmListForm = document.getElementById('pkmlist');
        //var oldIndex = pkmIndex;
        var table = document.getElementById("pkmtable");
        var oldRow = document.getElementsByClassName("selected");
        if (typeof oldRow[0] !== "undefined") {
            oldRow[0].classList.remove("selected");
        }
        

        var pkmIndex = pkmId - 1;//pkmListForm.selectedIndex;
        
        table.rows[pkmId].classList.add("selected");


        var hp = document.getElementById('hp');
        var attack = document.getElementById('attack');
        var defense = document.getElementById('defense');
        var spatk = document.getElementById('spatk');
        var spdef = document.getElementById('spdef');
        var speed = document.getElementById('speed');

        nameBox.value = this.state.pkmList[pkmIndex].name;
        internalNameBox.value = this.state.pkmList[pkmIndex].internalName;
        hp.value = this.state.pkmList[pkmIndex].hp;
        attack.value = this.state.pkmList[pkmIndex].attack;
        defense.value = this.state.pkmList[pkmIndex].defense;
        spatk.value = this.state.pkmList[pkmIndex].spAtk;
        spdef.value = this.state.pkmList[pkmIndex].spDef;
        speed.value = this.state.pkmList[pkmIndex].speed;
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
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <form class="searchb">
                    <font color="#4d5f5c">Filter:</font><br/>
                    <input type="text" name="search"/>
                </form>

                <table id="pkmtable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Pokemon</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyid" onScroll={this.checkTop}>
                        {this.state.pkmList.map(pkm => <tr key={pkm.pokemonId} onClick={() => this.changeInfo(pkm.pokemonId)}>
                            <td><img src={`data:image/jpeg;base64,${pkm.icon}`} /></td>
                            <td>{pkm.name}</td>
                        </tr>
                        )}
                    </tbody>
                </table>

                <form class="pkminfo">
                    Name:<br/>
                    <input id="namebox" type="text" name="pkmname"/>
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
                    <br />InternalName:<br />
                    <input type="text" id="internalname" />
                    <div class="hp">
                        <br />HP:<br />
                        <input type="number" id="hp" min="1" max="255"/>
                        <br />Attack:<br />
                        <input type="number" id="attack" min="1" max="255"/>
                        <br />Defense:<br />
                        <input type="number" id="defense" min="1" max="255" />
                        <br />Sp. Attack:<br />
                        <input type="number" id="spatk" min="1" max="255" />
                        <br />Sp. Defense:<br />
                        <input type="number" id="spdef" min="1" max="255" />
                        <br />Speed:<br />
                        <input type="number" id="speed" min="1" max="255" />
                    </div>
                    <br />Gender Rate:<br />
                    <select id="genderrate">
                        <option>AlwaysMale</option>
                        <option>FemaleOneEighth</option>
                        <option>Female25Percent</option>
                        <option>Female50Percent</option>
                        <option>Female75Percent</option>
                        <option>FemaleSevenEighths</option>
                        <option>AlwaysFemale</option>
                        <option>Genderless</option>
                    </select>
                    <br />Growth Rate:<br />
                    <select id="growthrate">
                        <option>Fast</option>
                        <option>Medium</option>
                        <option>MediumFast</option>
                        <option>Slow</option>
                        <option>Parabolic</option>
                        <option>MediumSlow</option>
                        <option>Erratic</option>
                        <option>Fluctuating</option>
                    </select>
                    <div class="egggroup1">
                        <br />Egg Group 1:<br />
                        <select id="egggroup1">
                            <option>Monster</option>
                            <option>Water1</option>
                            <option>Water2</option>
                            <option>Water3</option>
                            <option>Bug</option>
                            <option>Flying</option>
                            <option>Fairy</option>
                            <option>Grass</option>
                            <option>Humanlike</option>
                            <option>Mineral</option>
                            <option>Amorphous</option>
                            <option>Dragon</option>
                            <option>Ditto</option>
                            <option>Undiscovered</option>
                        </select>
                        <div class="egggroup2">
                            <br />Egg Group 2:<br />
                            <select id="egggroup2">
                                <option>None</option>
                                <option>Monster</option>
                                <option>Water1</option>
                                <option>Water2</option>
                                <option>Water3</option>
                                <option>Bug</option>
                                <option>Flying</option>
                                <option>Fairy</option>
                                <option>Grass</option>
                                <option>Humanlike</option>
                                <option>Mineral</option>
                                <option>Amorphous</option>
                                <option>Dragon</option>
                                <option>Ditto</option>
                                <option>Undiscovered</option>
                            </select>
                        </div>
                    </div>
                    <br />Kind:<br />
                    <input type="text" id="kind"/>
                </form>
            </div>    

        );
    }

}

