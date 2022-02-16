# FW alerts Microservice

This repository is the node skeleton microservice to create node microservice for WRI API

## Dependencies

The FW alerts microservice is built using [Node.js](https://nodejs.org/en/), and can be executed using Docker.

Execution using Docker requires:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Dependencies on other Microservices:
- [GFW Areas](https://github.com/gfw-api/gfw-area)
- [GLAD analysis athena](https://github.com/gfw-api/glad-analysis-tiled)

## Getting started

Start by cloning the repository from github to your execution environment

```
git clone https://github.com/wri/fw_alerts.git && cd fw-alerts
```

After that, follow one of the instructions below:

### Using Docker

1 - Execute the following command to run Docker:

```shell
make up-and-build   # First time building Docker or you've made changes to the Dockerfile
make up             # When Docker has already been built and you're starting from where you left off
```

The endpoints provided by this microservice should now be available: [localhost:4201](http://localhost:4201)

2 - Run the following command to lint the project:

```shell
make lint
```

3 - To close Docker:

```shell
make down
```

## Testing

### Using Docker

Follow the instruction above for setting up the runtime environment for Docker execution, then run:
```shell
make test-and-build
```

## Quick Overview

### Endpoints available

* /:datasetSlug/:geostoreId Get the alerts grouped by geohash precision 8 for GLAD or VIIRS

#### Query params
* `days` from now with the following default values:
    * GLAD: 365 (last year)
    * VIIRS: 7 (last data available)
* `output` json by default but also allowed csv format
* `precision` geohash precision to group by
