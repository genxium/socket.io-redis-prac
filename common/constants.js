'use-strict';

const IS_DEVELOPMENT = (undefined == process.env.NODE_ENV || null == process.env.NODE_ENV || '' == process.env.NODE_ENV || 'development' == process.env.NODE_ENV);
exports.IS_DEVELOPMENT = IS_DEVELOPMENT;

const IS_TESTING = (IS_DEVELOPMENT && "true" == process.env.TESTING);
exports.IS_TESTING = IS_TESTING;

const IS_STRESS_TESTING = (IS_TESTING && "true" == process.env.STRESS_TESTING);
exports.IS_STRESS_TESTING = IS_STRESS_TESTING;

const NOT_IN_PRODUCTION = ('production' != process.env.NODE_ENV);
exports.NOT_IN_PRODUCTION = NOT_IN_PRODUCTION;

const REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^\+?[0-9]{8,14}$/,
  LNG_LAT_TEXT: /^[0-9]+(\.[0-9]{4,6})$/,
  SEO_KEYWORD: /^.{2,50}$/,
  PASSWORD: /^.{6,50}$/,

  PRICE_CURRENCY: /^[0-9]{1}$/,
  PRICE_VALUE_CENTS: /^[0-9]+$/,

  KEYWORD: /^[^\n\t]{2,20}$/,
};

exports.REGEX = REGEX;

// TODO: Groom the following "RET_CODE" to be consistent with the product into which will be embedded.
exports.RET_CODE = {
  OK: 1000,
  FAILURE: 1001,

  DUPLICATED_PHONE_NUM: 2002,
  TOKEN_EXPIRED: 2003,
  INCORRECT_CAPTCHA: 2007,
  INVALID_EMAIL_LITERAL: 2008,
  INCORRECT_PHONE_COUNTRY_CODE_OR_NUMBER: 2011,

  INSUFFICIENT_MEM_TO_ALLOCATE_CONNECTION: 3001,

  CAPTCHA_GENERATION_PER_PHONE_TOO_FREQUENTLY: 4001,

  NOT_IMPLEMENTED_YET: 65535,
};

const ROUTE_PATHS = {
  ROOT: "/",
  BASE: "",

  API_V1: "/v1",

  LIST: "/list",
  RET_CODE: "/retCode",
  REGEX: "/regex"
};

exports.ROUTE_PATHS = ROUTE_PATHS;

const ROUTE_PARAMS = {
  API_VER: "/v:version",
};

exports.ROUTE_PARAMS = ROUTE_PARAMS;
