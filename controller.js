const { updateAncestorTopicsNames } = require("./services");

const getUpdatedAncestors = async (name, post) => {
  return await updateAncestorTopicsNames(name, post);
};

module.exports = { getUpdatedAncestors };
