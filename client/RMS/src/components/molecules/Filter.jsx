import React, { useEffect, useState } from "react";
import { semester, level, period } from "../../constants/filters";
import { useGetDepartmentQuery } from "../../store/features/departmentSlice";
import queryString from "query-string";
import { useGetCoursesQuery } from "../../store/features/coursesSlice";
function Filter({ useGet, filteredAssessmentData }) {
  // const [, set] = useState(second)
  const [selectedValue, setSelectedValue] = useState({
    departments: "",
    semester: "",
    level: "",
    period: "",
    name: "",
  });
  const obj = {
    // departments: selectedValue.departments,
    name: selectedValue.name,
    semester: selectedValue.semester,
    level: selectedValue.level,
    // period: selectedValue.period
  };
  const encodedParams = queryString.stringify(obj);
  const {
    isLoading: loading,
    isSuccess,
    data: filteredData,
  } = useGet(encodedParams);
  const handleFilterChange = (e) => {
    return setSelectedValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (loading) {
      console.log("loading...");
    } else if (isSuccess) {
      // filteredAssessmentData(filteredData)
      const deepFiltering = filteredData.filter(
        ({ course }) => course.name === selectedValue.name
      );
      if (deepFiltering && deepFiltering.length) {
        filteredAssessmentData(deepFiltering);
      } else {
        filteredAssessmentData(filteredData);
      }
    }
  }, [filteredData]);
  const { data: departments } = useGetDepartmentQuery();
  const { isLoading: courseLoading, data: courses } = useGetCoursesQuery();
  return (
    <div className="filter flex justify-between flex-wrap">
      {/* <label htmlFor="department">
        Department: &nbsp;
        <select name="department" onChange={handleFilterChange}>
          <option value="">select department</option>
          {
            isLoading ? <option>loading...</option> :
              departments.map(dept => {
                return <option key={dept._id} value={dept.departmentName}>{dept.departmentName}</option>
              })
          }
        </select>
      </label> */}
      <label htmlFor="name">
        Course: &nbsp;
        <select name="name" onChange={handleFilterChange}>
          <option value="">select course</option>
          {courseLoading ? (
            <option>loading...</option>
          ) : (
            courses.map((course) => {
              return (
                <option key={course._id} value={course.name}>
                  {course.name}
                </option>
              );
            })
          )}
        </select>
      </label>
      <label htmlFor="semester">
        Semester: &nbsp;
        <select name="semester" onChange={handleFilterChange}>
          <option value="">select semester</option>
          {semester.map((semester) => {
            return (
              <option key={semester.id} value={semester.semester}>
                {semester.semester}
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="level">
        Level: &nbsp;
        <select name="level" onChange={handleFilterChange}>
          <option value="#">select level</option>
          {level.map((level) => {
            return (
              <option key={level.id} value={level.level}>
                {level.level}
              </option>
            );
          })}
        </select>
      </label>
      <label htmlFor="period">
        Period: &nbsp;
        <select name="period" onChange={handleFilterChange}>
          <option value="">select period</option>
          {period.map((period) => {
            return (
              <option key={period.id} value={period.period}>
                {period.period}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

export default Filter;
