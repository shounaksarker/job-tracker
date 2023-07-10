import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const SignUpForm = ({ handleBlur, handleSignUp }) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
      <h2 className="text-2xl text-center font-semibold underline text-purple-900 mb-4">Sign Up</h2>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your Name" />
        </div>
        <TextInput
          type="text"
          name="name"
          placeholder="Your Name"
          required={true}
          onBlur={handleBlur}
        />
      </div>
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
          type="password"
          name="password"
          placeholder="password"
          required={true}
          onBlur={handleBlur}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignUpForm;
