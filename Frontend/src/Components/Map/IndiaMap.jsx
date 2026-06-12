import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import indiaTopoJson from "../../data/indiaStates.json";
import { feature } from "topojson-client";

// 🔥 Convert TopoJSON → GeoJSON
const geoJsonData = feature(
  indiaTopoJson,
  indiaTopoJson.objects.data
);

// 🎨 Party colors
const partyColors = {
  BJP: "#FF9933",
  INC: "#1877F2",
  AAP: "#80B91C",
  TMC: "#009E60",
  CPM: "#E81123",
  DMK: "#F24E1E",
  JDU: "#00A389",
  TDP: "#FFFF00",
  JMM: "#4CAF50",
  NPP: "#8E44AD",
  ZPM: "#2ECC71",
  NDPP: "#9B59B6",
  SKM: "#16A085",
  AINRC: "#E67E22",
  UT: "#777777",
};

// 🧠 State data
const statesData = {
  "Andaman and Nicobar": { party: "BJP", cm: "UT" },
  "Andhra Pradesh": { party: "TDP", cm: "Chandrababu Naidu" },
  "Arunachal Pradesh": { party: "BJP", cm: "Pema Khandu" },
  "Assam": { party: "BJP", cm: "Himanta Biswa Sarma" },
  "Bihar": { party: "JDU", cm: "Nitish Kumar" },
  "Chandigarh": { party: "BJP", cm: "UT" },
  "Chhattisgarh": { party: "BJP", cm: "Vishnu Deo Sai" },
  "Delhi": { party: "AAP", cm: "Arvind Kejriwal" },
  "Goa": { party: "BJP", cm: "Pramod Sawant" },
  "Gujarat": { party: "BJP", cm: "Bhupendra Patel" },
  "Haryana": { party: "BJP", cm: "Nayab Singh Saini" },
  "Himachal Pradesh": { party: "INC", cm: "Sukhvinder Singh Sukhu" },
  "Jammu and Kashmir": { party: "UT", cm: "LG Rule" },
  "Jharkhand": { party: "JMM", cm: "Hemant Soren" },
  "Karnataka": { party: "INC", cm: "Siddaramaiah" },
  "Kerala": { party: "CPM", cm: "Pinarayi Vijayan" },
  "Ladakh": { party: "UT", cm: "LG Rule" },
  "Madhya Pradesh": { party: "BJP", cm: "Mohan Yadav" },
  "Maharashtra": { party: "BJP", cm: "Devendra Fadnavis" },
  "Manipur": { party: "BJP", cm: "N. Biren Singh" },
  "Meghalaya": { party: "NPP", cm: "Conrad Sangma" },
  "Mizoram": { party: "ZPM", cm: "Lalduhoma" },
  "Nagaland": { party: "NDPP", cm: "Neiphiu Rio" },
  "Odisha": { party: "BJP", cm: "Mohan Charan Majhi" },
  "Puducherry": { party: "AINRC", cm: "N. Rangaswamy" },
  "Punjab": { party: "AAP", cm: "Bhagwant Mann" },
  "Rajasthan": { party: "BJP", cm: "Bhajan Lal Sharma" },
  "Sikkim": { party: "SKM", cm: "Prem Singh Tamang" },
  "Tamil Nadu": { party: "DMK", cm: "M. K. Stalin" },
  "Telangana": { party: "INC", cm: "Revanth Reddy" },
  "Tripura": { party: "BJP", cm: "Manik Saha" },
  "Uttar Pradesh": { party: "BJP", cm: "Yogi Adityanath" },
  "Uttarakhand": { party: "BJP", cm: "Pushkar Singh Dhami" },
  "West Bengal": { party: "TMC", cm: "Mamata Banerjee" },
};

// 🎨 Style
const getStyle = (feature) => {
  const stateName = feature.properties.NAME_1; // 🔥 FIX
  const party = statesData[stateName]?.party;
  const color = partyColors[party] || "#555";

  return {
    fillColor: color,
    weight: 0.8,
    color: "#ffffff",
    fillOpacity: 0.8,
  };
};

// 🧠 Popup
const onEachState = (feature, layer) => {
  const stateName = feature.properties.NAME_1; // 🔥 FIX
  const data = statesData[stateName];

  if (data) {
    layer.bindPopup(`
      <b>${stateName}</b><br/>
      Party: ${data.party}<br/>
      CM: ${data.cm}
    `);
  } else {
    layer.bindPopup(`<b>${stateName}</b><br/>No data`);
  }
};

export default function IndiaMap() {
  return (
    <div style={{ height: "calc(100vh - 80px)" }}>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* ✅ FIXED */}
        <GeoJSON
          data={geoJsonData}
          style={getStyle}
          onEachFeature={onEachState}
        />
      </MapContainer>
    </div>
  );
}