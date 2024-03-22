import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1200px',
  height: '350px'
};

const center = {
  lat: 37.5649867,
  lng: 126.985575
};

const OPTIONS = {
  minZoom: 4,
  maxZoom: 18,
}

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAV8ip98dYnEu24LXBH5p6pImVH7mh9N90",
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={OPTIONS}
    >
      <Marker position={center}></Marker>
    </GoogleMap>
  ) : <></>
}

export default React.memo(Map)