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
			className={clsx("inline-flex flex-col mb-2 w-full", className)}
			onMouseLeave={() => setInputInlineElHovered(false)}
		>
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
					value={inputValue}
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
