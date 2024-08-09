import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import cn from "classnames";
import { authService } from "../services/authService.js";
import { Link, useParams } from "react-router-dom";

const validatePassword = (value) => {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }
};

export const PasswordResetPage = () => {
  const [error, setError] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { resetToken } = useParams();

  const handleSubmit = (values, formikHelpers) => {
    const { newPassword, newPasswordConfirmation } = values;

    if (newPassword.trim() !== newPasswordConfirmation.trim()) {
      setError("Passwords are not equal.");
      formikHelpers.setSubmitting(false);
      return;
    }

    authService
      .resetPassword({
        newPassword,
        newPasswordConfirmation,
        resetToken,
      })
      .then(() => setPasswordChanged(true))
      .catch((error) => {
        setError(error || "Failed to change password.");
      });
  };

  if (error) {
    console.log(error);
    return (
      <p className="notification is-danger is-light">
        {error?.message.includes("Invalid token") ? (
          <>
            Your token is expired, please request a new token on{" "}
            <Link to={"/reset"}>reset page</Link>
          </>
        ) : (
          error?.message
        )}
      </p>
    );
  }

  if (passwordChanged) {
    return (
      <p className="notification is-success is-light">
        Your password was successfully reset, please visit{" "}
        <Link to={"/login"}>login page</Link>
      </p>
    );
  }

  return (
    <Formik
      initialValues={{
        newPassword: "",
        newPasswordConfirmation: "",
      }}
      validateOnMount={true}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="box">
          <h1 className="title">Reset password</h1>
          <div className="formik__wrapper">
            <div className="formik-column__half">
              <label htmlFor="newPassword" className="label">
                Password
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="newPassword"
                  type="password"
                  id="newPassword"
                  placeholder="*******"
                  className={cn("input", {
                    "is-danger": touched.newPassword && errors.newPassword,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
                {touched.newPassword && errors.newPassword && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>
              {touched.newPassword && errors.newPassword && (
                <p className="help is-danger">{errors.newPassword}</p>
              )}
            </div>
            <div className="formik-column__half">
              <label htmlFor="newPasswordConfirmation" className="label">
                Confirm password
              </label>
              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="newPasswordConfirmation"
                  type="password"
                  id="newPasswordConfirmation"
                  placeholder="*******"
                  className={cn("input", {
                    "is-danger":
                      touched.newPasswordConfirmation &&
                      errors.newPasswordConfirmation,
                  })}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
                {touched.newPasswordConfirmation &&
                  errors.newPasswordConfirmation && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
              </div>
              {touched.newPasswordConfirmation &&
                errors.newPasswordConfirmation && (
                  <p className="help is-danger">
                    {errors.newPasswordConfirmation}
                  </p>
                )}
            </div>
          </div>
          <div className="field">
            <button
              type="submit"
              className={cn(
                "button is-success has-text-weight-bold formik__submit",
                {
                  "is-loading": isSubmitting,
                }
              )}
              disabled={
                isSubmitting ||
                errors.newPasswordConfirmation ||
                errors.newPassword
              }
            >
              Reset password
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
