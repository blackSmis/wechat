module.exports =
/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
				/******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
				/******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
			/******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
				/******/
}
			/******/
};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
				/******/
}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
			/******/
};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
			/******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
			/******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
		/******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

				"use strict";


				Object.defineProperty(exports, "__esModule", { value: true });
				exports.diff = function (old, newVal) {
					if (!old && newVal || old && !newVal) return true;
					for (var k in newVal) {
						if (old[k] !== newVal[k]) return true;
					}
					for (var _k in old) {
						if (old[_k] !== newVal[_k]) return true;
					}
					return false;
				};
				exports.diffObject = function (old, newVal) {
					if (!old && newVal) return newVal;
					if (!newVal && old) return old;
					var diffObj = {};
					var isDiff = false;
					for (var k in newVal) {
						if (old[k] !== newVal[k]) {
							isDiff = true;
							diffObj[k] = newVal[k];
						}
					}
					for (var _k2 in old) {
						if (old[_k2] !== newVal[_k2]) {
							isDiff = true;
							diffObj[_k2] = newVal[_k2];
						}
					}
					return isDiff ? diffObj : null;
				};

				/***/
}),
/* 1 */,
/* 2 */
/***/ (function (module, exports, __webpack_require__) {

				"use strict";


				Object.defineProperty(exports, "__esModule", { value: true });
				var form_validator_1 = __webpack_require__(3);
				var object_1 = __webpack_require__(0);
				function linked(target) {
					if (target.data.prop) {
						this.data.formItems[target.data.prop] = target;
					}
					if (target.setInForm) {
						target.setInForm();
					}
					if (!this.data.firstItem) {
						this.data.firstItem = target;
					}
					if (target !== this.data.firstItem) { }
				}
				function unlinked(target) {
					if (target.data.prop) {
						delete this.data.formItems[target.data.prop];
					}
				}
				Component({
					properties: {
						models: {
							type: Object,
							value: {},
							observer: '_modelChange'
						},
						rules: {
							type: Array,
							value: [],
							observer: '_rulesChange'
						},
						extClass: {
							type: Boolean,
							value: ''
						}
					},
					data: {
						errors: {},
						formItems: {},
						firstItem: null
					},
					relations: {
						'../cell/cell': {
							type: 'descendant',
							linked: linked,
							unlinked: unlinked
						},
						'../checkbox-group/checkbox-group': {
							type: 'descendant',
							linked: linked,
							unlinked: unlinked
						}
					},
					attached: function attached() {
						this.initRules();
						this.formValidator = new form_validator_1.default(this.data.models, this.data.newRules);
					},

					methods: {
						initRules: function initRules(rules) {
							var newRules = {};
							(rules || this.data.rules).forEach(function (rule) {
								if (rule.name && rule.rules) {
									newRules[rule.name] = rule.rules || [];
								}
							});
							this.setData({ newRules: newRules });
							return newRules;
						},
						_modelChange: function _modelChange(newVal, oldVal, path) {
							var _this = this;

							if (!this.isInit) {
								this.isInit = true;
								return newVal;
							}
							this.formValidator.setModel(newVal);
							this.isInit = true;
							var diffObj = object_1.diffObject(oldVal, newVal);
							if (diffObj) {
								(function () {
									var isValid = true;
									var errors = [];
									var errorMap = {};

									var _loop = function _loop(k) {
										_this.formValidator.validateField(k, diffObj[k], function (isValided, error) {
											if (error && error[k]) {
												errors.push(error[k]);
												errorMap[k] = error[k];
											}
											isValid = isValided;
										});
									};

									for (var k in diffObj) {
										_loop(k);
									}
									_this._showErrors(diffObj, errorMap);
									_this.triggerEvent(isValid ? 'success' : 'fail', isValid ? { trigger: 'change' } : { errors: errors, trigger: 'change' });
								})();
							}
							return newVal;
						},
						_rulesChange: function _rulesChange(newVal) {
							var newRules = this.initRules(newVal);
							if (this.formValidator) {
								this.formValidator.setRules(newRules);
							}
							return newVal;
						},
						_showAllErrors: function _showAllErrors(errors) {
							for (var k in this.data.newRules) {
								this._showError(k, errors && errors[k]);
							}
						},
						_showErrors: function _showErrors(objs, errors) {
							for (var k in objs) {
								this._showError(k, errors && errors[k]);
							}
						},
						_showError: function _showError(prop, error) {
							var formItem = this.data.formItems[prop];
							if (formItem && formItem.data.showError) {
								formItem.setError(error);
							}
						},
						validate: function validate(cb) {
							var _this2 = this;

							return this.formValidator.validate(function (isValid, errors) {
								_this2._showAllErrors(errors);
								var handleError = _this2.handleErrors(errors);
								_this2.triggerEvent(isValid ? 'success' : 'fail', isValid ? { trigger: 'validate' } : { errors: handleError, trigger: 'validate' });
								cb && cb(isValid, handleError);
							});
						},
						validateField: function validateField(name, value) {
							var _this3 = this;

							var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (v) {
								var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
							};

							return this.formValidator.validateField(name, value, function (isValid, errors) {
								_this3._showError(name, errors);
								var handleError = _this3.handleErrors(errors);
								_this3.triggerEvent(isValid ? 'success' : 'fail', isValid ? { trigger: 'validate' } : { errors: handleError, trigger: 'validate' });
								cb && cb(isValid, handleError);
							});
						},
						handleErrors: function handleErrors(errors) {
							if (errors) {
								var newErrors = [];
								this.data.rules.forEach(function (rule) {
									if (errors[rule.name]) {
										errors.name = rule.name;
										newErrors.push(errors[rule.name]);
									}
								});
								return newErrors;
							}
							return errors;
						},
						addMethod: function addMethod(ruleName, method) {
							return this.formValidator.addMethod(ruleName, method);
						}
					}
				});
				exports.default = form_validator_1.default;

				/***/
}),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

				"use strict";


				function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

				Object.defineProperty(exports, "__esModule", { value: true });
				var validator_1 = __webpack_require__(4);
				var object_1 = __webpack_require__(0);
				var toString = Object.prototype.toString;
				var validateSingleRule = function validateSingleRule(rule, value) {
					var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
					var models = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

					var message = '';
					for (var ruleKey in rule) {
						if (ruleKey === 'validator' || ruleKey === 'name' || ruleKey === 'message') continue;
						var validateMethod = typeof rule.validator !== 'undefined' ? rule.validator : validator_1.default[ruleKey];
						/**
						 * 此处添加 !!rule[ruleKey] 的判断，是为了可以通过 rule 的值来控制验证开关。
						 * 如：required: true 则开启验证必填；required: false 则关闭验证必填。
						 */
						if (!!rule[ruleKey] && typeof validateMethod === 'function') {
							message = validateMethod({ name: rule.name, message: rule.message }, value, param, models);
							if (message) {
								return message;
							}
						}
					}
					return message;
				};

				var FormValidator = function () {
					function FormValidator(models, rules) {
						_classCallCheck(this, FormValidator);

						this.models = models;
						this.rules = rules;
						this.errors = {};
					}

					FormValidator.prototype.validate = function validate(cb) {
						var _this = this;

						return new Promise(function (resolve) {
							var fieldCount = 0;
							var failCount = 0;
							var errors = _this.errors;
							var models = _this.models;
							var errorChanged = false;

							var _loop = function _loop(k) {
								(function (fieldName) {
									var oldError = errors[fieldName];
									_this._innerValidateField(k, models[fieldName], function (valid, newError) {
										fieldCount++;
										if (!valid) failCount++;
										if (object_1.diff(oldError, newError)) {
											errors[fieldName] = newError;
											errorChanged = true;
										}
									});
								})(k);
							};

							for (var k in _this.rules) {
								_loop(k);
							}
							if (errorChanged) { }
							var keys = Object.keys(errors);
							keys.forEach(function (key) {
								if (!errors[key]) delete errors[key];
							});
							resolve({ isValid: !failCount, errors: failCount ? errors : undefined });
							cb && cb(!failCount, failCount ? errors : undefined);
						});
					};

					FormValidator.prototype.validateField = function validateField(name, value) {
						var _this2 = this;

						var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (v) {
							var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
						};

						return new Promise(function (resolve) {
							_this2._innerValidateField(name, value, function (valid, error) {
								var errObj = {};
								errObj[name] = error;
								resolve({ valid: valid, error: valid ? undefined : error });
								cb(valid, valid ? undefined : errObj);
								var oldError = _this2.errors[name];
								var errorChanged = object_1.diff(oldError, error);
								if (errorChanged) {
									if (!error) delete _this2.errors[name];
									_this2.errors[name] = error;
								}
							});
						});
					};

					FormValidator.prototype._innerValidateField = function _innerValidateField(name, value) {
						var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (v) {
							var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
						};

						var rules = this.rules[name];
						if (!rules) {
							console.warn("[form-validtor] rule name " + name + " not exists.");
							cb(true);
							return;
						}
						if (typeof value === 'function') {
							cb = value;
							value = undefined;
						}
						var isFail = false;
						var models = this.models;
						if (toString.call(rules) === '[object Array]') {
							/**
							 * 原代码是 rules.forEach，然后在 callback 里面 return false 或 return true。
							 * 看本意是想如果field的其中一个验证出错就跳出循环。但 forEach 不是 jQuery.each，不会识别 callback 中的返回值，所以用 Array.prototype.some 来代替
							 */
							rules.some(function (rule) {
								rule.name = name;
								var resMessage = validateSingleRule(rule, value || models[name], rule.param, models);
								if (resMessage) {
									isFail = true;
									var error = resMessage ? { message: resMessage, rule: rule } : undefined;
									cb(false, error);
									return true; // 发生了 error，则立即返回
								}
								return false; // 说明没有 error
							});

							// 此处判断是否出现单个 rule 验证失败的情况，避免当失败时调用两次。
							if (!isFail) {
								cb(!isFail);
							}
						} else {
							var rule = rules;
							rule.name = name;
							var resMessage = validateSingleRule(rule, value || models[name], rule.param, models);
							var error = resMessage ? { message: resMessage, rule: rule } : undefined;
							if (resMessage) {
								isFail = true;
							}
							cb(!isFail, error);
						}
					};

					FormValidator.prototype.addMethod = function addMethod(ruleName, method) {
						validator_1.default[ruleName] = method;
					};

					FormValidator.prototype.setModel = function setModel(newModel) {
						this.models = newModel;
					};

					FormValidator.prototype.setRules = function setRules(newRules) {
						this.rules = newRules;
					};

					return FormValidator;
				}();

				exports.default = FormValidator;

				/***/
}),
/* 4 */
/***/ (function (module, exports, __webpack_require__) {

				"use strict";


				Object.defineProperty(exports, "__esModule", { value: true });
				var string_1 = __webpack_require__(5);
				var defaultMessage = {
					required: '%s必填',
					minlength: '长度最少为%s',
					maxlength: '长度最大为%s',
					rangelength: '长度在%s和%s之间',
					bytelength: '最多只能输入%s个字',
					min: '值最小为%s',
					max: '值最大为%s',
					range: '值的范围为%s和%s之间',
					mobile: '请输入正确的手机号',
					email: '请输入正确的电子邮件',
					url: '请输入正确的URL地址',
					equalTo: '值和字段%s不相等'
				};

				/**
				 * 判断一个数据是否是可选的。
				 * @return {Boolean}
				 *    true: 如果val是以下几种情况: null,undefined,'',[],{}
				 *    false: val 是不为“空”的数据
				 */
				var isOptional = function (val) {
					var isEmpty = val == undefined;

					if (!isEmpty) {
						if (val === '') {
							isEmpty = true;
						} else if (toString.call(val) === '[object Array]') {
							isEmpty = val.length == 0;
						} else if (toString.call(val) === '[object Object]' && val.constructor == Object) {
							isEmpty = Object.keys(val).length == 0;
						}
					}

					return isEmpty;
				}

				/**
				 * 此处做了2处优化：
				 * 1. 对 required 的数据验证规则做了优化，支持 null,undefined,'',[],{} 的判断。
				 * 2. 对除了 required 以外的验证规则，先判断是否有有效值。有值才继续下一步判断。
				 */
				exports.default = {
					required: function required(r, val, param, models) {
						if (isOptional(val)) return string_1.sprintf(r.message || defaultMessage.required, r.name);
					},
					minlength: function minlength(r, val, minlen) {
						if (!isOptional(val)) {
							if (val.length < minlen) return string_1.sprintf(r.message || defaultMessage.minlength, minlen);
						}
					},
					maxlength: function maxlength(r, val, maxlen) {
						if (!isOptional(val)) {
							if (val.length > maxlen) return string_1.sprintf(r.message || defaultMessage.maxlength, maxlen);
						}
					},
					rangelength: function rangelength(r, val, range) {
						if (!isOptional(val)) {
							if (val.length > range[1] || val.length < range[0]) return string_1.sprintf(r.message || defaultMessage.rangelength, range[0], range[1]);
						}
					},
					min: function min(r, val, _min) {
						if (!isOptional(val)) {
							if (val < _min) return string_1.sprintf(r.message || defaultMessage.min, _min);
						}
					},
					max: function max(r, val, _max) {
						if (!isOptional(val)) {
							if (val > _max) return string_1.sprintf(r.message || defaultMessage.max, _max);
						}
					},
					range: function range(r, val, _range) {
						if (!isOptional(val)) {
							if (val < _range[0] || val > _range[1]) return string_1.sprintf(r.message || defaultMessage.range, _range[0], _range[1]);
						}
					},
					mobile: function mobile(r, val) {
						if (!isOptional(val)) {
							val = val || '';
							if (val.length !== 11) return string_1.sprintf(r.message || defaultMessage.mobile);
						}
					},
					email: function email(r, value) {
						if (!isOptional(value)) {
							if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)) {
								return string_1.sprintf(r.message || defaultMessage.email);
							}
						}
					},
					url: function url(r, value) {
						if (!isOptional(value)) {
							if (!/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)) {
								return r.message || defaultMessage.url;
							}
						}
					},
					equalTo: function equalTo(r, value, param, models) {
						if (!isOptional(value) || !isOptional(models[param])) {
							if (value !== models[param]) return string_1.sprintf(r.message || defaultMessage.equalTo, r.name);
						}
					},
					bytelength: function bytelength(r, value, param, models) {
						if (!isOptional(value)) {
							var len = value.replace(/[^\x00-\xff]/g, '**').length;
							if (len > param) return string_1.sprintf(r.message || defaultMessage.bytelength, param);
						}
					}
				};

				/***/
}),
/* 5 */
/***/ (function (module, exports, __webpack_require__) {

				"use strict";


				Object.defineProperty(exports, "__esModule", { value: true });
				exports.sprintf = function () {
					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					var i = void 0;
					var result = args[0] || '';
					var para = void 0;
					var reg = void 0;
					var length = args.length - 1;
					if (length < 1) {
						return result;
					}
					i = 1;
					while (i < length + 1) {
						result = result.replace(/%s/, '{#' + i + '#}');
						i++;
					}
					result.replace('%s', '');
					i = 1;
					while (true) {
						para = args[i];
						if (para === undefined) {
							break;
						}
						reg = new RegExp('{#' + i + '#}', 'g');
						result = result.replace(reg, para);
						i++;
					}
					return result;
				};

				/***/
})
/******/]);