import { useState } from "react";

import AddAssessment from "../molecules/AddAssessments";
import Filter from "../molecules/filter";
import { useGetAllRegisteredCoursesQuery } from "../../store/features/registeredCourseSlice";
import MainWrapper from "../molecules/MainWrapper";
function Assessment() {
  const [useGetall, setUseGetall] = useState([]);
  const filteredAssessmentData = (filteredData) => {
    console.log("filteredData:", filteredData);
    setUseGetall(filteredData);
    // return filteredData
  };
  // const controlledData = filteredAssessmentData

  return (
    <MainWrapper>
      <Filter
        useGet={useGetAllRegisteredCoursesQuery}
        filteredAssessmentData={filteredAssessmentData}
      />
      <h1 className="font-bold text-center mt-5 mb-5">Enter Assessment</h1>
      {useGetall.map((assessment) => {
        // console.log(assessment._id);
        return <AddAssessment key={assessment._id} assessment={assessment} />;
      })}
    </MainWrapper>
  );
}

export default Assessment;
