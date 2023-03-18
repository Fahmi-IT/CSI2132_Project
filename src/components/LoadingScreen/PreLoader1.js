/*JS for Loading Screen*/
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function PreLoader1() {
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setDone(true);
        });
    }, 2000);
  }, []);

  return (
    <>
      {!done ? (
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width={100}
        />
      ) : (
        <ul>
        </ul>
      )}
    </>
  );
}

export default PreLoader1;