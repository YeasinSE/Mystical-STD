import './signin.css'

function SignIn() {
  return (
    <div className="form-signin">
        <button className="w-100 btn btn-lg btn-secondary" onClick={ e  =>  console.log("Sign In ...")}>Sign in with Github</button>
    </div>
  );
}

export default SignIn;
