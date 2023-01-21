import { Input } from "components/forms";

const Login = () => {
	return (
		<div className="p-8 mx-auto container">
			login
			<form className="mt-8">
				<Input label="User" type="password" />
			</form>
		</div>
	);
};

export default Login;
