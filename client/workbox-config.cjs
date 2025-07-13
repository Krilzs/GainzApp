module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
  swSrc: "public/service-worker.js",
  swDest: "dist/service-worker.js",
  maximumFileSizeToCacheInBytes: 5000000, // 5MB
};
