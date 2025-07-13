module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
  swSrc: "service-worker.js", // ya no está en public
  swDest: "dist/service-worker.js",
  maximumFileSizeToCacheInBytes: 5000000,
};