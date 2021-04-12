import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import priceCard from "../css/priceCard.module.css"
import styles from "../css/price.module.css"
const priceContainer = {
    height : '100%',
    backgroundImage : 'url("../img//backimag.jpg")',
    display : 'flex',
    color: "#FFF",
    fontSize: "80%",
    fontFamily: "'Roboto', Arial, Helvetica, Sans-serif, Verdana",
}

const cardContainer = {
    width : "1300px",
    margin : "0 auto",
    paddingTop: "5%",
    
}




function Price() {
    

    return (
        <>
        <div className = {styles.container}>

        </div>
          <div style = {priceContainer}>
            <div style = {cardContainer}>
                <div className = {priceCard.pricingWrapper, priceCard.clearfix}>
                    
                    <div className = {priceCard.pricingTable}>
                        <h3 className={priceCard.pricingTitle}>Basico</h3>
                        <div className={priceCard.price}>$60<sup>/ mes</sup></div>
                        <ul className={priceCard.tableList}>
                            <li>10 GB <span>De almacenamiento</span></li>
                            <li>1 Dominio <span>incluido</span></li>
                            <li>25 GB <span>De transferencia mensual</span></li>
                            <li>Base de datos <span className={priceCard.unlimited}>ilimitadas</span></li>
                            <li>Cuentas de correo <span className={priceCard.unlimited}>ilimitadas</span></li>
                            <li>CPanel <span>incluido</span></li>
                        </ul>

                        <div className={priceCard.tableBuy}>
                            <p>$60<sup>/ mes</sup></p>
                            <a href="#" className={priceCard.pricingAction}>Comprar</a>
                        </div>
                    </div>

                    <div className = {priceCard.pricingTable}>
                        <h3 className = {priceCard.pricingTitle} >Premium</h3>
                        <div className = {priceCard.price} >$100<sup>/ mes</sup></div>
            
                        <ul className={priceCard.tableList} >
                            <li>35 GB <span>De almacenamiento</span></li>
                            <li>5 Dominios <span>incluidos</span></li>
                            <li>100 GB <span>De transferencia mensual</span></li>
                            <li>Base de datos <span className={priceCard.unlimited}>ilimitadas</span></li>
                            <li>Cuentas de correo <span className={priceCard.unlimited}>ilimitadas</span></li>
                            <li>CPanel <span>incluido</span></li>
                        </ul>
                
                        <div className={priceCard.tableBuy}>
                            <p>$100<sup>/ mes</sup></p>
                            <a href="#" className={priceCard.pricingAction}>Comprar</a>
                        </div>
                    </div>

                    <div className = {priceCard.pricingTable}>
                        <h3 className = {priceCard.pricingTitle}>Ultimate</h3>
                        <div className = {priceCard.price}>$200<sup>/ mes</sup></div>

                        <ul className = {priceCard.tableList}>
                            <li>100 GB <span>De almacenamiento</span></li>
                            <li>8 Dominios <span>incluidos</span></li>
                            <li>200 GB <span>De transferencia mensual</span></li>
                            <li>Base de datos <span className={priceCard.unlimited}>ilimitadas</span></li>
                            <li>Cuentas de correo <span className={priceCard.unlimited}>ilimitadas</span></li>
                            <li>CPanel <span>incluido</span></li>
                        </ul>
                    
                        <div className={priceCard.tableBuy}>
                            <p>$200<sup>/ mes</sup></p>
                            <a href="#" className={priceCard.pricingAction}>Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      
        
    )
}

export default Price