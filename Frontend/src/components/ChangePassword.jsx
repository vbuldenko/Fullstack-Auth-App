import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import cn from "classnames";

import { usePageError } from "../hooks/usePageError.js";
import { userService } from "../services/userService.js";

const validatePassword = (value) => {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }
};

export const ChangePassword = () => {
  const [error, setError] = usePageError("");
  const [done, setDone] = useState(true);

  const handleSubmit = (values, formikHelpers) => {
    const { newPassword, newPasswordConfirmation, oldPassword } = values;

    if (newPassword.trim() !== newPasswordConfirmation.trim()) {
      setError("Passwords are not equal.");
      formikHelpers.setSubmitting(false);
      return;
    }

    userService
      .updatePassword({
        oldPassword,
        newPassword,
        confirmation: newPasswordConfirmation,
      })
      .then(() => {
        setDone(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message);
        formikHelpers.setSubmitting(false);
      });
  };

  return (
    <>
      {done ? (
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
          }}
          validateOnMount={true}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="box">
              <h1 className="title">Change password</h1>
              <div className="formik__wrapper">
                <div className="formik-column__half">
                  <label htmlFor="oldPassword" className="label">
                    Old password
                  </label>

                  <div className="control has-icons-left has-icons-right">
                    {/* additional hidden input for accessibility */}
                    <input
                      type="text"
                      name="username"
                      autoComplete="username"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px" }}
                    />
                    <Field
                      validate={validatePassword}
                      name="oldPassword"
                      type="password"
                      id="oldPassword"
                      placeholder="*******"
                      autoComplete="current-password"
                      className={cn("input", {
                        "is-danger": touched.oldPassword && errors.oldPassword,
                      })}
                    />

                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>

                    {touched.oldPassword && errors.oldPassword && (
                      <span className="icon is-small is-right has-text-danger">
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
                  </div>
                  {touched.oldPassword && errors.oldPassword && (
                    <p className="help is-danger">{errors.oldPassword}</p>
                  )}
                </div>
                <div className="formik-column__half">
                  <label htmlFor="newPassword" className="label">
                    New password
                  </label>

                  <div className="control has-icons-left has-icons-right">
                    <Field
                      validate={validatePassword}
                      name="newPassword"
                      type="password"
                      id="newPassword"
                      placeholder="*******"
                      autoComplete="new-password"
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
                      autoComplete="new-password"
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
                    errors.oldPassword ||
                    errors.newPassword ||
                    errors.newPasswordConfirmation
                  }
                >
                  Change password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <p className="notification is-success is-light">
          Your password is successfully changed!
        </p>
      )}

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
