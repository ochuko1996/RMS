import { useState } from "react";
import Input from "../atom/Input";
import { VscPass } from "react-icons/vsc";
import Button from "../atom/Button";
import { useAddAssessmentMutation } from "../../store/features/assessmentSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useGetAssessmentsQuery } from '../../store/features/assessmentSlice'
// imort {}
function AddAssessment({ assessment }) {
  const [sent, setSent] = useState(false);
  const intialState = {
    classWork: "",
    exam: "",
  };
  const [addAssessment, { isLoading }] = useAddAssessmentMutation();
  // console.log(postAssessment);
  const [formValues, setFormValues] = useState(intialState);
  const handleChange = (e) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const course = assessment?._id;
  const createdBy = assessment?.createdBy;
  const matricNo = assessment?.matricNo;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAssessment = await addAssessment({
      classWork: formValues.classWork,
      exam: formValues.exam,
      registeredCourse: course,
      createdBy,
      matricNo: matricNo,
    });
    if (!formValues.classWork && !formValues.exam) {
      toast("field can't be empty");
      // console.log(isError, error);
      setSent(false);
    } else if (newAssessment?.error?.status === 409) {
      // console.log(error.error.status);
      setSent(false);
      toast(newAssessment?.error?.data);
    } else {
      setSent(true);
    }
    setFormValues(intialState);
  };
  return (
    <div className=" mb-3  ">
      <ToastContainer />
      <form
        method="post"
        className="flex items-center border-b border-[--blue-gray-1] p-1"
      >
        <p className="lg:mr- capitalize w-1/5">
          Mat_no: {assessment ? assessment?.matricNo : 223232}
        </p>
        <p className="lg:mr-2 capitalize w-2/5">{assessment?.course?.name}</p>
        <Input
          type="number"
          name="classWork"
          onChange={handleChange}
          className="rounded-sm lg:mr- p-1 w-2/5"
          placeholder={"30"}
          // maxLength={2}
          min={"0"}
          max={"30"}
          value={formValues.classWork}
        >
          Classwork: &nbsp;
        </Input>
        <Input
          // maxLength={2}
          type="number"
          name="exam"
          onChange={handleChange}
          className=" rounded-sm lg:mr-2 p-1 w-2/5"
          value={formValues.exam}
          placeholder={"70"}
          min={"0"}
          max={"70"}
        >
          Examination: &nbsp;
        </Input>
        <Button
          onClick={handleSubmit}
          disabled={sent}
          className="bg-[--blue-gray-3] text-white p-1 rounded-sm flex justify-center p-2"
        >
          {sent ? <VscPass /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default AddAssessment;
