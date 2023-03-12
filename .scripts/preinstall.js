if (process.env.npm_execpath.indexOf('pnpm') === -1) {
  console.log("\x1b[32m==================================");
  console.log('#    \x1b[33mpnpm \x1b[31mIS REQUIRED FOR USE.   \x1b[32m#');
  console.log('#    INSTALL \x1b[33mnpm i -g pnpm       \x1b[32m#');
  console.log('#    \x1b[32mRUN \x1b[33mpnpm i                  \x1b[32m#');
  console.log('#    \x1b[32mUSE \x1b[33mpnpm dev                \x1b[32m#');
  console.log("\x1b[32m==================================");

  process.exit(1);
};
