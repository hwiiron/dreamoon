import { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { StyledInner } from "../layout/Inner.style";

type User = {
  id: string;
  nickname: string;
  age: number;
};

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      nickname: doc.data().nickname,
      age: doc.data().age,
    }));
    setUsers(usersList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <StyledInner>
      <h2>유저 목록</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "2px solid orange", margin: "20px 0" }}
        >
          <p>아이디: {user.id}</p>
          <p>닉네임: {user.nickname}</p>
          <p>나이: {user.age}</p>
        </div>
      ))}
    </StyledInner>
  );
}

export default UserList;
