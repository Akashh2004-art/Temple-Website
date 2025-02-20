import app from './app';
import { config } from './config/env.config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `🚀 Server running on port ${PORT}`);
  console.log('\x1b[33m%s\x1b[0m', `📊 MongoDB connected`);
  console.log('\x1b[36m%s\x1b[0m', `🌐 Environment: ${process.env.NODE_ENV}`);
});