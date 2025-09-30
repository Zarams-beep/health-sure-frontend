import SignUp from "@/component/SignUpComponent";

export const metadata = {
  title: "Health Sure Sign Up",
  description: "This is Sign Up Page",
};
export default function SignUpPage (){
    return(
        <>
            <div className="">
                <SignUp/>
            </div>
        </>
    )
}