import React from 'react'
import loadingGif from '../img/gif/loading-arrow.gif';
import {LoadingForm} from '../components/export'
function LoadingContainer(){
    return (
       
        <LoadingForm>
             <LoadingForm.Text>Loading...</LoadingForm.Text>
             <LoadingForm.Image src={loadingGif} alt="" />
        </LoadingForm>
    )
}
export default LoadingContainer