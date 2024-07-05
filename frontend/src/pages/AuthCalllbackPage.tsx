import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCalllbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false); // it play important role cause see it is used for not re-rendering the this component AGAIN AND again whenever the other components get re-rendered so that every time re-rendering the component will create the new user that we don't want to..
  // so means every time the useRef will change it will not render the component data again and again and it is simply the object that we can use and can change it with dot current proprty here we can only store the reference of the any not like useState which is used for the store and change the value.

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email }); // it is API that will create the user here via use of the custome hook
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user?.email, user?.sub]);

  return <div>Loading...</div>;
}
