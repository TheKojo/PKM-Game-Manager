import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';
import logo from './images/logo.png';
import fSprites from './images/frontSprites/001.png';

export class Gallery extends Component {

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

        this.padNum = this.padNum.bind(this);
        this.typeColor = this.typeColor.bind(this);
        this.pokeSelect = this.pokeSelect.bind(this);
    }

    componentDidMount() {
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({
                pkmList: data, isLoading: false
            }));
        document.body.style.backgroundColor = "#435c66";

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

    typeColor(val) {
        if (val.type2 === null || val.type2 === 'NONE') {
            return val.type1;
        }
        else {
            return val.type2;
        }
    }

    pokeSelect(val) {

    }

    render() {
        return (
            <div className ='galleryBody'>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <div>
                    <img src={logo} className='logo'/>

                    {this.state.pkmList.map(pkm => (
                        <div key={pkm.pokemonId} >
                            <Link to={"/info/" + pkm.pokemonId} style={{ textDecoration: 'none' }}>
                            <div className={'pkmBox '} onClick={() => this.pokeSelect(pkm.pokemonId)}>
                                <div className='highlight1' />
                                <div className='highlight2' />
                                <div className='spriteContainer'>
                                    <div className = 'spriteDiv'>
                                        <img src={require('./images/frontSprites/' + this.padNum(pkm.pokemonId) + '.png')} id={pkm.pokemonId} className='sprite' title={pkm.pokemonId} alt="pkm" />
                                    </div>
                                    <div className = 'shadow'/>
                                </div>
                                </div>
                            
                            <div className='nameContainer'>
                                <div className='pkmName'>{pkm.name}</div>
                            </div>
                            <div className='typeContainer'>
                                <div className='1Container'>
                                    <div className={'typeBox1 ' + pkm.type1} />
                                    <div className={'typeBox1H ' + pkm.type1} />
                                    <div className={'typeBox1S ' + pkm.type1} />
                                </div>
                                <div className='2Container'>
                                    <div className={'typeBox2 ' + this.typeColor(pkm)} />
                                    <div className={'typeBox2H ' + this.typeColor(pkm)} />
                                    <div className={'typeBox2S ' + this.typeColor(pkm)} />
                                </div>
                            </div>
                            <div className='numContainer'>
                                <div className='pkmNum'>{this.padNum(pkm.pokemonId)}</div>
                                </div>
                            </Link>
                            <div className='shadowContainer'>
                                <div className='boxShadow' />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}