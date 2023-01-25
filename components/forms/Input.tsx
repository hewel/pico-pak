import {
	type ReactNode,
	type InputHTMLAttributes,
	type FocusEventHandler,
	forwardRef,
	useMemo,
	useState,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { clsx } from "clsx";
import { useMergedRef } from "@mantine/hooks";

import { IconEye, IconEyeOff, IconX } from "@tabler/icons";

import useInputId from "./useInputId";

import {
	inputWarpClass,
	inputClass,
	labelClass,
	inlineIconClass,
	inputWarpFocusClass,
	labelFoucsClass,
} from "./Input.css";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	name?: string;
	label?: ReactNode;
	required?: boolean;
	clearable?: boolean;
	onChange?: (value: InputProps["value"]) => void;
	onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		value,
		type = "text",
		className,
		name,
		label,
		required,
		clearable,
		disabled,
		onChange,
		onFocus,
		onBlur,
		onClear,
		...props
	},
	ref,
) {
	const inputId = useInputId(name);
	const [inputValue, setInputValue] = useState(value ?? "");
	const inputRef = useRef<HTMLInputElement>(null);
	const mergedRef = useMergedRef(ref, inputRef);

	useEffect(() => {
		onChange?.(inputValue);
		if (inputRef.current) inputRef.current.value = String(inputValue);
	}, [inputValue]);

	const [inputInlineElHovered, setInputInlineElHovered] = useState(false);

	const [focused, setFocused] = useState(false);
	const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>((e) => {
		onFocus?.(e);
		setFocused(true);
	}, []);
	const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
		(e) => {
			onBlur?.(e);
			if (!inputInlineElHovered) {
				setFocused(false);
			} else {
				inputRef.current?.focus();
				e.preventDefault();
			}
		},
		[inputInlineElHovered],
	);
	useEffect(() => {
		setFocused((isFocused) => (disabled ? false : isFocused));
	}, [disabled]);

	const isTypePassword = useMemo(() => type === "password", [type]);
	const [showPassword, setShowPassword] = useState(false);
	const passwordType = useMemo(() => (showPassword ? "text" : "password"), [showPassword]);

	return (
		<div
			className={clsx("inline-flex relative flex-col mb-2 w-full", className)}
			onMouseLeave={() => setInputInlineElHovered(false)}
		>
			{label && (
				<label
					htmlFor={inputId}
					className={clsx(
						"absolute text-sm pointer-events-none transition-all bg-transparent z-10",
						labelClass,
						focused || Boolean(inputValue)
							? "-top-2 left-3 text-xs bottom-auto -mx-1 px-1 bg-white"
							: "left-px px-3 py-2 inset-y-px",
						focused && labelFoucsClass,
					)}
				>
					{label}
					{required && <span className="text-red-500 ml-0.5">*</span>}
				</label>
			)}
			<div
				className={clsx(
					"relative w-full rounded-md border transition",
					inputWarpClass,
					focused && "hover:ring-1",
					focused && inputWarpFocusClass,
				)}
			>
				<input
					id={inputId}
					className={clsx(
						"px-3 py-2 text-sm w-full rounded-md border-0 border-current bg-transparent",
						"focus:outline-none",
						inputClass,
					)}
					type={isTypePassword ? passwordType : type}
					ref={mergedRef}
					disabled={disabled}
					onChange={(ev) => setInputValue(ev.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
				{clearable && focused && Boolean(inputValue) && (
					<span
						className={clsx(
							"cursor-pointer absolute top-1/2 -translate-y-1/2 mr-2",
							isTypePassword ? "right-8" : "right-0",
							inlineIconClass,
						)}
						onClick={() => {
							onClear?.();
							setInputValue("");
						}}
						onMouseEnter={() => {
							setInputInlineElHovered(true);
						}}
						onMouseLeave={() => {
							setInputInlineElHovered(false);
						}}
					>
						<IconX size={12} />
					</span>
				)}
				{isTypePassword && (
					<span
						className={clsx(
							"cursor-pointer absolute mr-2 right-0 top-1/2 -translate-y-1/2",
							inlineIconClass,
						)}
						onClick={() => {
							setShowPassword((show) => !show);
						}}
						onMouseEnter={() => {
							setInputInlineElHovered(true);
						}}
						onMouseLeave={() => {
							setInputInlineElHovered(false);
						}}
					>
						{showPassword ? <IconEyeOff stroke={1.5} /> : <IconEye stroke={1.5} />}
					</span>
				)}
			</div>
		</div>
	);
});

export default Input;
