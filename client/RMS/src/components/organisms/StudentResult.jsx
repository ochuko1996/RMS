import SingleResult from "../molecules/singleResult";
import PropTypes from "prop-types";

function StudentResult({ loadingResult, semesterData, singleResult }) {
  console.log(singleResult);
  return (
    <section>
      {loadingResult ? (
        <p>loading...</p>
      ) : semesterData?.length > 0 ? (
        <>
          {["one", "two", "three", "four", "five", "six"].map((semester) => {
            // const semesterData = singleResult?.result;
            const num = `${semester.charAt(0).toUpperCase()}${semester.slice(
              1,
              semester.length
            )}`;
            const semesterName = `semester${num}`;
            const gpaName = `GPA_${num}`;
            const semesterDataForCurrentSemester = semesterData.find((data) =>
              data.hasOwnProperty(semesterName)
            );
            const semesterDataArray =
              semesterDataForCurrentSemester[semesterName] || [];
            const GPA = isNaN(semesterDataForCurrentSemester[gpaName])
              ? "Not Available"
              : semesterDataForCurrentSemester[gpaName];
            return (
              semesterDataArray.length > 0 && (
                <section
                  key={semester}
                  className="border border-[--blue-gray-2] p-2 mb-2"
                >
                  {semesterDataArray.map((item) => (
                    <SingleResult key={item._id} data={item} />
                  ))}
                  <p className="mt-4 font-bold">
                    {`Semester ${semester} GPA: ${GPA}`}
                  </p>
                </section>
              )
            );
          })}
          {singleResult?.grade && (
            <>
              <h1 className="text-2xl mt-5 font-bold">
                Cumulative Grade Point Average :{" "}
                {singleResult.grade.cgpa || "-"}{" "}
              </h1>
              <h1 className="text-3xl mt-5 font-bold text-center">
                {singleResult?.grade?.grade}
              </h1>
            </>
          )}
        </>
      ) : (
        <p className="text-6xl font-bond text-center mt-[10rem]">
          No result Yet{" "}
        </p>
      )}
    </section>
  );
}

StudentResult.propTypes = {
  loadingResult: PropTypes.bool.isRequired,
  singleResult: PropTypes.array.isRequired,
  semesterData: PropTypes.array.isRequired,
  hasOwnProperty: PropTypes.object.isRequired,
};
export default StudentResult;
