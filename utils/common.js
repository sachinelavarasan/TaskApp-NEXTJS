export const validateAllOnces = (fields) => {
  for (let key in fields) {
    if (fields[key] === "") {
      throw `${key} - is required`;
    }
  }
};
