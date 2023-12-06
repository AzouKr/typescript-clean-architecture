import config from "config";

const productionlog = require("./production.logger")

let logger = null;

// if (<string>config.get("NODE_ENV") === "Production") {
//     logger = productionlog()
// }

    logger = productionlog()

export default <any>logger;