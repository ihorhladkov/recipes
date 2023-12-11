export const validation = {
  nameValidation: {
    required: "This name is requierd.",
    pattern: {
      value: /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/g,
      message: "Name must contain only English letters",
    },
    minLength: {
      value: 3,
      message: "Must have at list 3 letters",
    },
  },
  authorNameValidation: {
    required: "This author name is requierd.",
    pattern: {
      value: /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/g,
      message: "Author name must contain only English letters",
    },
    minLength: {
      value: 3,
      message: "Must have at list 3 letters",
    },
  },
  shortDescriptionValidation: {
    required: "This short description is requierd.",
    pattern: {
      value: /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/g,
      message: "Description must contain only English letters.",
    },
    minLength: {
      value: 10,
      message: "Must have at list 20 letters.",
    },
  },
  fullDescriptionValidation: {
    required: "This full description is requierd.",
    pattern: {
      value: /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/g,
      message: "Description must contain only English letters.",
    },
    minLength: {
      value: 10,
      message: "Must have at list 20 letters.",
    },
  },
  comboboxValidation: {
    required: "Ingredients are required.",
    minLength: {
      value: 3,
      message: "Must contain at list 3 items.",
    },
  },
};
