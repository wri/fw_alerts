const logger = require("logger");
const Router = require("koa-router");
const V3AlertService = require("services/V3alerts.service");
const ErrorSerializer = require("serializers/error.serializer");

const router = new Router({
  prefix: "/alerts"
});

class AlertsRouter {
  static async getAlertsByGeostore(ctx) {
    logger.debug("Getting alerts by geostore");
    let { minDate, dataset } = ctx.query;
    let { geostore } = ctx.params;

    if(!Array.isArray(dataset)) dataset = [dataset]

    if (geostore) {
      try {
        const alerts = await V3AlertService.getAlerts(dataset,geostore, minDate);
        ctx.body = alerts;
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

router.get("/:geostore", AlertsRouter.getAlertsByGeostore);

module.exports = router;
