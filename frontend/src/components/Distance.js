import { useEffect, useState } from "react";

const Distance = (props) => {
    if (!props.legs) {
        return null;
    }
    
    return (
        <div key={props.legs.length}>
            {'Approximately ' + convertSecs(props.legs.reduce((partialSum, direction) => partialSum + direction.routes[0].legs[0].duration.value, 0))}
        </div>
    )
}

const convertSecs = (secs) => {
    let hours = Math.floor(secs / 3600)
    let minutes = Math.floor((secs - hours * 3600) / 60)
    if (hours === 0) {
        return minutes + ' minutes'
    }
    return hours + ' hours ' + minutes + ' minutes'
}
export default Distance