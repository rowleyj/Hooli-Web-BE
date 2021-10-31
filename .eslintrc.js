module.exports = {
	env: {
		es6: true,
		node: true,
		mocha: true
	},
	extends: [
		"airbnb-base",
	],
	plugins: [
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module"
	},
	rules: {
		"import/extensions": [0, {
			".mjs": 'never'
		}],
		quotes: 0,
		"space-before-function-paren": 0,
		"no-return-await": 0,
		"max-len": 0,
		"object-shorthand": 0,
		"comma-dangle": 0,
		"no-underscore-dangle": 0,
		"consistent-return": 0,
		"no-shadow": 0,
		"vars-on-top": 0,
		"arrow-parens": 0,
		"no-var": 0,
		"no-use-before-define": 0,
		"no-unused-expressions": 0,
		"func-names": 0,
		"no-param-reassign": 0,
		"no-plusplus": 0,
		"no-useless-escape": 0,
		"no-inner-declarations": 0,
		"block-scoped-var": 0,
		"no-redeclare": 0,
		"global-require": 0,
		"linebreak-style": 0,
		indent: ["error", "tab"],
		"no-tabs": 0,
	}
};
