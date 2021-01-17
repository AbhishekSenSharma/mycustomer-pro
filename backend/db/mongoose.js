const mongoose = require('mongoose');
const logger = require("../utils/logger");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
  logger.info("Connected to database!");
})
.catch(() => {
  logger.error("Connection failed!");
});
