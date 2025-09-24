variable "aws_region" { type = string  default = "eu-west-3" }
variable "project_name" { type = string default = "forum" }
variable "key_pair_name" { type = string } // clé EC2 existante ou à créer
variable "instance_type" { type = string default = "t3.small" }
variable "allowed_ssh_cidr" { type = string default = "0.0.0.0/0" } // à restreindre
