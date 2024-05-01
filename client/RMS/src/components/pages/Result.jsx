import { useState } from "react";
import { selectCurrentRoles } from "../../store/api/authSlice";
import { useSelector } from "react-redux";
import {
  useGetAllResultQuery,
  useGetSingleResultQuery,
} from "../../store/features/results";
import ErrorBoundary from "../../errorHandling";
import SearchBar from "../molecules/SearchBar";
import queryString from "query-string";
import ResultHeader from "../molecules/ResultHeader";
import AdminResult from "../organisms/AdminResult";
import StudentResult from "../organisms/StudentResult";
import MainWrapper from "../molecules/MainWrapper";

function Result() {
  const [searchQuery, setSearchQuery] = useState("");
  const token = useSelector(selectCurrentRoles);
  const obj = { search: searchQuery };
  const encodedParams = queryString.stringify(obj);
  const { isLoading: loadingAllResult, data: allResult } =
    useGetAllResultQuery(encodedParams);
  const { isLoading: loadingResult, data: singleResult } =
    useGetSingleResultQuery();

  const handleSearch = async (e) => {
    e.preventDefault();
    // const searchResult = await allResult()
  };

  let content = null;

  if (loadingResult) {
    console.log("loading...");
  } else if (singleResult?.result?.length) {
    const semestersData = singleResult?.result;
    content = (
      <main>
        <ResultHeader />
        <StudentResult
          loadingResult={loadingResult}
          semesterData={semestersData}
          singleResult={singleResult}
        />
      </main>
    );
  }

  if (token.length > 1) {
    if (loadingAllResult) {
      console.log("loading...");
    } else if (allResult?.result?.length) {
      const semestersData = allResult.result;
      const semesterData = semestersData.map((data) => ({
        [`semester${data.semester.replace(/^\w/, (c) => c.toUpperCase())}`]:
          data.semesterData,
        [`GPA_${data.semester.replace(/^\w/, (c) => c.toUpperCase())}`]:
          data.GPA,
      }));
      content = (
        <main>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          <ResultHeader />
          <AdminResult
            loadingAllResult={loadingAllResult}
            semesterData={semesterData}
            allResult={allResult}
          />
        </main>
      );
    }
  }

  return (
    <ErrorBoundary>
      <MainWrapper>{content}</MainWrapper>
    </ErrorBoundary>
  );
}

export default Result;
