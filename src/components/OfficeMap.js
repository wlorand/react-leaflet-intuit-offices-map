import React, { useState } from "react";

// libs
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// mock-data
import * as officeData from "../mock-data/intuit_offices_geo.json";

// styles -- scoped to the component ++ leaflet styles from /node_modules
import "leaflet/dist/leaflet.css";
import "../styles/leaflet-map.css";

function OfficeMap() {
  // define map vars
  // world center [22.6767777, -3.9824581]; // in Mali -- world center for rendering at global scale (zoom=3)
  const center = [41.8658953, -99.3766461]; // north-american center
  const initialZoom = 4;
  const tileUrl = "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png";
  const tileAttr =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>';
  const intuitIcon = new Icon({
    iconUrl: "/assets/images/intuit_favicon.png",
    iconSize: [20, 20],
  });

  // hold activeOffice in state
  const [activeOffice, setActiveOffice] = useState(officeData.features[2]);

  // render map
  return (
    <div className="leaflet-container">
      <MapContainer center={center} zoom={initialZoom} scrollWheelZoom={false}>
        <TileLayer url={tileUrl} attribution={tileAttr} />
        {officeData.features.map((office) => (
          <Marker
            position={[
              office.geometry.coordinates[1], // long
              office.geometry.coordinates[0], // lat
            ]}
            key={office.properties.officeId}
            icon={intuitIcon}
            eventHandlers={{
              click: () => {
                setActiveOffice(office);
              },
            }}
          />
        ))}
        {activeOffice && (
          <Popup
            position={[
              activeOffice.geometry.coordinates[1], // long
              activeOffice.geometry.coordinates[0],
            ]}
            onClose={() => {
              setActiveOffice(null);
            }}
          >
            <div>
              <h3 className="popup">{activeOffice.properties.officeName}</h3>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

export default OfficeMap;
