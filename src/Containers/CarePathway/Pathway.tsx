import PathwayDiagram from "Containers/FlowDiagram/PathwayDiagram";
// import Controls from "Containers/BreadCrumbNavigation/Controls";
import Controls from "Containers/TabNavigation/Controls";
import Carousel from "react-material-ui-carousel";

import { useAppSelector } from "Store/appStore";
import { selectPathwayAgeRange, selectPathwayActiveChapter } from "Store/slices/carePathway";

const riskAsessStyle = {
  background: "linear-gradient(70deg, #66CCE7 1%, #434FA1 99% )",
};
const clinicalAssessStyle = {
  background: "linear-gradient(70deg, #66CCE7 1%, #91edab 99% )",
};
const dcisStyle = {
  background: "linear-gradient(70deg, #91edab 1%, #f3f5a6 99% )",
};
const breastCancerStyle = {
  background: "linear-gradient(70deg, #f3f5a6 1%, #c8a6f5 99% )",
};
const pregCancerStyle = {
  background: "linear-gradient(70deg, #f3f5a6 1%, #c8a6f5 99% )",
};

export default function Pathway() {
  const activeChapter = useAppSelector(selectPathwayActiveChapter);
  const ageRange = useAppSelector(selectPathwayAgeRange);

  const ageSelector = (
    <div style={{ height: "calc(100vh - 42px)", width: "100vw", margin: "auto" }}>
      <div style={{ margin: "auto", width: "50%", textAlign: "center", paddingTop: "45vh" }}>Please select age</div>
    </div>
  );

  return (
    <div>
      <Controls />
      <Carousel index={activeChapter} autoPlay={false} animation="slide" navButtonsAlwaysInvisible={true} swipe={false}>
        <div style={riskAsessStyle}>
          <PathwayDiagram
            // data={props.pathwayData}
            data={require("./pathway1.json")}
            dataKey="data_elements"
          />
        </div>

        <div style={clinicalAssessStyle}>
          <PathwayDiagram
            // data={props.pathwayData}
            data={require("./pathway2.json")}
            dataKey="data_elements"
          />
        </div>

        <div style={dcisStyle}>
          <PathwayDiagram
            // data={props.pathwayData}
            data={require("./pathway3.json")}
            dataKey="data_elements"
          />
        </div>

        <div style={breastCancerStyle}>
          {ageRange ? (
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway4.json")}
              dataKey="data_elements"
              transform={{ x: 100, y: 250, zoom: 1 }}
            />
          ) : (
            ageSelector
          )}
        </div>

        <div style={breastCancerStyle}>
          {ageRange ? (
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway5.json")}
              dataKey="data_elements"
              transform={{ x: 100, y: 250, zoom: 1 }}
            />
          ) : (
            ageSelector
          )}
        </div>

        <div style={breastCancerStyle}>
          {ageRange ? (
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway6.json")}
              dataKey="data_elements"
              transform={{ x: 100, y: 250, zoom: 1 }}
            />
          ) : (
            ageSelector
          )}
        </div>

        <div style={pregCancerStyle}>
          <PathwayDiagram
            // data={props.pathwayData}
            data={require("./pathway7.json")}
            dataKey="data_elements"
          />
        </div>
      </Carousel>
    </div>
  );
}
