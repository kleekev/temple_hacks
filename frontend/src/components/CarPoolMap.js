import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle
} from '@react-google-maps/api'
import {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'

import Places from './Places';
import Distance from './Distance';
import Origin from './Origin';
import RequestList from './RequestList';

const google = window.google;

const CarPoolMap = () => {
  const username = localStorage.getItem('username') !== null ? localStorage.getItem('username'): null;
  const [dst, setDst] = useState();
  const [hitDst , setHitDist] = useState(false)
  const [directions, setDirections] = useState([])
  const [originDirections, setOriginDirections] = useState()
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [requests, setRequest] = useState([])
  const [carpoolRequests, setCarpoolRequest] = useState([]);
  const [nearestReq, setNearestReq] = useState([])
  const [origin, setOrigin] = useState({ lat: 39.9812, lng: -75.1554 })
  const [usersPicking, setUsersPicking] = useState([])
  const [error, setError] = useState()
  const mapRef = useRef()
  const options = useMemo(() => ({
    clickableIcons: false
  }), [])
  const onLoad = useCallback((map) => (mapRef.current = map), [])

  useEffect(() => {
    const getAllRequests = async () => {
      const response = await fetch('http://127.0.0.1:8000/request/getAll')
      const json = await response.json()

      if (!json.ok) {
        setError(json.error)
      }
      const coordinates = []
      json.req_list.map(async (req) => {
        const result = await getGeocode({ address: req.start_address })
        let {lat, lng} = await getLatLng(result[0])
        coordinates.push({ id: req.id, lat, lng})
      })
      setRequest(coordinates)
      const endCoordinates = []
      json.req_list.map(async (req) => {
        const result = await getGeocode({ address: req.end_address })
        let {lat, lng} = await getLatLng(result[0])
        endCoordinates.push({ lat, lng})
      })
      setNearestReq(endCoordinates)
    }
    getAllRequests()
  }, [])

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
        }
      }
    )
  }

  const handlePool = () => {
    usersPicking.map(async (user) =>  {
      const response = await fetch('http://127.0.0.1:8000/request/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: user, accepted: true})
      });
      const json = await response.json();

      if (!response.ok) {
          setError(json.error);
      }
    })
    console.log(usersPicking);
  }

  return (
    <div className='flex h-full'>
      <div className='w-[20%] p-4 bg-gray-800 text-blue-500'>
        <h1 className='text-[2rem] text-center'>Create a Pool!</h1>
        <Origin setOrigin={setOrigin} setStartAddress={setStartAddress}/>
        <Places setPosition={setPostion} setEndAddress={setEndAddress}/>
        {!dst && <p>Enter your destination</p>}
        {directions.length !== 0 && <Distance legs={directions}/>}
        {carpoolRequests.length !== 0 && <RequestList list={carpoolRequests} setList={setCarpoolRequest}/>}
        {hitDst && <button onClick={handlePool}>Start Pool!</button>}
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

              {requests.filter((req) => Math.abs(req.lat - dst.lat) < 0.02555 && Math.abs(req.lng - dst.lng) < 0.02555).map(request => <Marker key={request.lat} position={{lat: request.lat, lng: request.lng}} onClick={() => {
                if (!hitDst) {
                  fetchDirections(origin,request)
                  setOrigin(request)
                  setUsersPicking([...usersPicking, request.id])
                }
              }}/>)}
              <Circle center={dst} radius={500} options={closeOptions}/>
              <Circle center={dst} radius={1500} options={middleOptions}/>
              <Circle center={dst} radius={2000} options={farOptions}/>
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
    const direction = Math.random() < 0.5 ? -1500 : 1500
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
