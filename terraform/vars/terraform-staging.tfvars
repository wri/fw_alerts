environment               = "staging"
logger_level                 = "info"
desired_count             = 1
auto_scaling_min_capacity = 1
auto_scaling_max_capacity = 15

container_port = 4200
node_path = "app/src"
node_env = "staging"
suppress_no_config_warning = "true"
control_tower_url = "https://staging-api.resourcewatch.org"
glad_alerts_api_url = "https://staging-api.resourcewatch.org/v1"

healthcheck_path = "/v1/fw_alerts/healthcheck"
healthcheck_sns_emails = ["server@3sidedcube.com"]