import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import LoadingContainer from '../containers/loadingContainer'
import { Context } from '../context/userContext'
import { db } from '../constant/constant'
import {useParams} from 'react-router-dom'
function Data() {

    const { user } = useContext(Context)
    const [data, setData] = useState()
    const {id} = useParams()
    console.log(id)
    useEffect(() => {
        getData()
        
    },[])
    async function getData() {
        try {
            // http://localhost:5000/sensordata/2
            let res = await fetch(`${db}sensordata/${id}`,{

                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token": user
                }
        })

        let result = await res.json()
            console.log(result)
            if (result && result.sensor_data_list) {
                setData(result.sensor_data_list)
            }
        }catch (e) {
            console.log(e);
        }
    }
    console.log(data)

    function dataCard(cardInfor,index) {

        const location = cardInfor.location.substr(1,cardInfor.location.length - 2).split(",")
        console.log(location)
        const newString = location.map((l) => {
                return l.substr(0,6)
        })
        
        const newLocation = newString.join(',')
        console.log(newLocation)
        return (
            <div style = {{width : "400px", height : "200px",
                           border : "1px solid #f2f2f2", backgroundColor : "#f5f5f5", padding : "30px",
                           boxShadow:"5px 10px 20px #e3e3e3", margin : "1.5rem", borderRadius : "10px"}}>

                <div style = {{display : "flex"}}>
                    <div style = {{marginRight : "0.5rem"}}>
                    Car ID :
                        </div>
                    <div>
                    {cardInfor.v_id}
                        </div>
                </div>

                <div style = {{display : "flex"}}>
                    <div style = {{marginRight : "0.5rem"}}>
                    Color :
                        </div>
                    <div>
                    {cardInfor.lane.color}
                        </div>
                </div>



                <div style = {{display : "flex"}}>
                    <div style = {{marginRight : "0.5rem"}}>
                    Lane Change :
                        </div>
                    <div>
                    {cardInfor.lane.lane_change}
                        </div>
                </div>

                <div style = {{display : "flex"}}>
                    <div style = {{marginRight : "0.5rem"}}>
                    Location:
                        </div>
                    <div>
                    {newLocation}
                        </div>
                </div>

                <div style = {{display : "flex"}}>
                    <div style = {{marginRight : "0.5rem"}}>
                    Time Stamp:
                        </div>
                    <div>
                    {cardInfor.timestamp.toString().substr(0, 6)}
                        </div>
                </div>
            </div>)
    }

    
    if (data) {
        const cards = data.map((card, index) => {
            return dataCard(card, index)
        })
        
        return(
            <div style = {{display : "grid", gridTemplateColumns : "repeat(4, minmax(500px,250px))"}}>
            {cards}
            </div>
        )
    } else {
        console.log("null")
        return(
            <LoadingContainer/>
        )
    }
    
   
}


export default Data