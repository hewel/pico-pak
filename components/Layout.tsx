import { type FC, type PropsWithChildren } from "react";
import Head from "next/head";

import { lightThemeClass } from "styles/theme.css";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Head>
				<title>Pico Pak</title>
				<meta name="description" content="A third web client for PikPak" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={lightThemeClass}>{children}</main>
		</>
	);
};

export default Layout;
