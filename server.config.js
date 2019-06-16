module.exports = {
  // URL to JSON - PHP file folder
  URL: "", // URL to the /server/ folder, that contains JSON and PHP files!
  // Needed for Unblocking Cross-Origin request
  corsURL:
    process.env.NODE_ENV === "production"
      ? ""
      : "https://cors-anywhere.herokuapp.com/"
};
