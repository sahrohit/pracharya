import { useState } from "react";
import {
	Navbar,
	SegmentedControl,
	Text,
	createStyles,
	getStylesRef,
	rem,
} from "@mantine/core";
import {
	TbShoppingCart,
	TbLicense,
	TbMessage2,
	TbBellRinging,
	TbMessages,
	TbFingerprint,
	TbKey,
	TbSettings,
	Tb2Fa,
	TbUsers,
	TbFileAnalytics,
	TbDatabaseImport,
	TbReceipt2,
	TbReceiptRefund,
	TbLogout,
	TbSwitchHorizontal,
} from "react-icons/tb";

const useStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	title: {
		textTransform: "uppercase",
		letterSpacing: rem(-0.25),
	},

	link: {
		...theme.fn.focusStyles(),
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[7],
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[6]
					: theme.colors.gray[0],
			color: theme.colorScheme === "dark" ? theme.white : theme.black,

			[`& .${getStylesRef("Tb")}`]: {
				color: theme.colorScheme === "dark" ? theme.white : theme.black,
			},
		},
	},

	linkTb: {
		ref: getStylesRef("Tb"),
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[2]
				: theme.colors.gray[6],
		marginRight: theme.spacing.sm,
	},

	linkActive: {
		"&, &:hover": {
			backgroundColor: theme.fn.variant({
				variant: "light",
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
				.color,
			[`& .${getStylesRef("Tb")}`]: {
				color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
					.color,
			},
		},
	},

	footer: {
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingTop: theme.spacing.md,
	},
}));

const tabs = {
	account: [
		{ link: "", label: "Notifications", icon: TbBellRinging },
		{ link: "", label: "Billing", icon: TbReceipt2 },
		{ link: "", label: "Security", icon: TbFingerprint },
		{ link: "", label: "SSH Keys", icon: TbKey },
		{ link: "", label: "Databases", icon: TbDatabaseImport },
		{ link: "", label: "Authentication", icon: Tb2Fa },
		{ link: "", label: "Other Settings", icon: TbSettings },
	],
	general: [
		{ link: "", label: "Orders", icon: TbShoppingCart },
		{ link: "", label: "Receipts", icon: TbLicense },
		{ link: "", label: "Reviews", icon: TbMessage2 },
		{ link: "", label: "Messages", icon: TbMessages },
		{ link: "", label: "Customers", icon: TbUsers },
		{ link: "", label: "Refunds", icon: TbReceiptRefund },
		{ link: "", label: "Files", icon: TbFileAnalytics },
	],
};

export default function NavbarSegmented() {
	const { classes, cx } = useStyles();
	const [section, setSection] = useState<"account" | "general">("account");
	const [active, setActive] = useState("Billing");

	const links = tabs[section].map((item) => (
		<a
			className={cx(classes.link, {
				[classes.linkActive]: item.label === active,
			})}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkTb} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	));

	return (
		<Navbar height={840} width={{ sm: 300 }} p="md" className={classes.navbar}>
			<Navbar.Section>
				<Text
					weight={500}
					size="sm"
					className={classes.title}
					color="dimmed"
					mb="xs"
				>
					bgluesticker@mantine.dev
				</Text>

				<SegmentedControl
					value={section}
					onChange={(value: "account" | "general") => setSection(value)}
					transitionTimingFunction="ease"
					fullWidth
					data={[
						{ label: "Account", value: "account" },
						{ label: "System", value: "general" },
					]}
				/>
			</Navbar.Section>

			<Navbar.Section grow mt="xl">
				{links}
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<TbSwitchHorizontal className={classes.linkTb} stroke={1.5} />
					<span>Change account</span>
				</a>

				<a
					href="#"
					className={classes.link}
					onClick={(event) => event.preventDefault()}
				>
					<TbLogout className={classes.linkTb} stroke={1.5} />
					<span>Logout</span>
				</a>
			</Navbar.Section>
		</Navbar>
	);
}
