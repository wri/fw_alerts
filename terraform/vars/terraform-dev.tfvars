environment               = "dev"
logger_level                 = "debug"
desired_count             = 1
auto_scaling_min_capacity = 1
auto_scaling_max_capacity = 5

container_port = 4200
node_env = "dev"
suppress_no_config_warning = "true"
control_tower_url = "https://staging-api.resourcewatch.org"
glad_alerts_api_url = "https://staging-api.resourcewatch.org"

healthcheck_path = "/v1/fw_alerts/healthcheck"
healthcheck_sns_emails = ["server@3sidedcube.com"]