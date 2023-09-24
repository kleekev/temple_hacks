import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'

import Places from './Places';
import Origin from './Origin';

const google = window.google;

const RequestMap = () => {
  const username = localStorage.getItem('username') !== null ? localStorage.getItem('username'): null;
  const [dst, setDst] = useState();
  const [directions, setDirections] = useState()
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [error, setError] = useState()
  const [accepted, setAccepted] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [origin, setOrigin] = useState({ lat: 39.9812, lng: -75.1554 })
  const mapRef = useRef()
  const options = useMemo(() => ({
    clickableIcons: false
  }), [])
  const onLoad = useCallback((map) => (mapRef.current = map), [])

  const setPostion = (position) => {
    setDst(position)
    mapRef.current.panTo(position)
  }

  const fetchDirections = () => {
    if (!dst) {
      return
    }

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        destination: dst,
        travelMode: google.maps.TravelMode.DRIVING 
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result)
        }
      }
    )
  }

  const handleOnClick = async () => {
    const response = await fetch('http://127.0.0.1:8000/request/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, start_address: startAddress, end_address: endAddress, accepted: false})
    });
    const json = await response.json();

    if (!response.ok) {
        setError(json.error);
    }
    setButtonClicked(true)
  }
  useEffect(() => {
    const interval = setInterval(async () => {
      if (buttonClicked) {
        const response = await fetch('http://127.0.0.1:8000/request/get?username=' + username)
        const json = await response.json();
        if (response.ok) {
            setAccepted(json.accepted)
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (dst) {
        fetchDirections()
    }
  }, [dst])

  return (
    <div className='flex h-full'>
      <div className='w-[20%] p-4 bg-gray-800 text-blue-500'>
        <h1 className='text-[2rem] text-center'>Request</h1>
        <Origin setOrigin={setOrigin} setStartAddress={setStartAddress}/>
        <Places setPosition={setPostion} setEndAddress={setEndAddress} />
        {!dst && <p>Enter your destination</p>}
        {dst && <button onClick={handleOnClick}>Submit Request</button>}
      </div>
      <div className='w-[80%] h-full'>
        <GoogleMap
          zoom={12}
          center={origin}
          mapContainerClassName='w-full h-full'
          options={options}
          onLoad={onLoad}
        >
            {dst && (
            <>
              <Marker position={dst} icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'/>
              <Marker position={origin} />
              {directions && <DirectionsRenderer directions={directions} />}
            </>
            )}
        </GoogleMap>
      </div>
    </div>
  )
}

export default RequestMap
