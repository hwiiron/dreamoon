import Link from "next/link";
import { useState } from "react";
import db from "@/firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

function AddUser() {
  const [newId, setNewId] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [newAge, setNewAge] = useState<number | string>("");

  const router = useRouter();

  const handleAddUser = async () => {
    const userDoc = doc(db, "users", newId);
    await setDoc(userDoc, {
      nickname: newNickname,
      age: Number(newAge),
    });

    setNewId("");
    setNewNickname("");
    setNewAge("");

    router.push("/");
  };

  return (
    <>
      <Link href={"/userList"}>유저 목록</Link>

      <div>
        <h2>유저 추가</h2>
        <input
          type="text"
          placeholder="이름"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <input
          type="number"
          placeholder="나이"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button onClick={handleAddUser}>추가</button>
      </div>
    </>
  );
}

export default AddUser;
