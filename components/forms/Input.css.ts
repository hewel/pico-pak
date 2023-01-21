import { style } from "@vanilla-extract/css";
import { lightThemeVars } from "styles/theme.css";

export const inputWarpClass = style({
	vars: {
		"--tw-ring-color": lightThemeVars.color.inputFocusRingColor,
	},
	color: lightThemeVars.color.inputTextColor,
	borderColor: lightThemeVars.color.inputBorderColor,
	":hover": {
		borderColor: lightThemeVars.color.inputHoverColor,
	},
});

export const inputWarpFocusClass = style({
	borderColor: lightThemeVars.color.inputFocusBorderColor,
	":hover": {
		borderColor: lightThemeVars.color.inputFocusBorderColor,
	},
});

export const inputClass = style({
	color: lightThemeVars.color.inputTextColor,
	caretColor: lightThemeVars.color.inputHoverColor,
});

export const labelClass = style({
	color: lightThemeVars.color.textColor,
});

export const eyeClass = style({
	color: lightThemeVars.color.inlineIconColor,
});
