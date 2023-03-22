import React from "react";
import "./hotels.css";
import banffimg from "./locationImg/loc1.jpg";
import torontoimg from "./locationImg/loc2.jpg";
import montrealimg from "./locationImg/loc3.jpg";
import quebecCityimg from "./locationImg/loc4.jpg";
import ottawaimg from "./locationImg/loc5.jpg";
import halifaximg from "./locationImg/loc6.jpg";
import edmontonimg from "./locationImg/loc7.jpg";
import saskatoonimg from "./locationImg/loc8.jpg";
import niagaraFallsimg from "./locationImg/loc9.jpg";
// const Hotels = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'Right',
//         alignItems: 'Right',
//         height: '100vh'
//       }}
//     >
//       <h1>Hotel? Trivago.</h1>
//     </div>
//   );
// };

function Hotels() {
  return (
    <>
      <h3 className="infoTitle">Our wonderful locations</h3>
      {/* <div className="about-us">
        <div className="row">
          <Team />
          <Mission />
          <Partners />
        </div>
        <div className="row">
          <History />
        </div>
      </div> */}

      <div className="locations">
        <div className="grid">
          <LocationCard
            imageSrc={torontoimg}
            imageAlt="Picture of Toronto"
            locationName="Toronto"
            locationDescription="A bustling and multicultural metropolis, famous for its iconic landmarks and thriving arts and culture scene."
          />
          <LocationCard
            imageSrc={montrealimg}
            imageAlt="Picture of Montreal"
            locationName="Montreal"
            locationDescription="A vibrant and culturally diverse city in Quebec, Canada,
            famous for its delicious cuisine, historical architecture, and
            lively festivals."
          />
          <LocationCard
            imageSrc={ottawaimg}
            imageAlt="Picture of Ottawa"
            locationName="Ottawa"
            locationDescription="A charming capital of Canada, renowned for its stunning
            government buildings, fascinating museums, and scenic
            waterways."
          />
          <LocationCard
            imageSrc={quebecCityimg}
            imageAlt="Picture of Quebec City"
            locationName="Quebec City"
            locationDescription="A historic city in Quebec, Canada, renowned for its enchanting
            old-world architecture, scenic waterfront, and delicious
            French cuisine."
          />

          <LocationCard
            imageSrc={halifaximg}
            imageAlt="Picture of Halifax"
            locationName="Halifax"
            locationDescription="A beautiful coastal province located in eastern Canada, known
            for its stunning natural landscapes and rich maritime history."
          />

          <LocationCard
            imageSrc={banffimg}
            imageAlt="Picture of Banff"
            locationName="Banff"
            locationDescription="A breathtaking town nestled in the Canadian Rockies, known for
            its world-class skiing, turquoise lakes, and stunning mountain
            vistas."
          />

          <LocationCard
            imageSrc={edmontonimg}
            imageAlt="Picture of Edmonton"
            locationName="Edmonton"
            locationDescription="A gorgeous capital city of Alberta, known for its beautiful river valley, vibrant arts and cultural scene, and long winter season."
          />

          <LocationCard
            imageSrc={saskatoonimg}
            imageAlt="Picture of Saskatoon"
            locationName="Saskatoon"
            locationDescription="A vibrant city located in the heart of Saskatchewan known for its beautiful river valley, rich cultural heritage, and friendly people."
          />
          <LocationCard
            imageSrc={niagaraFallsimg}
            imageAlt="Picture of Niagara Falls"
            locationName="Niagara Falls"
            locationDescription="A stunning city located in Ontario, Canada, known for its breathtaking waterfalls, vibrant tourist attractions, and scenic views."
          />
        </div>
      </div>
    </>
  );
}

function LocationCard(props) {
  return (
    <div className="grid-item">
      <div className="card2">
        <img className="card-img" src={props.imageSrc} alt={props.imageAlt} />
        <div className="card-content">
          <h1 className="card-header">{props.locationName}</h1>
          <p className="card-text">{props.locationDescription}</p>
        </div>
      </div>
    </div>
  );
}
export default Hotels;
