import PathwayDiagram from "Containers/FlowDiagram/PathwayDiagram";
// import Controls from "Containers/BreadCrumbNavigation/Controls";
import Controls from "Containers/TabNavigation/Controls";
import Carousel from "react-material-ui-carousel";

import { useAppSelector } from "Store/appStore";
import { useFetchPathwayDataQuery } from "Store/services/carePathway";
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
  const { data, isError, isFetching } = useFetchPathwayDataQuery();
  const activeChapter = useAppSelector(selectPathwayActiveChapter);
  const ageRange = useAppSelector(selectPathwayAgeRange);

  const ageSelector = (
    <div style={{ height: "calc(100vh - 42px)", width: "100vw", margin: "auto" }}>
      <div style={{ margin: "auto", width: "50%", textAlign: "center", paddingTop: "45vh" }}>Please select age</div>
    </div>
  );

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong, please try again.</div>;

  return (
    <div>
      <Controls />
      <Carousel index={activeChapter} autoPlay={false} animation="slide" navButtonsAlwaysInvisible={true} swipe={false}>
        <div style={riskAsessStyle}>
          <PathwayDiagram data={data?.risk_assessment} />
        </div>

        <div style={clinicalAssessStyle}>
          <PathwayDiagram data={data?.clinical_assessment} />
        </div>

        <div style={dcisStyle}>
          <PathwayDiagram data={data?.new_diagnosis_dcis} />
        </div>

        <div style={breastCancerStyle}>
          {ageRange ? (
            <PathwayDiagram data={data?.new_diagnosis_young} transform={{ x: 100, y: 250, zoom: 1 }} />
          ) : (
            ageSelector
          )}
        </div>

        <div style={breastCancerStyle}>
          {ageRange ? (
            <PathwayDiagram data={data?.new_diagnosis_average} transform={{ x: 100, y: 250, zoom: 1 }} />
          ) : (
            ageSelector
          )}
        </div>

        <div style={breastCancerStyle}>
          {ageRange ? (
            <PathwayDiagram data={data?.new_diagnosis_old} transform={{ x: 100, y: 250, zoom: 1 }} />
          ) : (
            ageSelector
          )}
        </div>

        <div style={pregCancerStyle}>
          <PathwayDiagram data={data?.new_diagnosis_pregnancy} />
        </div>
      </Carousel>
    </div>
  );
}
