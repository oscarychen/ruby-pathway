import React, { Dispatch } from "react";
import PathwayDiagram from "./PathwayDiagram";
import CustomControls from "./Controls";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
// import * as APIUtility from "../../Util/api";
import * as actions from "Store/Actions/index";
import { connect, RootStateOrAny, ConnectedProps } from "react-redux";
import { AgeRange, CarePathwayActionTypes } from "Store/Actions/carePathway";
import { CarePathwayData } from "Store/Reducers/carePathway";

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

type PropsType = ConnectedProps<typeof connector>;

const Pathway = (props: PropsType) => {
  const carouselRef = React.useRef<CarouselRef>(null);

  const afterChapterChange = (current: number) => {
    props.setActiveChapter(current);
  };

  //TODO: Uncomment if data is fetched from API
  // React.useEffect(() => {
  //   APIUtility.API.makeAPICall(APIUtility.GET_DATA_CARE_PATHWAY);
  // }, []);

  React.useEffect(() => {
    carouselRef.current?.goTo(props.activeChapter);
  }, [props.activeChapter]);

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
              setChapterFunc={props.setActiveChapter}
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
              setChapterFunc={props.setActiveChapter}
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
              setChapterFunc={props.setActiveChapter}
            />
          </div>
        </div>
        <div>
          <div style={breastCancerStyle}>
            {props.ageRange ? (
              <PathwayDiagram
                // data={props.pathwayData}
                data={require("./pathway4.json")}
                dataKey="data_elements"
                // dataSetter={props.setPathwayData}
                setChapterFunc={props.setActiveChapter}
                transform={{ x: 100, y: 250, zoom: 1 }}
              />
            ) : (
              ageSelector
            )}
          </div>
        </div>
        <div>
          <div style={breastCancerStyle}>
            {props.ageRange ? (
              <PathwayDiagram
                // data={props.pathwayData}
                data={require("./pathway5.json")}
                dataKey="data_elements"
                // dataSetter={props.setPathwayData}
                setChapterFunc={props.setActiveChapter}
                transform={{ x: 100, y: 250, zoom: 1 }}
              />
            ) : (
              ageSelector
            )}
          </div>
        </div>
        <div>
          <div style={breastCancerStyle}>
            {props.ageRange ? (
              <PathwayDiagram
                // data={props.pathwayData}
                data={require("./pathway6.json")}
                dataKey="data_elements"
                // dataSetter={props.setPathwayData}
                setChapterFunc={props.setActiveChapter}
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
              setChapterFunc={props.setActiveChapter}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    pathwayData: state.carePathway.data,
    activeChapter: state.carePathway.activeChapter,
    ageRange: state.carePathway.ageRange,
    ageRangeDropdownOpen: state.carePathway.ageRangeDropdownOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<CarePathwayActionTypes>) => {
  return {
    setPathwayData: (data: CarePathwayData) => dispatch(actions.setDataCarePathway(data)),
    setActiveChapter: (chapter: number) => dispatch(actions.setActiveChapterCarePathway(chapter)),
    setAgeRange: (ageRange: AgeRange) => dispatch(actions.setAgeRangeCarePathway(ageRange)),
    setAgeRangeDropdownOpen: (open: boolean) => dispatch(actions.setAgeRangeDropdownOpenCarePathway(open)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Pathway);
