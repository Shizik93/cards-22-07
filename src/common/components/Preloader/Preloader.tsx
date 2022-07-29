import React from "react";
import style from './Preloader.module.css'

export const Preloader=()=>{
    return(
        <div className={style.box}>
            <span className={style.spinner}></span>
        </div>
    )
}