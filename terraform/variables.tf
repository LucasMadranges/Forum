variable "aws_region" {
  default     = "eu-central-1"
  type        = string
  description = "Région AWS pour le déploiement"
}

variable "aws_s3" {
  default     = "bucket-lucasmdr"
  type        = string
  description = "Nom du bucket S3"
}

variable "vpc_id" {
  description = "ID du VPC existant où créer le Security Group"
  type        = string
  default     = "vpc-0c896c57e26844c55"
}

variable "aws_instance_type" {
  description = "Type d'instance"
  type        = string
  default     = "t2.nano"

  validation {
    condition = contains(
      ["t2.nano", "t2.micro", "t3.nano", "t3.micro"],
      var.aws_instance_type
    )
    error_message = "instance_type doit être l’un de: t2.nano, t2.micro, t3.nano, t3.micro."
  }
}

variable "aws_instance_name" {
  default     = "lucasmdr-forum"
  type        = string
  description = "Nom des instances"
}

variable "ami_id" {
  description = "AMI Ubuntu"
  type        = string
  default     = "ami-0bcffb19cf767c618"
}

variable "ssh_key_name" {
  description = "Nom de la clé SSH existante pour l'accès aux EC2"
  type        = string
  default     = "lucasmdr-ssh-key"
}
