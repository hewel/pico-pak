import { useForm } from "react-hook-form";
import { Input } from "components/forms";

const Login = () => {
	const { handleSubmit, register, setValue } = useForm<{ user: string }>({
		defaultValues: {
			user: "",
		},
		mode: "onChange",
	});

	return (
		<div className="p-8 mx-auto container">
			login
			<form className="mt-8 w-64">
				<Input label="User" type="password" clearable />
			</form>
		</div>
	);
};

export default Login;
