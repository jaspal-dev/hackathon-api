export default (): Record<string, unknown> => ({
  PORT: 3000,
  JWT: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
