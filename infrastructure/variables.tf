variable "aws_region" { type = string  default = "eu-center-1" }
variable "project_name" { type = string default = "forum" }
variable "key_pair_name" { type = string }
variable "instance_type" { type = string default = "t3.small" }
variable "allowed_ssh_cidr" { type = string default = "0.0.0.0/0" }
