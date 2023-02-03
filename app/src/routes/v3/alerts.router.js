const logger = require("logger");
const Router = require("koa-router");
const V3AlertService = require("services/V3alerts.service");
const ErrorSerializer = require("serializers/error.serializer");
const { default: mongoose } = require("mongoose");

const router = new Router({
  prefix: "/alerts"
});

class AlertsRouter {
  static async getAlertsByGeostore(ctx) {
    logger.debug("Getting alerts by geostore");
    let { minDate, dataset } = ctx.query;
    let { geostore } = ctx.params;

    if (!geostore.match(/^[0-9A-Fa-f]+$/)) ctx.throw(400, "invalid geostore id");
    try {
      const intDate = parseInt(minDate);
      if (intDate.toString() !== minDate) throw "";
    } catch (error) {
      console.log(error);
      ctx.throw(400, "minDate must be a positive integer number of days");
    }

    if (!Array.isArray(dataset)) dataset = [dataset];

    if (geostore) {
      try {
        const alerts = await V3AlertService.getAlerts(dataset, geostore, minDate);
        ctx.body = { data: alerts };
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
