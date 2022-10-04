import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function RegisteredUsers() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "minibasketballuser");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  return (
    <>
      {users.map((user) => {
        return (
          <>
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
          </>
        );
      })}
    </>
  );
}

export default RegisteredUsers;
