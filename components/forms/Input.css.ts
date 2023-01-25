import { style } from "@vanilla-extract/css";
import { lightThemeVars } from "styles/theme.css";

export const inputWarpClass = style({
	vars: {
		"--tw-ring-color": lightThemeVars.color.inputFocusRingColor,
	},
	color: lightThemeVars.color.inputTextColor,
	backgroundColor: lightThemeVars.color.inputBgColor,
	borderColor: lightThemeVars.color.inputBorderColor,
	":hover": {
		borderColor: lightThemeVars.color.inputHoverColor,
	},
});

export const inputWarpFocusClass = style({
	// backgroundColor: lightThemeVars.color.inputFocusBgColor,
	borderColor: lightThemeVars.color.inputFocusBorderColor,
	":hover": {
		borderColor: lightThemeVars.color.inputFocusBorderColor,
	},
});

export const inputClass = style({
	color: lightThemeVars.color.inputTextColor,
	caretColor: lightThemeVars.color.inputTextColor,
});

export const labelClass = style({
	color: lightThemeVars.color.inputLabelColor,
});

export const labelFoucsClass = style({
	color: lightThemeVars.color.inputFocusBorderColor,
});

export const inlineIconClass = style({
	color: lightThemeVars.color.inlineIconColor,
});
