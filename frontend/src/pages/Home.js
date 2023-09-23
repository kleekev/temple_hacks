import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const center = { lat: 39.9812, lng: -75.1554}

const Home = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAeQK_Orc1AQrrXae_AfHLYYXUfBLvGQjI'
    })
    if (!isLoaded) {
        return (
            <h1>
                Not Loaded
            </h1>
        )
    }
    const handleClick = () => {
        window.location.replace('http://localhost:3000/signup');
      }
    return (
        // <img
        // src='https://maps.googleapis.com/maps/api/staticmap?center=Philadelphia,PA&zoom=14&size=400x400&key=AIzaSyAeQK_Orc1AQrrXae_AfHLYYXUfBLvGQjI'
        // />
            <>
                <GoogleMap 
                center={center} 
                zoom={17} 
                mapContainerStyle={{width: '100%', height: '100%', zIndex: '2', position:'relative'}}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullestScreenControl: false
                }}
                >
                <Marker position={center}/>
                <div className='z-1 w-[50%] bg-gray-300 absolute inset-x-[25%] top-[25%] h-[24rem] rounded-2xl p-10 text-[2rem] text-center font-bold font-serif'>
                    <p className='mb-3'>Do you want to save the Earth? Then...</p>
                    <p>Drive for Change: Carpooling Today for a Greener Tomorrow!</p>
                    <button onClick={handleClick} className='h-[25%] bg-green-400 w-[40%] mt-10 rounded-2xl'>Join Now!</button>
                </div>

                {/* <h1 className='fixed'>
                    Join Now!
                </h1> */}
                </GoogleMap>     
            </>

    )
}
export default Home