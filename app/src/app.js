const Koa = require("koa");
const cors = require("@koa/cors");
const config = require("config");
const logger = require("logger");
const koaLogger = require("koa-logger");
const validate = require("koa-validate");
const loader = require("loader");
const convert = require("koa-convert");
const ErrorSerializer = require("serializers/error.serializer");
const Sentry = require("@sentry/node");

const koaBody = require("koa-body")({
  multipart: true,
  jsonLimit: "50mb",
  formLimit: "50mb",
  textLimit: "50mb"
});
const loggedInUserService = require("./services/LoggedInUserService");

const app = new Koa();
validate(app);
app.use(cors());

/**
 * Sentry
 */
Sentry.init({
  dsn: "https://d8717108825844499688d0ff206ff9f8@o163691.ingest.sentry.io/6262383",
  environment: process.env.NODE_ENV
});

app.on("error", (err, ctx) => {
  Sentry.withScope(function (scope) {
    scope.addEventProcessor(function (event) {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });
    Sentry.captureException(err);
  });
});
/** */

app.use((ctx, next) => {
  return next().then(function () {
    ctx.set("Cache-Control", "private");
  });
});
app.use(convert(koaBody));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (inErr) {
    let error = inErr;
    try {
      error = JSON.parse(inErr);
    } catch (e) {
      logger.debug("Could not parse error message - is it JSON?: ", inErr);
      error = inErr;
    }
    ctx.status = error.status || ctx.status || 500;
    if (ctx.status >= 500) {
      Sentry.captureException(error); // send error to sentry
      logger.error(error);
    } else {
      logger.info(error);
    }

    ctx.body = ErrorSerializer.serializeError(ctx.status, error.message);
    if (process.env.NODE_ENV === "production" && ctx.status === 500) {
      ctx.body = "Unexpected error";
    }
    ctx.response.type = "application/vnd.api+json";
  }
});

app.use(koaLogger());

app.use(async (ctx, next) => {
  await loggedInUserService.setLoggedInUser(ctx, logger);
  await next();
});

loader.loadRoutes(app);

const server = app.listen(config.get("service.port"), () => {
  logger.info("Server started in ", config.get("service.port"));
});

module.exports = server;
