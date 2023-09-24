import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import { Combobox } from '@headlessui/react'

const Origin = (props) => {
    const { ready, value, setValue, suggestions: {status, data}, clearSuggestions } = usePlacesAutocomplete();    
    const handleSelect = async (val) => {
        setValue(val, false)
        clearSuggestions()

        const results = await getGeocode({ address: val })
        const {lat, lng} = await getLatLng(results[0])
        props.setOrigin({ lat, lng })
        props.setStartAddress(results[0].formatted_address)
    }

    return (
        <Combobox onChange={handleSelect}>
            <Combobox.Input className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0" value={value} onChange={e => setValue(e.target.value)} placeholder='Enter Origin'/>
            <Combobox.Options className="absolute max-h-60 w-[22rem] overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-1">
                {status === "OK" && 
                    data.map(({place_id, description}) => (
                        <Combobox.Option className="relative cursor-default select-none py-2 pl-10 pr-4" key={place_id} value={description}>
                            {description}    
                        </Combobox.Option>
                    ))} 
            </Combobox.Options>
        </Combobox>
    )
}

export default Origin