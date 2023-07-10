import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const LoginForm = ({ handleBlur, handleLogin }) => {
  return (
    <form className="flex flex-col  gap-4" onSubmit={handleLogin}>
      <h2 className="text-2xl text-center font-semibold underline text-purple-900 mb-4">
        Login
      </h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your Email" />
        </div>
        <TextInput
          name="email"
          type="email"
          placeholder="yourMail@domain.com"
          required={true}
          onBlur={handleBlur}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          name="password"
          type="password"
          placeholder="password"
          required={true}
          onBlur={handleBlur}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;
