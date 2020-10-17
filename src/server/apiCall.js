const fetch = require("node-fetch");

module.exports.apiCall = async (text = null, url = null) => {
  const model = "general_ca";
  const apiKey = process.env.API_KEY;
  const apiurl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&${text ? `txt=${text}` : `url=${url}`}&model=${model}`;

  console.log(apiurl);

  const res = await fetch(apiurl, {
    method: "POST"
  });

  return await res.json();
};

module.exports.validateURL = () => {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  return regexp.test(url);
};
