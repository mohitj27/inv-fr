import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [expanded, setExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("https://inventory-backend-1-g9xh.onrender.com/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/");
          });
        });
    }, 3000);
  };

  const loginUser = (e) => {
    if (form.email === "" || form.password === "") {
      alert("To login user, enter details to proceed...");
    } else {
      setIsLoading(true);
      fetch("https://inventory-backend-1-g9xh.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((result) => {
          console.log("User login", result);
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    authCheck();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
        {/* Left section with details about UP Vidhan Sabha */}
        <div className="flex flex-col justify-center items-center space-y-6 px-4">
          <h1 className="text-4xl font-bold text-indigo-700 transition duration-500 transform hover:scale-110">
            Welcome to UP Vidhan Sabha
          </h1>
          <p className="text-lg text-gray-600">
            The Uttar Pradesh Vidhan Sabha is the lower house of the bicameral
            legislature of Uttar Pradesh. It plays a significant role in shaping
            the governance of India's most populous state.
          </p>

          {/* Accordion Sections */}
          <div className="space-y-4 w-full">
            {/* Section 1 */}
            <div
              className="cursor-pointer p-4 bg-indigo-50 rounded-lg shadow transition-all duration-300 hover:bg-indigo-100"
              onClick={() => handleExpand("section1")}
            >
              <h2 className="text-lg font-semibold text-indigo-600">
                {expanded === "section1"
                  ? "▼ What is Vidhan Sabha?"
                  : "► What is Vidhan Sabha?"}
              </h2>
              {expanded === "section1" && (
                <p className="text-gray-600 mt-2 transition duration-500 ease-in-out">
                  The Vidhan Sabha, also called the Legislative Assembly,
                  comprises 403 members, each representing a legislative
                  constituency.
                </p>
              )}
            </div>

            {/* Section 2 */}
            <div
              className="cursor-pointer p-4 bg-indigo-50 rounded-lg shadow transition-all duration-300 hover:bg-indigo-100"
              onClick={() => handleExpand("section2")}
            >
              <h2 className="text-lg font-semibold text-indigo-600">
                {expanded === "section2"
                  ? "▼ Role of Vidhan Sabha"
                  : "► Role of Vidhan Sabha"}
              </h2>
              {expanded === "section2" && (
                <p className="text-gray-600 mt-2 transition duration-500 ease-in-out">
                  The Vidhan Sabha plays a critical role in governance,
                  discussing and passing laws, state budgets, and other matters
                  important to the welfare of Uttar Pradesh.
                </p>
              )}
            </div>

            {/* Section 3 */}
            <div
              className="cursor-pointer p-4 bg-indigo-50 rounded-lg shadow transition-all duration-300 hover:bg-indigo-100"
              onClick={() => handleExpand("section3")}
            >
              <h2 className="text-lg font-semibold text-indigo-600">
                {expanded === "section3"
                  ? "▼ How to Attend a Session?"
                  : "► How to Attend a Session?"}
              </h2>
              {expanded === "section3" && (
                <p className="text-gray-600 mt-2 transition duration-500 ease-in-out">
                  Sessions are open to the public at certain times. You can
                  request passes through official channels.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right section for login form */}
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg bg-white shadow-lg transform transition duration-500 hover:scale-105">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={require("../assets/logo.png")}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                {/* start your 14-day free trial */}
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all ${
                  isLoading && "opacity-50 cursor-not-allowed"
                }`}
                onClick={loginUser}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                ) : (
                  "Sign in"
                )}
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{" "}
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  Don't Have an Account?{" "}
                  <Link to="/Register"> Register now </Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
