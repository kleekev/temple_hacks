import { useLoadScript } from '@react-google-maps/api' 

import RequestMap from '../components/RequestMap';

const CreateRequest = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAeQK_Orc1AQrrXae_AfHLYYXUfBLvGQjI',
        libraries: ['places']
    });
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <RequestMap/>
    )
}

export default CreateRequest