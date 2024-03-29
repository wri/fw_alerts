variable "project_prefix" {
  type = string
  default = "fw-alerts"
}

variable "environment" {
  type        = string
  description = "An environment namespace for the infrastructure."
}

variable "region" {
  default = "us-east-1"
  type    = string
}

variable "container_port" {
  default = 80
  type    = number
}
variable "logger_level" {
  type = string
}
variable "log_retention" {
  type    = number
  default = 30
}
variable "desired_count" {
  type = number
}
variable "fargate_cpu" {
  type    = number
  default = 256
}
variable "fargate_memory" {
  type    = number
  default = 512
}
variable "auto_scaling_cooldown" {
  type    = number
  default = 300
}
variable "auto_scaling_max_capacity" {
  type = number
}
variable "auto_scaling_max_cpu_util" {
  type    = number
  default = 75
}
variable "auto_scaling_min_capacity" {
  type = number
}

variable "git_sha" {
  type = string
}

variable "node_path" {
  type = string
  default = "app/src"
}
variable "node_env" {
  type = string
}
variable "suppress_no_config_warning" {
  type = string
}
variable "control_tower_url" {
  type = string
  default = "https://api.resourcewatch.org"
}
variable "glad_alerts_api_url" {
  type = string
  default = "https://api.resourcewatch.org"
}
variable "healthcheck_path" {
  type = string
}
variable "healthcheck_sns_emails" {
  type = list(string)
}
variable "alerts_api_url" {
  type    = string
  default = "https://data-api.globalforestwatch.org"
}