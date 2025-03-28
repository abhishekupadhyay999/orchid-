import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import AuthLayout from "../../src/layouts/AuthLayout";
import { loginUser } from "../../src/redux/action/auth";

const Login2 = ({ loginUser, errorMsg }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const { email, password } = userInfo;
  const onChange = (e) =>
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(userInfo);
    }
  };
  return (
    <AuthLayout>
      {errorMsg && (
        <div className={`alert alert-${errorMsg.auth ? "success" : "danger"}`}>
          {errorMsg.msg}
        </div>
      )}
      <h4 className="text-center mb-4">Sign in your account</h4>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="mb-1">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            className="form-control"
            defaultValue="hello@example.com"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <label className="mb-1">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            className="form-control"
            defaultValue="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-row d-flex justify-content-between mt-4 mb-2">
          <div className="mb-3">
            <div className="form-check- custom-checkbox ms-1">
              <input
                type="checkbox"
                className="form-check--input"
                id="basic_checkbox_1"
              />
              <label
                className="form-check--label"
                htmlFor="basic_checkbox_1"
              >
                Remember my preference
              </label>
            </div>
          </div>
          <div className="mb-3">
            <Link href="/pages/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block">
            Sign Me In
          </button>
        </div>
      </form>
      <div className="new-account mt-3">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/pages/register" className="text-primary">Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
const mapStateToProps = (state) => ({
  errorMsg: state.auth.authErrors,
});

export default connect(mapStateToProps, { loginUser })(Login2);
