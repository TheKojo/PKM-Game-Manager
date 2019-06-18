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

        var artwork = document.getElementById('artwork');
        artwork.src = 'data:image/png;base64,' + this.state.pkmList[pkmIndex].artwork;

        var hp = document.getElementById('hp');
        var attack = document.getElementById('attack');
        var defense = document.getElementById('defense');
        var spatk = document.getElementById('spatk');
        var spdef = document.getElementById('spdef');
        var speed = document.getElementById('speed');

        var evhp = document.getElementById('evhp');
        var evattack = document.getElementById('evattack');
        var evdefense = document.getElementById('evdefense');
        var evspatk = document.getElementById('evspatk');
        var evspdef = document.getElementById('evspdef');
        var evspeed = document.getElementById('evspeed');

        nameBox.value = this.state.pkmList[pkmIndex].name;
        internalNameBox.value = this.state.pkmList[pkmIndex].internalName;
        kindBox.value = this.state.pkmList[pkmIndex].kind;
        hp.value = this.state.pkmList[pkmIndex].hp;
        attack.value = this.state.pkmList[pkmIndex].attack;
        defense.value = this.state.pkmList[pkmIndex].defense;
        spatk.value = this.state.pkmList[pkmIndex].spAtk;
        spdef.value = this.state.pkmList[pkmIndex].spDef;
        speed.value = this.state.pkmList[pkmIndex].speed;
        evhp.value = this.state.pkmList[pkmIndex].evhp;
        evattack.value= this.state.pkmList[pkmIndex].evAttack;
        evdefense.value = this.state.pkmList[pkmIndex].evDefense;
        evspatk.value = this.state.pkmList[pkmIndex].evSpAtk;
        evspdef.value = this.state.pkmList[pkmIndex].evSpDef;
        evspeed.value = this.state.pkmList[pkmIndex].evSpeed;
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

        requestAnimationFrame(() => { this.updateBar(0, pkmIndex) });

    }

    updateBar(prog, pkmIndex) {

        var canvas = document.getElementById('statCanvas');
        var context = canvas.getContext("2d");
        context.fillStyle = "#4d5f5c";
        context.fillRect(0, 0, 250, 140);

        context.fillStyle = "#5b7672";
        context.fillRect(0, 110, 250, 30);

        context.fillStyle = "#ffffff";
        context.fillText("HP", 18, 122);
        context.fillText("ATK", 46, 122);
        context.fillText("DEF", 76, 122);
        context.fillText("SPA", 106, 122);
        context.fillText("SPD", 136, 122);
        context.fillText("SPE", 166, 122);

        var bst = 0;

        var stat = this.state.pkmList[pkmIndex].hp;
        context.fillStyle = this.getBarColor(stat * (prog / 100));
        context.fillRect(20, 110 - (stat / 2) * (prog / 100), 10, (stat / 2) * (prog / 100));
        bst = bst + stat;

        stat = this.state.pkmList[pkmIndex].attack;
        context.fillStyle = this.getBarColor(stat * (prog / 100));
        context.fillRect(50, 110 - (stat / 2) * (prog / 100), 10, (stat / 2) * (prog / 100));
        bst = bst + stat;

        stat = this.state.pkmList[pkmIndex].defense;
        context.fillStyle = this.getBarColor(stat * (prog / 100));
        context.fillRect(80, 110 - (stat / 2) * (prog / 100), 10, (stat / 2) * (prog / 100));
        bst = bst + stat;

        stat = this.state.pkmList[pkmIndex].spAtk;
        context.fillStyle = this.getBarColor(stat * (prog / 100));
        context.fillRect(110, 110 - (stat / 2) * (prog / 100), 10, (stat / 2) * (prog / 100));
        bst = bst + stat;

        stat = this.state.pkmList[pkmIndex].spDef;
        context.fillStyle = this.getBarColor(stat * (prog / 100));
        context.fillRect(140, 110 - (stat / 2) * (prog / 100), 10, (stat / 2) * (prog / 100));
        bst = bst + stat;

        stat = this.state.pkmList[pkmIndex].speed;
        context.fillStyle = this.getBarColor(stat * (prog / 100));
        context.fillRect(170, 110 - (stat / 2) * (prog / 100), 10, (stat / 2) * (prog / 100));
        bst = bst + stat;

        context.fillStyle = this.getBarColor(bst / 6);
        context.fillText("BST: " + bst, 85, 135);

        if (prog < 100) {
            requestAnimationFrame(() => { this.updateBar(prog + 5, pkmIndex) });
        }
        
        
    }

    getBarColor(statVal) {
        if (statVal < 20) {
            return "#c1222e";
        }
        else if (statVal < 40) {
            return "#f2222e";
        }
        else if (statVal < 60) {
            return "#f25c2e";
        }
        else if (statVal < 70) {
            return "#f2972e";
        }
        else if (statVal < 80) {
            return "#f2c12e";
        }
        else if (statVal < 90) {
            return "#bfd943";
        }
        else if (statVal < 100) {
            return "#a9d943";
        }
        else if (statVal < 110) {
            return "#98d943";
        }
        else if (statVal < 120) {
            return "#7bd943";
        }
        else if (statVal < 150) {
            return "#68d943";
        }
        else if (statVal < 170) {
            return "#57d958";
        }
        else if (statVal < 200) {
            return "#57d98a";
        }
        else {
            return "#57d9ab";
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
                    <div>
                        <img id="artwork" />
                    </div>
                    <div class="sectionOne">
                        Name:<br />
                        <input id="namebox" type="text" name="pkmname" />
                        <br />
                        <div class="type1">
                            Type 1:<br />
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
                        </div>
                        <div class="type2">
                            Type 2:<br />
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
                        <br />Internal Name:<br />
                        <input type="text" id="internalname" />
                        <br />Kind:<br />
                        <input type="text" id="kind" />
                    </div> 

                    
                    <div class="sectionTwo">
                        <div class="stat">
                            HP:<br />
                            <input type="number" id="hp" min="1" max="255" />
                        </div>

                        <div class="stat">
                            Attack:<br />
                            <input type="number" id="attack" min="1" max="255" />
                        </div>

                        <div class="stat">
                            Defense:<br />
                            <input type="number" id="defense" min="1" max="255" />
                        </div>

                        <div class="stat">
                            Sp. Atk:<br />
                            <input type="number" id="spatk" min="1" max="255" />
                        </div>

                        <div class="stat">
                            Sp. Def:<br />
                            <input type="number" id="spdef" min="1" max="255" />
                        </div>

                        <div class="stat">
                            Speed:<br />
                            <input type="number" id="speed" min="1" max="255" />
                        </div>
                    </div>

                    <canvas id="statCanvas" width="202" height="140">
                    </canvas>

                    <div class="sectionThree">
                        <div class="evstat">
                            EVHP:<br />
                            <input type="number" id="evhp" min="0" max="3" />
                        </div>

                        <div class="evstat">
                            EVAtk:<br />
                            <input type="number" id="evattack" min="0" max="3" />
                        </div>

                        <div class="evstat">
                            EVDef:<br />
                            <input type="number" id="evdefense" min="0" max="3" />
                        </div>

                        <div class="evstat">
                            EVSpA:<br />
                            <input type="number" id="evspatk" min="0" max="3" />
                        </div>

                        <div class="evstat">
                            EVSpD:<br />
                            <input type="number" id="evspdef" min="0" max="3" />
                        </div>

                        <div class="evstat">
                            EVSpe:<br />
                            <input type="number" id="evspeed" min="0" max="3" />
                        </div>
                    </div>


                    <div class="sectionFour">
                        <div class="rate">
                            Gender Rate:<br />
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
                        </div>

                        <div class="rate">
                            Growth Rate:<br />
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
                        </div>
                    </div>

                    <br/>
                    <div class="sectionFive">
                        <div class="egggroup">
                            Egg Group 1:<br />
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
                        </div>
                        <div class="egggroup">
                            Egg Group 2:<br />
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
                    
                </form>
            </div>    

        );
    }

}

