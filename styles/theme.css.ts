import { createTheme } from "@vanilla-extract/css";
import { transparentize, lighten } from "polished";
import { slate, blue, sky, zinc } from "tailwindcss/colors";

export const [lightThemeClass, lightThemeVars] = createTheme({
	color: {
		textColor: slate[700],
		inputTextColor: slate[600],
		inputLabelColor: slate[400],
		inputBgColor: "#fff",
		inputBorderColor: slate[400],
		inputHoverColor: slate[600],
		inputFocusBgColor: sky[50],
		inputFocusBorderColor: blue[600],
		inputFocusRingColor: transparentize(0.4, blue[200]),
		inlineIconColor: slate[500],
	},
});
