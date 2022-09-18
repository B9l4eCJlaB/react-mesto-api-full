const INTERNAL_SERVER_ERROR = 500;
const JWT_SECRET_DEFAULT = 'secret-key';
const regExpUrl = /^((https|http):\/\/)(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
const regExpId = /^[0-9a-fA-F]{24}$/;

module.exports = {
  INTERNAL_SERVER_ERROR,
  JWT_SECRET_DEFAULT,
  regExpUrl,
  regExpId,
};
