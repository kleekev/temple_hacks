
const Distance = (props) => {
    if (!props.legs) {
        return null;
    }
    
    return (
        <div key={props.legs.length} className="text-center">
            <p>{'Approximately ' + convertSecs(props.legs.reduce((partialSum, direction) => partialSum + direction.routes[0].legs[0].duration.value, 0)) + ' to your destination'}</p>
            <p>{convertC02(props.legs.reduce((partialSum, direction) => partialSum + direction.routes[0].legs[0].distance.value, 0))}</p>
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

const convertC02 = (m) => {
    const kmToCO2Grams = 192
    const km = m / 1000
    const grams = km*kmToCO2Grams
    const kg = Math.floor(grams / 1000)
    if (kg > 0) {
        return 'Helped Reduced ' + kg + "kg of C02!"  
    }
    return 'Helped Reduced ' + Math.floor(grams) + "g of C02!"
}
export default Distance