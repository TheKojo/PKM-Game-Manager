import React, { Component } from 'react';
import './Info.css';
import ReactTable from "react-table";
import "react-table/react-table.css";



export class Info extends Component {
    displayName = Info.name

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
        this.padNum = this.padNum.bind(this);
        this.getNeighbor = this.getNeighbor.bind(this);
    }

    componentDidMount() {
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({
                pkmList: data, isLoading: false
            }));
        document.body.style.backgroundColor = "#435c66";
    }


    handleInputChange(event) {
        let reader = new FileReader();
        const target = event.target;
        const name = target.name;
        var value = target.value;

        reader.onloadend = (event) => {
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
            if (typeof file !== 'undefined') {
                reader.readAsDataURL(file);
            }
            
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

    padNum(val) {
        if (val < 10) {
            return '00' + val;
        }
        else if (val < 100) {
            return '0' + val;
        }
        else {
            return val;
        }
    }

    getNeighbor(val) {
        var par = this.props.match.params.pokeIndex;
        var result = ["", "000"];
        var pkm = null;
        switch (val) {
            case 0:
                if (par >= 2) {
                    pkm = this.state.pkmList[par - 2];
                    result = [pkm.name, this.padNum(pkm.pokemonId)];
                }
                break;
            case 1:
                pkm = this.state.pkmList[par - 1];
                result = [pkm.name, this.padNum(pkm.pokemonId)];
                break;
            case 2:
                if (par < this.state.pkmList.length) {
                    pkm = this.state.pkmList[par];
                    result = [pkm.name, this.padNum(pkm.pokemonId)];
                }
                break;
        }
        
        return result;
    }

    render() {
        const { pkmList, isLoading, curIndex, name, internalName,
            type1, type2,
            hp, attack, defense, spAtk, spDef, speed,
            evhp, evAttack, evDefense, evSpAtk, evSpDef, evSpeed,
            kind, growthRate, genderRate, eggGroup1, eggGroup2,
            artwork, icon, frontSprite, backSprite, exportText} = this.state;
        const curPoke = this.state.pkmList[this.props.match.params.pokeIndex-1];
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <div className='neighborBar'>
                    <div className='prevPkm'>
                        {this.getNeighbor(0)[1]}{" "}
                        {this.getNeighbor(0)[0]}
                        <img src={require('./images/icons/' + this.getNeighbor(0)[1] + '.png')} className='icon' alt="icon" />
                    </div>
                    <div className='curPkm'>
                        {this.getNeighbor(1)[1]}{" "} 
                        {this.getNeighbor(1)[0]}
                        <img src={require('./images/icons/' + this.getNeighbor(1)[1] + '.png')} className='icon' alt="icon" />
                    </div>
                    <div className='nextPkm'>
                        {this.getNeighbor(2)[1]}{" "} 
                        {this.getNeighbor(2)[0]}
                        <img src={require('./images/icons/' + this.getNeighbor(2)[1] + '.png')} className='icon' alt="icon" />
                    </div>
                </div>
                <div className='pokeInfo'>
                    <div className='dexNum'>
                        {this.getNeighbor(1)[1]}
                    </div>
                    <div className='name'>
                        {curPoke.name}
                    </div>
                    <div className='species'>
                        {curPoke.kind} Pokemon
                    </div>
                    <div className='frontSprite'>
                        <img src={require('./images/frontSprites/' + this.getNeighbor(1)[1] + '.png')} className='sprite' alt="sprite" />
                    </div>
                    <div className='type1'>
                        {this.capitalize(curPoke.type1)}
                    </div>
                    <div className='type2'>
                        {this.capitalize(curPoke.type2)}
                    </div>
                    <canvas id="statCanvas" width="202" height="140" />
                </div>
                <div className='pokeMoves'>
                    <div className='levelMoves' />
                    <div className='tmMoves' />
                    <div className='eggMoves'/>
                </div>
            </div>    

        );
    }



}

