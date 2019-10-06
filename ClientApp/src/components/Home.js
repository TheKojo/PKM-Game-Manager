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
            isLoading: true,
            curIndex: 1,
            moveList: [],
            tab: 0,
            name: '', internalName: '',
            type1: '', type2: '',
            hp: 0, attack: 0, defense: 0, spatk: 0, spdef: 0, speed: 0,
            evhp: 0, evAttack: 0, evDefense: 0, evSpAtk: 0, evSpDef: 0, evSpeed: 0,
            kind: '',
            genderRate: '', growthRate: '',
            eggGroup1: '', eggGroup2: '',
            artwork: '', artworkStr: '',
            icon: '', iconStr: '',
            frontSprite: '', frontSpriteStr: '',
            backSprite: '', backSpriteStr: '',
            exportText: ''
        };

        this.changeInfo = this.changeInfo.bind(this);
        this.capitalize = this.capitalize.bind(this);
        this.checkTop = this.checkTop.bind(this);
        this.savePkm = this.savePkm.bind(this);
        this.getMoveList = this.getMoveList.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.exportMoves = this.exportMoves.bind(this);
        this.checkString = this.checkString.bind(this);
    }

    componentDidMount() {
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({
                pkmList: data, isLoading: false /*curIndex: 1,
                name: data[0].name, internalName: data[0].internalName,
                type1: data[0].type1, type2: data[0].type2, kind: data[0].kind,
                hp: data[0].hp*/
            }));
    }

    /*componentDidUpdate() {
        var index = this.state.curIndex - 1;
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({
                pkmList: data, isLoading: false,
                artwork: data[index].artwork, icon: data[index].icon,
                frontSprite: data[index].frontSprite, backSprite: data[index].backSprite
            }));
    }*/

    handleInputChange(event) {
        let reader = new FileReader();
        const target = event.target;
        const name = target.name;
        var value = target.value;

        reader.onloadend = (event) => {
            //var arr = new Uint8Array(reader.result);
            /*this.setState({
                icon: Array.from(arr)
            });*/

            var str = reader.result;
            this.setState({
                [name]: str
            });
        };

        if ((name === "hp" || name === "attack" || name === "defense" || name === "spAtk" || name === "spDef" || name === "speed") && value > 255) {
            value = 255;
        }
        if (name === "iconStr" || name === "artworkStr" || name === "frontSpriteStr" || name === "backSpriteStr") {
            let file = target.files[0];
            //reader.readAsArrayBuffer(file);
            if (typeof file !== 'undefined') {
                reader.readAsDataURL(file);
            }
            /*else {
                this.setState({
                    [name]: null
                });
            }*/
            
        }
        else {
            this.setState({ [name]: value });
        }
        
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

        var table = document.getElementById("pkmtable");
        var oldRow = document.getElementsByClassName("selected");
        if (typeof oldRow[0] !== "undefined") {
            oldRow[0].classList.remove("selected");
        }
        
        var pkmIndex = pkmId - 1;
        const pkmList = this.state.pkmList;
        const pkm = pkmList[pkmId - 1];
        const name = pkm.name;
        const internalName = pkm.internalName;
        const type1 = this.capitalize(pkm.type1);
        const type2 = this.capitalize(pkm.type2);
        const hp = pkm.hp;
        const attack = pkm.attack;
        const defense = pkm.defense;
        const spAtk = pkm.spAtk;
        const spDef = pkm.spDef;
        const speed = pkm.speed;
        const evhp = pkm.evhp;
        const evAttack = pkm.evAttack;
        const evDefense = pkm.evDefense;
        const evSpAtk = pkm.evSpAtk;
        const evSpDef = pkm.evSpDef;
        const evSpeed = pkm.evSpeed;
        const kind = pkm.kind;
        const growthRate = pkm.growthRate;
        const genderRate = pkm.genderRate;
        const eggGroup1 = pkm.eggGroup1;
        const eggGroup2 = pkm.eggGroup2;
        const artwork = pkm.artwork;
        const icon = pkm.icon;
        const frontSprite = pkm.frontSprite;
        const backSprite = pkm.backSprite;
        this.setState({
            curIndex: pkmId, name: name, internalName: internalName,
            type1: type1, type2: type2,
            hp: hp, attack: attack, defense: defense, spAtk: spAtk, spDef: spDef, speed: speed,
            evhp: evhp, evAttack: evAttack, evDefense: evDefense, evSpAtk: evSpAtk, evSpDef: evSpDef, evSpeed: evSpeed,
            kind: kind, growthRate: growthRate, genderRate: genderRate,
            eggGroup1: eggGroup1, eggGrouvp2: eggGroup2,
            artwork: artwork, icon: icon, frontSprite: frontSprite, backSprite: backSprite,
            artworkStr: null, iconStr: null, frontSpriteStr: null, backSpriteStr: null,
            exportText: ''
        });
        
        table.rows[pkmId].classList.add("selected");

        //Set image inputs back to null
        var artworkInput = document.getElementById('artworkFileInput');
        if (artworkInput !== null) {
            artworkInput.value = null;
        }
        var iconInput = document.getElementById('iconFileInput');
        if (iconInput !== null) {
            iconInput.value = null;
        }
        var frontSpriteInput = document.getElementById('frontSpriteFileInput');
        if (frontSpriteInput !== null) {
            frontSpriteInput.value = null;
        }
        var backSpriteInput = document.getElementById('backSpriteFileInput');
        if (backSpriteInput !== null) {
            backSpriteInput.value = null;
        }

        var selTab = document.getElementById('info');
        var artTab = document.getElementById('art');
        var expTab = document.getElementById('export');
        switch (this.state.tab) {
            case 0:
                selTab.classList.add("buttonTabSelected");
                artTab.classList.remove("buttonTabSelected");
                expTab.classList.remove("buttonTabSelected");
                break;
            case 1:
                selTab.classList.remove("buttonTabSelected");
                artTab.classList.add("buttonTabSelected");
                expTab.classList.remove("buttonTabSelected");
                break;
            case 2:
                selTab.classList.remove("buttonTabSelected");
                artTab.classList.remove("buttonTabSelected");
                expTab.classList.add("buttonTabSelected");
                break;
        }

        //var artwork = document.getElementById('artwork');
        //artwork.src = 'data:image/png;base64,' + this.state.pkmList[pkmIndex].artwork;

        requestAnimationFrame(() => { this.updateBar(0, pkmIndex) });

    }

    updateBar(prog, pkmIndex) {

        var canvas = document.getElementById('statCanvas');
        if (canvas !== null) {
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

            this.getMoveList();
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
        if (string === null) {
            return "None";
        }
        else {
            return string.charAt(0).toUpperCase() + (string.slice(1)).toLowerCase();
        }
        
    }

    changeTab(newTab) {
        this.setState({ tab: newTab });
        var selTab = document.getElementById('info');
        var artTab = document.getElementById('art');
        var expTab = document.getElementById('export');
        switch (newTab) {
            case 0:
                selTab.classList.add("buttonTabSelected");
                artTab.classList.remove("buttonTabSelected");
                expTab.classList.remove("buttonTabSelected");
                requestAnimationFrame(() => { this.updateBar(0, this.state.curIndex) });
                break;
            case 1:
                selTab.classList.remove("buttonTabSelected");
                artTab.classList.add("buttonTabSelected");
                expTab.classList.remove("buttonTabSelected");
                break;
            case 2:
                selTab.classList.remove("buttonTabSelected");
                artTab.classList.remove("buttonTabSelected");
                expTab.classList.add("buttonTabSelected");
                break;
        }
    }


    getMoveList() {
        const data = new FormData();
        data.set('pokemonid', this.state.curIndex);
        fetch('api/Home/Moves', {
            method: 'POST',
            body: data
        }).then(response => response.json())
            .then(data => this.setState({ moveList: data }));
    }

    exportMoves() {
        const data = new FormData();
        data.set('pokemonid', this.state.curIndex);
        fetch('api/Home/ExportMoves', {
            method: 'POST',
            body: data
        })
            .then((response) => response.text())
            .then(data => this.setState({ exportText: data }));

            //.then(data => { this.checkString(data); });
            //.then(data => { console.log(data) });
        
    }


    savePkm(event) {
        event.preventDefault();
        var index = this.state.curIndex - 1;
        const data = new FormData(event.target);
        data.set('pokemonid', this.state.curIndex);
        data.set('name', this.state.name);
        data.set('internalName', this.state.internalName);
        data.set('type1', this.state.type1);
        data.set('type2', this.state.type2);
        data.set('hp', this.state.hp);
        data.set('attack', this.state.attack);
        data.set('defense', this.state.defense);
        data.set('spAtk', this.state.spAtk);
        data.set('spDef', this.state.spDef);
        data.set('speed', this.state.speed);
        data.set('evhp', this.state.evhp);
        data.set('evAttack', this.state.evAttack);
        data.set('evDefense', this.state.evDefense);
        data.set('evSpAtk', this.state.evSpAtk);
        data.set('evSpDef', this.state.evSpDef);
        data.set('evSpeed', this.state.evSpeed);
        data.set('kind', this.state.kind);
        data.set('growthRate', this.state.growthRate);
        data.set('genderRate', this.state.genderRate);
        data.set('eggGroup1', this.state.eggGroup1);
        data.set('eggGroup2', this.state.eggGroup2);
        data.set('artworkStr', this.state.artworkStr);
        data.set('iconStr', this.state.iconStr);
        data.set('frontSpriteStr', this.state.frontSpriteStr);
        data.set('backSpriteStr', this.state.backSpriteStr);
        fetch('api/Home/SavePkm', {
            method: 'POST',
            body: data
        })
        .then((response) => response.json())
        .then(data => this.setState({
            pkmList: data, isLoading: false,
            artwork: data[index].artwork, icon: data[index].icon,
            frontSprite: data[index].frontSprite, backSprite: data[index].backSprite
        }));



    }

    render() {
        const { pkmList, isLoading, curIndex, name, internalName,
            type1, type2,
            hp, attack, defense, spAtk, spDef, speed,
            evhp, evAttack, evDefense, evSpAtk, evSpDef, evSpeed,
            kind, growthRate, genderRate, eggGroup1, eggGroup2,
            artwork, icon, frontSprite, backSprite, exportText} = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            
            <div>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <form className="searchb">
                    <font color="#4d5f5c">Filter:</font><br/>
                    <input type="text" name="search"/>
                </form>


                <table id="pkmtable">
                    <thead>
                        <tr>
                            <th/>
                            <th>Pokemon</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyid" className="pkmlist" onScroll={this.checkTop}>
                        {this.state.pkmList.map(pkm => (
                        <tr key={pkm.pokemonId} onClick={() => this.changeInfo(pkm.pokemonId)}>
                            <td><img src={`data:image/jpeg;base64,${pkm.icon}`} /></td>
                            <td>{pkm.name}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <form className="pkminfo" onSubmit={this.savePkm}>
                    
                    <button type="button" className="buttonTab" id="info" onClick={() => this.changeTab(0)}>Info</button>
                    <button type="button" className="buttonTab" id="art" onClick={() => this.changeTab(1)}>Art</button>
                    <button type="button" className="buttonTab" id="export" onClick={() => this.changeTab(2)}>Export</button>

                    {this.state.tab === 0 && <div className="infoSection">
                        <div>
                            <img id="artwork" src={'data:image/png;base64,' + artwork} height="252" width="252"/>
                        </div>
                        <div className="sectionOne">
                            Name:<br />
                            <input id="namebox" type="text" name="name" value={name} onChange={this.handleInputChange}/>
                            <br />
                            <div className="type1">
                                Type 1:<br />
                                <select id="type1" name="type1" value={type1} onChange={this.handleInputChange}>
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
                            <div className="type2">
                                Type 2:<br />
                                <select id="type2" name="type2" value={type2} onChange={this.handleInputChange}>
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
                            <input type="text" id="internalName" name="internalName" value={internalName} onChange={this.handleInputChange}/>
                            <br />Kind:<br />
                            <input type="text" id="kind" name="kind" value={kind} onChange={this.handleInputChange}/>
                        </div>


                        <div className="sectionTwo">
                            <div className="stat">
                                HP:<br />
                                <input type="number" id="hp" min="1" max="255" name="hp" value={hp} onChange={this.handleInputChange}/>
                            </div>

                            <div className="stat">
                                Attack:<br />
                                <input type="number" id="attack" min="1" max="255" name="attack" value={attack} onChange={this.handleInputChange}/>
                            </div>

                            <div className="stat">
                                Defense:<br />
                                <input type="number" id="defense" min="1" max="255" name="defense" value={defense} onChange={this.handleInputChange}/>
                            </div>

                            <div className="stat">
                                Sp. Atk:<br />
                                <input type="number" id="spatk" min="1" max="255" name="spAtk" value={spAtk} onChange={this.handleInputChange}/>
                            </div>

                            <div className="stat">
                                Sp. Def:<br />
                                <input type="number" id="spdef" min="1" max="255" name="spDef" value={spDef} onChange={this.handleInputChange}/>
                            </div>

                            <div className="stat">
                                Speed:<br />
                                <input type="number" id="speed" min="1" max="255" name="speed" value={speed} onChange={this.handleInputChange}/>
                            </div>
                        </div>

                        <canvas id="statCanvas" width="202" height="140"/>

                        <div className="sectionThree">
                            <div className="evstat">
                                EVHP:<br />
                                <input type="number" id="evhp" min="0" max="3" name="evhp" value={evhp} onChange={this.handleInputChange}/>
                            </div>

                            <div className="evstat">
                                EVAtk:<br />
                                <input type="number" id="evattack" min="0" max="3" name="evatk" value={evAttack} onChange={this.handleInputChange}/>
                            </div>

                            <div className="evstat">
                                EVDef:<br />
                                <input type="number" id="evdefense" min="0" max="3" name="evdefense" value={evDefense} onChange={this.handleInputChange}/>
                            </div>

                            <div className="evstat">
                                EVSpA:<br />
                                <input type="number" id="evspatk" min="0" max="3" name="evspatk" value={evSpAtk} onChange={this.handleInputChange}/>
                            </div>

                            <div className="evstat">
                                EVSpD:<br />
                                <input type="number" id="evspdef" min="0" max="3" name="evspdef" value={evSpDef} onChange={this.handleInputChange}/>
                            </div>

                            <div className="evstat">
                                EVSpe:<br />
                                <input type="number" id="evspeed" min="0" max="3" name="evspeed" value={evSpeed} onChange={this.handleInputChange}/>
                            </div>
                        </div>

                        <div className="sectionMoves">
                            <thead className="movelist">
                                <tr>
                                    <th className="movelist">Level</th>
                                    <th className="movelist">Name</th>
                                    <th className="movelist">Type</th>
                                    <th className="movelist">Category</th>
                                    <th className="movelist">Power</th>
                                    <th className="movelist">Accuracy</th>
                                    <th className="movelist">PP</th>
                                </tr>
                            </thead>
                            <tbody className="movelist" onScroll={this.checkTop}>
                                {this.state.moveList.map(move => (<tr key={move.level} >
                                    <td className="movelistX"><button type="button" className="deleteMove" onClick={this.checkTop}>x</button></td>
                                    <td className="movelist">{move.level}</td>
                                    <td className="movelist">{move.name}</td>
                                    <td className="movelist">{move.type}</td>
                                    <td className="movelist">{move.category}</td>
                                    <td className="movelist">{move.bp}</td>
                                    <td className="movelist">{move.accuracy}%</td>
                                    <td className="movelist">{move.pp}</td>

                                </tr>)
                                )}
                            </tbody>
                        </div>

                        <div className="sectionFour">
                            <div className="rate">
                                Gender Rate:<br />
                                <select id="genderrate" name="genderRate" value={genderRate} onChange={this.handleInputChange}>
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

                            <div className="rate">
                                Growth Rate:<br />
                                <select id="growthrate" name="growthRate" value={growthRate} onChange={this.handleInputChange}>
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

                        <br />
                        <div className="sectionFive">
                            <div className="eggGroup1" >
                                Egg Group 1:<br />
                                <select id="egggroup1" name="eggGroup1" value={eggGroup1} onChange={this.handleInputChange}>
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
                            <div className="egggroup">
                                Egg Group 2:<br />
                                <select id="egggroup2" name="eggGroup2" value={eggGroup2} onChange={this.handleInputChange}>
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

                    </div>}

                    {this.state.tab === 1 && <div className="artSection">
                        <div className="imgArtwork">
                            Artwork:<br/>
                            <img id="artwork" src={'data:image/png;base64,' + artwork} height="52" width="52"/>
                            <input type="file" id="artworkFileInput" name="artworkStr" accept="image/*" onChange={this.handleInputChange}/>
                            {/* <button type="button" className="upload">Upload</button> */}
                        </div>
                        <div className="imgIcon">
                            Icon:<br />
                            <img id="icon" src={'data:image/png;base64,' + icon}/>
                            <input type="file" id="iconFileInput" name="iconStr" accept="image/*" onChange={this.handleInputChange}/>
                            {/* <button type="button" className="upload">Upload</button> */}
                        </div>
                        <div className="imgFront">
                            Front Sprite:<br />
                            <img id="frontSprite" src={'data:image/png;base64,' + frontSprite}/>
                            <input type="file" id="frontSpriteFileInput" name="frontSpriteStr" accept="image/*" onChange={this.handleInputChange}/>
                            {/* <button type="button" className="upload">Upload</button> */}
                        </div>
                        <div className="imgBack">
                            Back Sprite:<br />
                            <img id="backSprite" src={'data:image/png;base64,' + backSprite}/>
                            <input type="file" id="backSpriteFileInput" name="backSpriteStr" accept="image/*" onChange={this.handleInputChange}/>
                            {/* <button type="button" className="upload">Upload</button> */}
                        </div>
                    </div>}

                    {this.state.tab === 2 && <div className="exportSection">
                        Export:<br />
                        <select id="exportSel">
                            <option>General</option>
                            <option>Moves</option>
                        </select>
                        <br />
                        <textarea rows="15" cols="80" name="text" defaultValue={this.state.exportText} value={this.state.exportText}/>
                        <button type="button" className="exportButton" onClick={this.exportMoves}>Export</button>
                    </div>}
    
                    <div className="sectionSix">
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>    

        );
    }



}

