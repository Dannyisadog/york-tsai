import { Metadata } from "next";
import SignInForm from "./SigninForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const generateMetadata = (): Metadata => {
  return {
    title: "Sign In",
    description: "Sign In to your account",
    robots: "noindex, nofollow",
  };
};

export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <SignInForm />;
}
