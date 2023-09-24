import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle
} from '@react-google-maps/api'

import Places from './Places';
import Distance from './Distance';
import Origin from './Origin';
import RequestList from './RequestList';

const google = window.google;

const CarPoolMap = () => {
  const [dst, setDst] = useState();
  const [hitDst , setHitDist] = useState(false)
  const [directions, setDirections] = useState([])
  const [originDirections, setOriginDirections] = useState()
  const [carpoolRequests, setCarpoolRequest] = useState([]);
  const [origin, setOrigin] = useState({ lat: 39.9812, lng: -75.1554 })
  const mapRef = useRef()
  const options = useMemo(() => ({
    clickableIcons: false
  }), [])
  const onLoad = useCallback((map) => (mapRef.current = map), [])

  const requests = useMemo(() => {
    if (dst) return generateRequest(dst)
  }, [dst])

  const setPostion = (position) => {
    setDst(position)
    mapRef.current.panTo(position)
  }

  const fetchDirections = (origin, request) => {
    if (!request || !origin) {
      return
    }
    if (directions.length > 5) {
      return
    }

    console.log({origin, request});

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: origin,
        destination: request,
        travelMode: google.maps.TravelMode.DRIVING 
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections([...directions, result])
          setCarpoolRequest([...carpoolRequests, result.routes[0].legs[0].end_address])
          console.log(directions);
        }
      }
    )
  }

  return (
    <div className='flex h-full'>
      <div className='w-[20%] p-4 bg-gray-800 text-blue-500'>
        <h1 className='text-[2rem] text-center'>Create a Pool!</h1>
        <Origin setOrigin={setOrigin}/>
        <Places setPosition={setPostion}/>
        {!dst && <p>Enter your destination</p>}
        {directions.length !== 0 && <Distance legs={directions}/>}
        {carpoolRequests.length !== 0 && <RequestList list={carpoolRequests} setList={setCarpoolRequest}/>}
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
              <Marker position={dst} icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                onClick={() =>  {
                  fetchDirections(origin, dst)
                  setHitDist(true)
              }}/>
              <Marker position={origin} />
              {originDirections && <DirectionsRenderer directions={originDirections}/>}
              {directions.length !== 0 && directions.map((direction) => <DirectionsRenderer directions={direction} />)}

              {requests.map(request => <Marker key={request.lat} position={request} onClick={() => {
                if (!hitDst) {
                  fetchDirections(origin,request)
                  setOrigin(request)
                }
              }}/>)}
              <Circle center={dst} radius={1500} options={closeOptions}/>
              <Circle center={dst} radius={2500} options={middleOptions}/>
              <Circle center={dst} radius={3500} options={farOptions}/>
            </>
            )}
        </GoogleMap>
      </div>
    </div>
  )
}

const generateRequest = (position) => {
  const requests = []
  for (let i = 0; i < 10; i++) {
    const direction = Math.random() < 0.5 ? -3000 : 3000
    requests.push({
      lat: position.lat - position.lat * Math.random() / direction,
      lng: position.lng + position.lng * Math.random() / direction,
    })
  }
  return requests
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A'
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D'
}
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252'
}

export default CarPoolMap
