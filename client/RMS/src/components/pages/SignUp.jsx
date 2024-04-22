import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../atom/Button";
import { Link } from "react-router-dom";
import Input from "../atom/Input";
import { useGetDepartmentQuery } from "../../store/features/departmentSlice";
import { useSignupMutation } from "../../store/features/authApiSlice";
import Welcome from "../molecules/Welcome";

function SignUp() {
  // STATES
  const [showModal, setShowModal] = useState(false);
  const [isStudent, setIsStudent] = useState(true);

  // RTK QUERY
  const [signup, { isLoading: loadingSignUp }] = useSignupMutation();
  const { isLoading, data: departments } = useGetDepartmentQuery();

  //INITILIZER
  const initialData = {
    matricNo: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
  };
  const [formValues, setFormValues] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(setFormValues(initialData));
    // try {
    const response = await signup({
      matricNo: formValues?.matricNo,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      department: formValues?.department,
    });
    // console.log(signUp)
    response.data ? setShowModal(true) : setShowModal(false);
    setFormValues(initialData);

    // Error handling
    // console.log(response?.error?.status );
    if (!response?.error?.error?.status === 500) {
      toast("No server response");
    } else if (response?.error?.status === 409) {
      toast("user or email already exist");
    }
  };
  const handleChange = (e) =>
    setFormValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

  return (
    <main className="flex flex-col md:flex-row justify-between bg-slate-700 authWrapper">
      <ToastContainer />
      {showModal && <Welcome />}
      <div className="md:w-1/2"></div>
      <div className="md:w-1/2 h-[100vh] flex flex-col items-center justify-center bg-[transparent]">
        {/* <h1 className="mb-5">
            Register
          </h1> */}
        <div className="btn-wrapper mb-5">
          <Button
            className={`mr-10 ${
              isStudent ? "bg-[--blue-gray-3] text-white" : "bg-[#faf7f7]"
            }  p-[10px] rounded-sm`}
            onClick={() => setIsStudent(true)}
          >
            Student
          </Button>
          <Button
            className={`p-[10px] ${
              isStudent ? "bg-[#faf7f7]" : "bg-[--blue-gray-3] text-white"
            }  bordered rounded-sm`}
            onClick={() => setIsStudent(false)}
          >
            Admin
          </Button>
        </div>
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="authForm authSignUp"
        >
          {isStudent ? (
            <Input
              type="number"
              className="authInput rounded-sm"
              placeholder={"22123"}
              value={formValues.matricNo}
              name={"matricNo"}
              onChange={handleChange}
            >
              Matric_No:
            </Input>
          ) : (
            ""
          )}

          <Input
            placeholder={"ochuko"}
            name={"firstName"}
            className="authInput rounded-sm"
            value={formValues.firstName}
            onChange={handleChange}
          >
            First Name:
          </Input>
          <Input
            placeholder={"ochuko"}
            name={"lastName"}
            className="authInput rounded-sm"
            value={formValues.lastName}
            onChange={handleChange}
          >
            Last Name:
          </Input>

          <Input
            type={"email"}
            placeholder={"ochuko@gmail.com"}
            name={"email"}
            className="authInput rounded-sm"
            value={formValues.email}
            onChange={handleChange}
          >
            Email:
          </Input>
          <Input
            type={"password"}
            placeholder={"*******"}
            name={"password"}
            className="authInput rounded-sm"
            value={formValues.password}
            onChange={handleChange}
          >
            Password:
          </Input>
          {isStudent ? (
            <label>
              Department: &nbsp;
              <select
                name="department"
                value={formValues.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>;
                {isLoading ? (
                  <option value="csc" disabled>
                    select department
                  </option>
                ) : (
                  departments.map((dept) => {
                    return (
                      <option
                        key={dept._id}
                        value={dept._id}
                        className="text-black"
                      >
                        {dept.departmentName}
                      </option>
                    );
                  })
                )}
              </select>
            </label>
          ) : (
            ""
          )}
          <div>
            <Button
              type={"submit"}
              className="w-full bg-[--blue-gray-3] rounded-sm h-10 text-white mt-5 p-2 flex justify-center"
            >
              {loadingSignUp ? <FaSpinner /> : "Sign Up"}
            </Button>
          </div>
          <p className="mt-2 ">
            Have an account?{" "}
            <Link to="/login" className="">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
