import React from 'react'
import{ Container, LoadingImage,Text} from './styles/style'

function LoadingForm({children, ...restProp}){
    return <Container {...restProp}>
        {children}
    </Container>
}

export default LoadingForm

LoadingForm.Image = function LoadingImg({src,to, children, ...restProp}){
    return <LoadingImage src={src} to ={to} {...restProp}>
        {children}
    </LoadingImage>
}

LoadingForm.Text = function LoadingText({children, ...restProp}){
    return <Text {...restProp}>
        {children}
    </Text>
}