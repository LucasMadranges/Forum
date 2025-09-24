# Exemple basique : VPC + subnet public pour tests
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags       = { Name = "forum-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = var.aws_region

  tags = { Name = "forum-subnet-public" }
}

resource "aws_s3_bucket" "tf_state" {
  bucket = var.aws_s3
}
