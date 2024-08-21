import { useSelector } from "react-redux";
import Modal from "../UI/Modal";
import { useCookies } from 'react-cookie';
import classes from './Profile.module.css';
import { Avatar } from "@mui/material";

const Profile = (props) => {
  const [cookies] = useCookies(['user']);
  const userDetails = cookies.user;
  console.log(userDetails);

  if (!userDetails) {
    return null; // Render nothing if userDetails is undefined or null
  }

  return (
    <Modal onCartClose={props.onClose}>
      <div className={classes.profile}>
        <h2>User Profile</h2>
        {userDetails.photoURL ? (
          <img src={userDetails.photoURL} alt="User Profile" className={classes.profileImage} />
        ) : (
          <div className={classes.profileImage}>
            <Avatar className={classes.avatar} />
          </div>
        )}
        <p><strong>UID:</strong> {userDetails.uid}</p>
        <p><strong>Name:</strong> {userDetails.displayName}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
      </div>
    </Modal>
  );
};

export default Profile;
