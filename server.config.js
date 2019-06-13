module.exports = {
  // URL to JSON - PHP file folder
  URL: "http://doristef.me/semester4/FinalProject/server/",
  // Needed for Unblocking Cross-Origin request
  corsURL:
    process.env.NODE_ENV === "production"
      ? ""
      : "https://cors-anywhere.herokuapp.com/"
};
