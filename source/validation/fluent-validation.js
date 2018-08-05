let errors = [];

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) { errors.push({ message }); }
};

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min) { errors.push({ message }); }
};

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max) { errors.push({ message }); }
};

ValidationContract.prototype.isFixedLen = (value, len, message) => {
  if (value.length !== len) { errors.push({ message }); }
};

ValidationContract.prototype.isEmail = (value, message) => {
  const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) { errors.push({ message }); }
};

ValidationContract.prototype.errors = () => errors;

ValidationContract.prototype.clear = () => {
  errors = [];
};

ValidationContract.prototype.isValid = () => errors.length === 0;

module.exports = ValidationContract;
