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
