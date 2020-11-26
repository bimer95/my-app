import React from 'react';
import preloader from '../../../assets/images/preloader.svg'; 


let Preloader =(props) =>{
    return <div style={ {beckgroundColor: 'white'} }>
        <img src={preloader} />
        </div> 
}

export default Preloader;