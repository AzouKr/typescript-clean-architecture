const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, json } = format;

const productionLogger = () => {
    
  const ProdFormat = printf(({ level, message, timestamp }: {level: string, message: string, timestamp: Date}) => {
    return `${timestamp} [${level}]  ${message}`;
  });

    return createLogger({
        level: 'debug',
        format: combine(
            format.colorize(),
            timestamp({format: "HH:mm:ss"}),
            ProdFormat
          ),
    
        transports: [
            new transports.Console(),
            new transports.File({
                filename: 'errors.log',
                
              })
        ],
      });
}

  module.exports = productionLogger;