import React, { ReactElement } from "react";
import { AppContext, ContextInterface } from "./app.context";
import { useBoolean } from "@chakra-ui/react";
import { User } from "@prisma/client";

export default function AppProvider({ children }: { children: ReactElement }) {
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User>();

  const [loading, { on, off }] = useBoolean(false);

  const handleUsername = (username: string) => {
    setMessage(null);
    setErrors([]);
    setData({ ...data, username });
  };

  const handlePassword = (password: string) => {
    setMessage(null);
    setErrors([]);
    setData({ ...data, password });
  };

  const check = (e: Event) => {
    e.preventDefault()
    on();
    setMessage(null);
    setErrors([]);
    setUser(undefined);
    fetch(`api/user?${new URLSearchParams({ username: data.username })}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setErrors(data.error);
        if (data.message) setMessage(data.message);
        off();
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
        off();
      });
  };

  const submit = (e: Event) => {
    e.preventDefault()
    on();
    setMessage(null);
    setErrors([]);
    setUser(undefined);
    fetch("api/user", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.error) setErrors(data.error);
          if (data.message) setMessage(data.message);
          if (data.user) setUser(data.user as User);
          off();
        });
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
        off();
      });
  };

  const value: ContextInterface = {
    data,
    handleUsername,
    handlePassword,
    submit,
    check,
    message,
    errors,
    loading,
    user
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
