const CommitLintConfiguration = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"build",
				"chore",
				"ci",
				"docs",
				"feat",
				"fix",
				"perf",
				"refactor",
				"revert",
				"style",
				"test",
			],
		],
		"scope-enum": [
			2,
			"always",
			[
				"all",
				"misc",
				"app",
				"pages",
				"docs",
				"lib",
				"styles",
				"db",
				"api",
				"components",
				"config",
				"lib",
				"translations",
			],
		],
		"scope-case": [2, "always", "kebab-case"],
	},
};

module.exports = CommitLintConfiguration;
