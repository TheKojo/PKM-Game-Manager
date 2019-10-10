import React, { Component } from 'react';
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
    }

    componentDidMount() {
        fetch('api/Home/Index')
            .then(response => response.json())
            .then(data => this.setState({
                pkmList: data, isLoading: false
            }));
        document.body.style.backgroundColor = "#d1ebe7";

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

    render() {
        return (
            <div className ='galleryBody'>
                <link href='https://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' />
                <div>
                    <img src={logo} className='logo'/>

                    {this.state.pkmList.map(pkm => (
                        <div key={pkm.pokemonId} >
                            <div className={'pkmBox ' + pkm.type1}>
                                <div className='test'>
                                <div className = 'spriteDiv'>
                                    <img src={require('./images/frontSprites/' + this.padNum(pkm.pokemonId) + '.png')} id={pkm.pokemonId} className='sprite' title={pkm.pokemonId} alt="pkm" />
                                    </div>
                                </div>
                                <div className = 'pkmName'>{pkm.name}</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}