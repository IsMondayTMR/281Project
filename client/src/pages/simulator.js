import React, {useEffect, useState,useContext}from 'react'
import {useHistory} from 'react-router-dom'
import {Context} from '../context/userContext'
import {db, carlarViz} from '../constant/constant'
import * as ROUTES from '../constant/constant'
import {Button} from 'react-bootstrap'
import {carsData, location, colorData, carIndex,colorIndex } from '../constant/Data'
import {FaArrowCircleRight, FaArrowCircleLeft} from 'react-icons/fa'
import styles from '../css/simulator.module.css'
import Pay from '../components/pay'

const imageStyle = {
    height : "200px", 
    width : "300px", 
    objectFit : 'cover',
    borderRadius : "5px" 
}
const title = {
    fontSize : "1.1rem",
    fontWeight : "bold",
    marginBottom : "0.5rem",
    marginTop : "0.5rem"
}
const locationSelector = {
    width: "320px", 
    height : "40px", 
    borderRadius : "6px", 
    border : "2px solid grey", 
    fontSize : "0.9rem", 
    outline : "none",
    margin : "0 auto"
}
function Simulator() {
    const [model, setModel] = useState(0)
    const modelCounts = carsData.length

    const [color, setColor] = useState(0)
    const colorCounts = colorData.length

    const [start, setStart] = useState(location[0])
    const [end, setEnd] = useState(location[0])
    
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [amount, setAmount] = useState()
    const [duration, setDuration] = useState()

    const [paymentShow, setPaymentShow] = useState(false);
    const [cards, setCards] = useState([])
    const {user} = useContext(Context)
    const history = useHistory()
    
    const handleClose = () => setPaymentShow(false)
    
    useEffect(() => {
        getCards()
    },[])

    async function getCards() {
        try{
            let token = user

            let res = await fetch(`${db}card`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token" : token
                }
            })
      
            let result = await res.json()
            let cardsResult = result.cards
            if (cardsResult.length === 0) {
                alert("please add an card to use this service")
                history.push(ROUTES.YOURPAYMENTS)
            } else {
                setCards(result.cards)
            }

        }catch(e){
            console.log(JSON.parse(JSON.stringify(e)));
        }
    }

    async function startTrip() {
        const carModel = carIndex[model]
        const carColor = colorIndex[color]
        const departure = start
        const destination = end
        window.open(`${carlarViz}`)
        
        try{
            let token = user

            let res = await fetch(`${db}start?model=${carModel}&color=${carColor}&departure=${departure}&destination=${destination}`, {
                method : "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token" : token
                },
                body: JSON.stringify({
                    model : carModel,
                    color : carColor,
                    departure : departure,
                    destination : destination
                })
            })
            
            let result = await res.json()
            setPaymentShow(true);
            console.log(result)
            setStartTime(result.start_time)
            setEndTime(result.end_time)
            setAmount(result.payment)
            setDuration(result.duration)
        }catch(e){
            console.log(JSON.parse(JSON.stringify(e)));
        }
    }

    const nextCar = () => {

        setModel(model === modelCounts - 1 ? 0 : model + 1)
    }

    const prevCar = () => {

        setModel(model === 0 ? modelCounts - 1 : model - 1)
    }

    const nextColor = () => {

        setColor(color === colorCounts - 1 ? 0 : color + 1)
    }

    const prevColor = () => {

        setColor(color === 0 ? colorCounts - 1 : color - 1)
    }
    const imageContainer = carsData.map((car, index) => {

        return  (
            <div className = {index === model ? styles.active : styles.slide} key = {index}>
                {index === model && (<img  style = {imageStyle} src = {car.image} />)}
            </div>
            )
        })
    const colorContainer = colorData.map((c, index) => {
        const current = c.color
        const selectedColor = `rgb(${current})`
        return  (
            <div className = {index === color ? styles.active : styles.slide} key = {index}>
                {index === color && (
                <div  style = {{height : "200px", 
                                width : "300px", 
                                objectFit : 'cover',
                                borderRadius : "5px",
                                backgroundColor : selectedColor}}>
                </div>)}
            </div>
            )
    })

    const startLocations = location.map((location, index) => {
        return <option value = {location} key = {index}> {location} </option>
    })
    const endLocations = location.map((location, index) => {
        return <option value = {location} key = {index}> {location} </option>
    })

    
    return (

        <div style = {{display : "flex", flexDirection : "column", width : "600px", margin : "1rem auto",  alignItems:"center"}}>
            <section>
                <div style = {title}>
                    Select Your Car
                </div>
                <div style = {{margin : "30px", display : "flex", alignItems: "center"}}>   
                    <FaArrowCircleLeft className = {styles.leftArrow} onClick = {prevCar}/>
                    {imageContainer}
                    <FaArrowCircleRight className = {styles.rightArrow} onClick = {nextCar}/>
                </div>
            </section>

            <section>
                <div style = {title}>
                    Select color
                </div>
                <div style = {{margin : "30px", display : "flex", alignItems: "center"}}>   
                    <FaArrowCircleLeft className = {styles.leftArrow} onClick = {prevColor}/>
                    {colorContainer}
                    <FaArrowCircleRight className = {styles.rightArrow} onClick = {nextColor}/>
                </div>
            </section>
            <section >
                <div style = {{ width : "500px"}}>
                    <div style = {{ display : "flex", flexDirection : "column"}}>
                        <label htmlFor="startLocation" style = {title}>Start Locations</label>
                        <select
                            style = {locationSelector}
                            name="startLocation"
                            id="startLocation"
                            value= {start}
                            onChange={(event) => setStart(event.target.value)}>
                            {startLocations}
                        </select>
                    </div>
                    <div style = {{ display : "flex", flexDirection : "column"}}>
                        <label htmlFor="startLocation" style = {title}>Destination</label>
                        <select
                            style = {locationSelector}
                            name="startLocation"
                            id ="startLocation"
                            value = {end}
                     
                            onChange = {(event) => setEnd(event.target.value)}>
                            {endLocations}
                        </select>
                    </div>
                </div>
            </section>
            
            <div style = {{margin : "30px"}}>
                <Button onClick = {startTrip}>
                    Start
                </Button>
            </div>
            <Pay show = {paymentShow} 
                 handleClose = {handleClose} 
                 cards = {cards} 
                 startTime = {startTime} 
                 endTime = {endTime} 
                 amount = {amount} 
                 duration = {duration} 
                 departure = {start} 
                 destination = {end}
                 model = {carIndex[model]}
                 color = {colorIndex[color]}/>
        </div>
    )
}

export default Simulator