import React from "react";
import PathwayDiagram from "Containers/FlowDiagram/PathwayDiagram";
import CustomControls from "Containers/Navigation/Controls";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";

import { useAppDispatch, useAppSelector } from "Store/appStore";
import { selectPathwayAgeRange, selectPathwayActiveChapter, setPathwayChapter } from "Store/slices/carePathway";

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
  const carouselRef = React.useRef<CarouselRef>(null);

  const dispatch = useAppDispatch();
  const activeChapter = useAppSelector(selectPathwayActiveChapter);
  const ageRange = useAppSelector(selectPathwayAgeRange);

  const afterChapterChange = (current: number) => {
    dispatch(setPathwayChapter(current));
  };

  //TODO: Uncomment if data is fetched from API
  // React.useEffect(() => {
  //   APIUtility.API.makeAPICall(APIUtility.GET_DATA_CARE_PATHWAY);
  // }, []);

  React.useEffect(() => {
    carouselRef.current?.goTo(activeChapter);
  }, [activeChapter]);

  //TODO: Uncomment if data is fetched from API
  // if (props.pathwayData === undefined) {
  //   return <div />;
  // }

  const ageSelector = (
    <div style={{ height: "calc(100vh - 42px)", width: "100vw", margin: "auto" }}>
      <div style={{ margin: "auto", width: "50%", textAlign: "center", paddingTop: "45vh" }}>Please select age</div>
    </div>
  );

  return (
    <div>
      <CustomControls />

      <Carousel ref={carouselRef} dots={false} afterChange={afterChapterChange}>
        <div>
          <div style={riskAsessStyle}>
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway1.json")}
              dataKey="data_elements"
              // dataSetter={props.setPathwayData}
              // setChapterFunc={props.setActiveChapter}
            />
          </div>
        </div>
        <div>
          <div style={clinicalAssessStyle}>
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway2.json")}
              dataKey="data_elements"
              // dataSetter={props.setPathwayData}
              // setChapterFunc={props.setActiveChapter}
            />
          </div>
        </div>
        <div>
          <div style={dcisStyle}>
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway3.json")}
              dataKey="data_elements"
              // dataSetter={props.setPathwayData}
              // setChapterFunc={props.setActiveChapter}
            />
          </div>
        </div>
        <div>
          <div style={breastCancerStyle}>
            {ageRange ? (
              <PathwayDiagram
                // data={props.pathwayData}
                data={require("./pathway4.json")}
                dataKey="data_elements"
                // dataSetter={props.setPathwayData}
                // setChapterFunc={props.setActiveChapter}
                transform={{ x: 100, y: 250, zoom: 1 }}
              />
            ) : (
              ageSelector
            )}
          </div>
        </div>
        <div>
          <div style={breastCancerStyle}>
            {ageRange ? (
              <PathwayDiagram
                // data={props.pathwayData}
                data={require("./pathway5.json")}
                dataKey="data_elements"
                // dataSetter={props.setPathwayData}
                // setChapterFunc={props.setActiveChapter}
                transform={{ x: 100, y: 250, zoom: 1 }}
              />
            ) : (
              ageSelector
            )}
          </div>
        </div>
        <div>
          <div style={breastCancerStyle}>
            {ageRange ? (
              <PathwayDiagram
                // data={props.pathwayData}
                data={require("./pathway6.json")}
                dataKey="data_elements"
                // dataSetter={props.setPathwayData}
                // setChapterFunc={props.setActiveChapter}
                transform={{ x: 100, y: 250, zoom: 1 }}
              />
            ) : (
              ageSelector
            )}
          </div>
        </div>
        <div>
          <div style={pregCancerStyle}>
            <PathwayDiagram
              // data={props.pathwayData}
              data={require("./pathway7.json")}
              dataKey="data_elements"
              // dataSetter={props.setPathwayData}
              // setChapterFunc={props.setActiveChapter}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
