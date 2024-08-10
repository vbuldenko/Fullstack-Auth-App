import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Loader } from "../components/Loader";
import ChangeName from "../components/ChangeName";
import { ChangeEmail } from "../components/ChangeEmail";
import { ChangePassword } from "../components/ChangePassword";
import "../styles.scss";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <>
          <ChangeName />
          <ChangePassword />
          <ChangeEmail />
        </>
      )}
    </>
  );
};
