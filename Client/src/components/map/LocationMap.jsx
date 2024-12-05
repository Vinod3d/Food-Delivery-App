import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Import Leaflet styles
import 'leaflet/dist/leaflet.css';
import styles from './LocationMap.module.css';
import { Link } from 'react-router-dom';

 const LocationMap = () => {
  // McDonald's South London location coordinates
  const position = [51.50282007234024, -0.11128093496826619];
  const locationInfo = {
    name: "McDonald",
    location: "South London",
    address: "Tooley St, London Bridge, London SE1 2TF, United Kingdom",
    phone: "+93443-43",
    website: "http://mcdonalds.uk",
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.infoCard}>
        <h2>{locationInfo.name}</h2>
        <p className={styles.location}>{locationInfo.location}</p>
        <p className={styles.address}>{locationInfo.address}</p>
        <p className={styles.phone}>
          <strong className={styles.phoneNum}>Phone number</strong> {locationInfo.phone}
        </p>
        <p className={styles.weblink}>
          <strong>Website</strong>:{" "}
          <Link href={locationInfo.website} target="_blank" rel="noreferrer">
            {locationInfo.website}
          </Link>
        </p>
      </div>

      <div className={styles.map}>
        <MapContainer center={position} zoom={18} style={{ height: '400px', width: '100%' }} zoomControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // default marker icon
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}>
            <Popup>
              <strong>{locationInfo.name}</strong><br />
              {locationInfo.location}<br />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};


export default LocationMap;