import { createTheme } from "@vanilla-extract/css";
import { transparentize } from "polished";
import { slate, blue, sky } from "tailwindcss/colors";

export const [lightThemeClass, lightThemeVars] = createTheme({
	color: {
		textColor: slate[700],
		inputTextColor: slate[600],
		inputBorderColor: slate[400],
		inputHoverColor: slate[600],
		inputFocusBorderColor: blue[500],
		inputFocusRingColor: transparentize(0.4, sky[200]),
		inlineIconColor: slate[500],
	},
});
