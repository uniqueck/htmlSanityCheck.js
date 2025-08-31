# [1.3.0](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.2.2...v1.3.0) (2025-08-31)


### Build

* add checker for conventional commits ([9fe8346](https://github.com/uniqueck/htmlSanityCheck.js/commit/9fe83461fdebe5465df62d7a14e04115b91e72fb))
* replace sonarcloud-github-action with sonarqube-scan-action ([95ffeba](https://github.com/uniqueck/htmlSanityCheck.js/commit/95ffebaf0f9fe34f5627ff0077f1f224081f813f))

### New

* add cache for BrokenHttpLinksChecker ([c74654f](https://github.com/uniqueck/htmlSanityCheck.js/commit/c74654f08f18552c97c142d35a9053d6a461ad17))

## [1.2.2](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.2.1...v1.2.2) (2025-03-01)


### Build

* Bump elliptic from 6.5.7 to 6.6.1 ([2e114da](https://github.com/uniqueck/htmlSanityCheck.js/commit/2e114da760cfbc59ea1957c237f560476ead0aee))
* Bump sinon from 16.1.3 to 19.0.2 ([10ef8fa](https://github.com/uniqueck/htmlSanityCheck.js/commit/10ef8faf73dcff2f7dfee4d6e556a0ffc32ef74c))

### fix

* reduce info logs ([9133503](https://github.com/uniqueck/htmlSanityCheck.js/commit/91335035422750869aa1411c3582194fbb4cc28e)), closes [#46](https://github.com/uniqueck/htmlSanityCheck.js/issues/46)

### Fix

* file name for JunitXmlReporter #50 ([d01843d](https://github.com/uniqueck/htmlSanityCheck.js/commit/d01843da00e922739efad0a0d167628be1de5380)), closes [#50](https://github.com/uniqueck/htmlSanityCheck.js/issues/50)

## [1.2.1](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.2.0...v1.2.1) (2024-10-03)


### Fix

* Pass configFile to loadConfig method for config rc files ([2def7da](https://github.com/uniqueck/htmlSanityCheck.js/commit/2def7da7891f3b839490603aafea4d56a657cb7f))

# [1.2.0](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.1.0...v1.2.0) (2024-10-02)


### Build

* Add SonarCloud analyze (fixes #23) ([d1347e3](https://github.com/uniqueck/htmlSanityCheck.js/commit/d1347e3e11edf3e5f02c2aff02c31fca6dbbb499)), closes [#23](https://github.com/uniqueck/htmlSanityCheck.js/issues/23)
* Allow to bypass branch protection rules for semantic release process ([6103b7c](https://github.com/uniqueck/htmlSanityCheck.js/commit/6103b7c3c92a31d59104d16c5eeae5ca7f979af8))
* Bump @cucumber/cucumber from 10.8.0 to 10.9.0 ([06d3c9e](https://github.com/uniqueck/htmlSanityCheck.js/commit/06d3c9e0bb9671aacdb3b0a2a08f358cb7d1af14))
* Bump chai from 4.2.0 to 4.5.0 ([6a18130](https://github.com/uniqueck/htmlSanityCheck.js/commit/6a18130564bdde2aaa466b277833c2d4cbe679d6))
* Bump elliptic from 6.5.5 to 6.5.7 ([734b043](https://github.com/uniqueck/htmlSanityCheck.js/commit/734b0430cb2918b1424a8e01071d02bb166df13a))
* Bump mocha from 10.6.0 to 10.7.3 ([90ec549](https://github.com/uniqueck/htmlSanityCheck.js/commit/90ec5491eaca1e389154f25ce333341b60b3e91c))
* Bump semantic-release from 24.0.0 to 24.1.0 ([970c47d](https://github.com/uniqueck/htmlSanityCheck.js/commit/970c47dfb002eba2fe358022d7c27496b6b1109f))
* Fix semantic release configuration ([2e03790](https://github.com/uniqueck/htmlSanityCheck.js/commit/2e03790f30b0a9444ae3ba5ed18e2ca37f903669))

### Docs

* Add Badge for OpenSSF ScoreCard ([e441642](https://github.com/uniqueck/htmlSanityCheck.js/commit/e4416420cb6316f0a7b0fb7d3b6a25f1fd4f1c36)), closes [#27](https://github.com/uniqueck/htmlSanityCheck.js/issues/27)
* Add License ([3031ed2](https://github.com/uniqueck/htmlSanityCheck.js/commit/3031ed2a68e3c777ffd1f85f266a37ea4cd6a76c)), closes [#26](https://github.com/uniqueck/htmlSanityCheck.js/issues/26)
* Add OpenSSF Best Practice Badge ([6178b08](https://github.com/uniqueck/htmlSanityCheck.js/commit/6178b0875e151318acc93b728eb2753f0b2cb2a3)), closes [#37](https://github.com/uniqueck/htmlSanityCheck.js/issues/37)

### New

* Implement JUnitXMLReporter ([f3e5705](https://github.com/uniqueck/htmlSanityCheck.js/commit/f3e5705bc68b05788beb6021a5931c77e2424a86)), closes [#1](https://github.com/uniqueck/htmlSanityCheck.js/issues/1)

### Upgrade

* Bump yargs-parser from 20.2.9 to 21.1.1 ([59c50a7](https://github.com/uniqueck/htmlSanityCheck.js/commit/59c50a7ac5ded4a6030a268c0a25d3bb4ab12507))

# [1.1.0](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.0.4...v1.1.0) (2024-08-17)


### New

* Implement BrokenCrossReferencesChecker (fixes #20) ([7259ebe](https://github.com/uniqueck/htmlSanityCheck.js/commit/7259ebeab3170b4793a074e324acd8b1072c2676)), closes [#20](https://github.com/uniqueck/htmlSanityCheck.js/issues/20)

## [1.0.4](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.0.3...v1.0.4) (2024-08-07)


### Fix

* Pass httpConnectionTimeout option to XmlHttpRequest ([f736f3b](https://github.com/uniqueck/htmlSanityCheck.js/commit/f736f3b2b8c84f02abf2b12bb3135033eca8b61b))

## [1.0.3](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.0.2...v1.0.3) (2024-08-07)


### Fix

* return empty title if no head title element is found (#16) ([f6c34e4](https://github.com/uniqueck/htmlSanityCheck.js/commit/f6c34e4a2c1a037fc21bccb19008351159d97de1)), closes [#16](https://github.com/uniqueck/htmlSanityCheck.js/issues/16)

## [1.0.2](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.0.1...v1.0.2) (2024-08-07)


### Fix

* find all files in a directory (#14) ([51b43ff](https://github.com/uniqueck/htmlSanityCheck.js/commit/51b43ff89c00fd0b60d47afb1efb22322b438761)), closes [#14](https://github.com/uniqueck/htmlSanityCheck.js/issues/14)

## [1.0.1](https://github.com/uniqueck/htmlSanityCheck.js/compare/v1.0.0...v1.0.1) (2024-07-30)


### Fix

* Rename binary script and add extension *.js (fixes #2) ([67c6b04](https://github.com/uniqueck/htmlSanityCheck.js/commit/67c6b04a67caa17c0ecfff26c1b2637141c03dbf)), closes [#2](https://github.com/uniqueck/htmlSanityCheck.js/issues/2)

# 1.0.0 (2024-07-29)


### Build

* Configure semantic release process ([732b55b](https://github.com/uniqueck/htmlSanityCheck.js/commit/732b55b544d517a0a28f85295c1d38b0415e673d))
* setup release process and dependabot (fixes #3) ([598e3c0](https://github.com/uniqueck/htmlSanityCheck.js/commit/598e3c01f28f7a2a4126a8dc10a860c9aa74c69a)), closes [#3](https://github.com/uniqueck/htmlSanityCheck.js/issues/3)

### New

* initial port from HtmlSanityCheck project ([3a8b26d](https://github.com/uniqueck/htmlSanityCheck.js/commit/3a8b26de8766c2c42c22fceb8d583fc3f011d3c2))
