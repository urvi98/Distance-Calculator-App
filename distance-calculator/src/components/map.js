import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, Tooltip } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { addPoint } from '../redux/action';
import { resetPoints } from '../redux/action';
import { getDistance } from 'geolib';
import './map.css';
import L from 'leaflet';

const myIcon = L.icon({
  iconUrl: 'https://icon-library.com/images/pin-icon-png/pin-icon-png-16.jpg',
  iconSize: [25, 30],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41]
});

function AddPointMarker() {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      dispatch(addPoint(e.latlng)); // Dispatch the action to Redux store
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>
        A new point
      </Popup>
    </Marker>
  );
}

function Map() {
  const initialPosition = [12.916540, 77.651947];
  const points = useSelector(state => state.points);
  const dispatch = useDispatch();

  const totalDistance = points.reduce((total, point, index) => {
    if (index === 0) {
      return total;
    }

    const previousPoint = points[index - 1];
    const distance = getDistance(
      { latitude: previousPoint.lat, longitude: previousPoint.lng },
      { latitude: point.lat, longitude: point.lng }
    );

    return total + distance;
  }, 0);

  const handleReset = () => {
    dispatch(resetPoints());
  };

  return (
    <div style={{ height: "80vh", width: "80%" }}>
      <MapContainer center={initialPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddPointMarker />
        {points.map((position, idx) => (
          <Marker key={idx} position={position} icon={myIcon}>
            <Popup>
              A new point
            </Popup>
          </Marker>
        ))}
        {points.map((position, idx, array) => {
          if (idx === 0) {
            return null;
          }

          const previousPosition = array[idx - 1];
          const distance = getDistance(
            { latitude: previousPosition.lat, longitude: previousPosition.lng },
            { latitude: position.lat, longitude: position.lng }
          );

          return (
            <Polyline key={idx} positions={[previousPosition, position]} color='red'>
              <Tooltip permanent>
                {`${distance} meters`}
              </Tooltip>
            </Polyline>
          );
        })}
      </MapContainer>
      <div>Total distance: {totalDistance} meters</div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Map;