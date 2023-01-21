import {
	type ReactNode,
	type FC,
	type InputHTMLAttributes,
	type FocusEventHandler,
	useMemo,
	useState,
	useCallback,
	useEffect,
} from "react";
import { clsx } from "clsx";
import { IconEye, IconEyeOff } from "@tabler/icons";

import useInputId from "./useInputId";

import {
	inputWarpClass,
	inputClass,
	labelClass,
	eyeClass,
	inputWarpFocusClass,
} from "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name?: string;
	label?: ReactNode;
	required?: boolean;
	clearable?: boolean;
}

const Input: FC<InputProps> = ({
	type = "text",
	className,
	name,
	label,
	required,
	clearable,
	disabled,
	onFocus,
	onBlur,
	...props
}) => {
	const inputId = useInputId(name);

	const [focused, setFocused] = useState(false);
	const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>((e) => {
		if (onFocus) onFocus(e);
		setFocused(true);
	}, []);
	const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>((e) => {
		if (onBlur) onBlur(e);
		setFocused(false);
	}, []);
	useEffect(() => {
		setFocused((isFocused) => (disabled ? false : isFocused));
	}, [disabled]);

	const isTypePassword = useMemo(() => type === "password", [type]);
	const [showPassword, setShowPassword] = useState(false);
	const passwordType = useMemo(
		() => (showPassword ? "text" : "password"),
		[showPassword],
	);

	return (
		<div className={clsx("inline-flex flex-col mb-2 w-full", className)}>
			{label && (
				<label htmlFor={inputId} className={clsx("mb-1 text-sm", labelClass)}>
					{label}
					{required && <span className="text-red-500 ml-0.5">*</span>}
				</label>
			)}
			<div
				className={clsx(
					"relative w-full rounded-md border transition",
					inputWarpClass,
					focused && inputWarpFocusClass,
					focused && "ring-2 hover:ring-offset-1",
				)}
			>
				<input
					id={inputId}
					className={clsx(
						"px-3 py-2 text-sm w-full rounded-md border-0 border-current",
						"focus:outline-none",
						inputClass,
					)}
					type={isTypePassword ? passwordType : type}
					disabled={disabled}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
				{isTypePassword && (
					<span
						className={clsx(
							"cursor-pointer absolute mr-2 right-0 top-1/2 -translate-y-1/2",
							eyeClass,
						)}
						onClick={() => {
							setShowPassword((show) => !show);
						}}
					>
						{showPassword ? (
							<IconEyeOff stroke={1.5} />
						) : (
							<IconEye stroke={1.5} />
						)}
					</span>
				)}
			</div>
		</div>
	);
};

export default Input;
