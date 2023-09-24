import { useLoadScript } from '@react-google-maps/api' 

import CarPoolMap from '../components/CarPoolMap'

const CreateCarPoolRequest = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAeQK_Orc1AQrrXae_AfHLYYXUfBLvGQjI',
        libraries: ['places']
    });
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <CarPoolMap/>
    )
}

export default CreateCarPoolRequest