import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  const [location, setLocation] = useState([0, 0]); // Khởi tạo vị trí ban đầu là (0, 0)

  const handleClick = (e) => {
    setLocation([e.latlng.lat, e.latlng.lng]); // Lưu lại vị trí người dùng click vào
  };

  return (
    <MapContainer center={location} zoom={13} onClick={handleClick}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={location}>
        <Popup>Vị trí của bạn</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;














// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import axios from 'axios';

// function Map() {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     // Gọi API để lấy thông tin về vị trí của người dùng
//     axios.get('http://localhost:8000/v1/user/63f1a32f73dfe948ddaa3a53/location?latitude=10.1234123215&longitude=106.6789')
//       .then(response => {
//         setUserLocation(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <MapContainer center={userLocation} zoom={13} style={{ height: '500px' }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {userLocation && (
//         <Marker position={userLocation}>
//           <Popup>Vị trí của bạn</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// }

// export default Map;
