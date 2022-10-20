const logger = require("logger");
const Router = require("koa-router");
const ConverterService = require("services/converter.service");
const AlertsValidator = require("validators/alerts.validator");
const AlertsService = require("services/alerts.service");
const ErrorSerializer = require("serializers/error.serializer");
const config = require("config");

const router = new Router({
  prefix: "/alerts"
});

class AlertsRouter {
  static async getAlertsByGeostore(ctx) {
    logger.debug("Getting alerts by geostore");
    const { dataset } = ctx.params;
    const { range } = ctx.query;
    const { geostore } = ctx.params;
    const output = ctx.query.output || "json";

    if (geostore) {
      let alerts = [];
      try {
        
      } catch (err) {
        logger.error(err);
        const statusCode = err.statusCode || 500;
        ctx.body = ErrorSerializer.serializeError(statusCode, err.message);
        ctx.status = statusCode;
      }
    } else {
      ctx.body = ErrorSerializer.serializeError(404, "Geostore not found");
      ctx.status = 404;
    }
  }
}

router.get("/:geostore", AlertsValidator.get, AlertsRouter.getAlertsByGeostore);

module.exports = router;
