'use-strict';

const IS_DEBUGGING = (undefined == process.env.NODE_ENV || null == process.env.NODE_ENV || '' == process.env.NODE_ENV || 'development' == process.env.NODE_ENV);
exports.IS_DEBUGGING = IS_DEBUGGING;

const IS_STAGING = ('staging' == process.env.NODE_ENV);
exports.IS_STAGING = IS_STAGING;

const NOT_IN_PRODUCTION = ('production' != process.env.NODE_ENV);
exports.NOT_IN_PRODUCTION = NOT_IN_PRODUCTION;

const PORT = (NOT_IN_PRODUCTION ? (IS_STAGING ? 8008 : 9099) : 8080);
exports.PORT = PORT;
exports.HTTP_PROTO = (NOT_IN_PRODUCTION ? 'http' : 'https');
exports.HTTP_PORT = ":" + PORT;

exports.MAGIC_CONSTS = {
}

const REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^\+?[0-9]{8,14}$/,
  STREET_META: /^.{5,100}$/,
  LNG_LAT_TEXT: /^[0-9]+(\.[0-9]{4,6})$/,
  SEO_KEYWORD: /^.{2,50}$/,
  PASSWORD: /^.{6,50}$/,

  ADMIN_HANDLE: /^.{4,50}$/,

  POLICE_HANDLE: /^.{6,50}$/,
  POLICE_DISPLAY_NAME: /^.{3,100}$/,

  PRICE_CURRENCY: /^[0-9]{1}$/,
  PRICE_VALUE_CENTS: /^[0-9]+$/,

  KEYWORD: /^[^\n\t]{2,20}$/,
};

exports.REGEX = REGEX;

exports.RET_CODE = {
  OK: 1000,
  FAILURE: 1001,

  DUPLICATED: 2002,
  TOKEN_EXPIRED: 2003,
  INCORRECT_HANDLE: 2004,
  NONEXISTENT_HANDLE: 2005,
  INCORRECT_PASSWORD: 2006,
  INCORRECT_CAPTCHA: 2007,
  INVALID_EMAIL_LITERAL: 2008,
  NO_ASSOCIATED_EMAIL: 2009,
  SEND_EMAIL_TIMEOUT: 2010,
  INCORRECT_PHONE_COUNTRY_CODE_OR_NUMBER: 2011,

  INSUFFICIENT_MEM_TO_ALLOCATE_CONNECTION: 3001,

  PASSWORD_RESET_CODE_GENERATION_PER_EMAIL_TOO_FREQUENTLY: 4000,
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
