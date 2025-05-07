const dev = "http://13.127.101.193:8080";
const prod = "http://13.127.101.193:8080";

export const basedURL =
  window.location.hostname.split(":")[0] === "localhost" ||
  window.location.hostname.includes("192")
    ? dev
    : prod;
