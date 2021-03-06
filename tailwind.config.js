module.exports = {
  theme: {
    inset: {
      "0": "0",
      "2": "0.5rem",
      "4": "1rem",
      "8": "2rem",
      "1/2": "50%",
      auto: "auto",
    },
    minHeight: {
      "40": "10rem",
      screen: "100vh",
    },
    filter: {},
    backdropFilter: {
      none: "none",
      blur: "blur(10px)",
    },
    extend: {
      width: {
        posts: "calc(100% - 346px)",
        navi: "300px",
        search: "400px",
        "1/2-8": "calc(50% - 1rem)",
      },
      inset: {
        "100+1": "calc(100% + 1px)",
      },
    },
  },
  variants: {
    backgroundColor: ["disabled"],
    cursor: ["disabled"],
    filter: ["responsive"], // defaults to ['responsive']
    backdropFilter: ["responsive"], // defaults to ['responsive']
  },
  plugins: [require("tailwindcss-filters")],
}
