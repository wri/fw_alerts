environment               = "production"
logger_level                 = "info"
desired_count             = 2
auto_scaling_min_capacity = 2
auto_scaling_max_capacity = 15

container_port = 4200
node_path = "app/src"
node_env = "production"
suppress_no_config_warning = "true"
control_tower_url = "https://api.resourcewatch.org"
glad_alerts_api_url = "https://api.resourcewatch.org" # ?

healthcheck_path = "/v1/fw_alerts/healthcheck"
healthcheck_sns_emails = ["server@3sidedcube.com"]