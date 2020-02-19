module.exports = {
  env: {
		commonjs: true,
		node: true
	},
	extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
				"error",
				"unix"
		],
		"quotes": [
				"error",
				"single"
		],
		"semi": [
				"error",
				"never"
		]
  },
};
