// SSH key
resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "deployer" {
  key_name   = var.ssh_key_name
  public_key = tls_private_key.key.public_key_openssh
}

resource "local_file" "private_key" {
  content         = tls_private_key.key.private_key_pem
  filename        = "${path.module}/${aws_key_pair.deployer.key_name}.pem"
  file_permission = "0600"
}

// Security Group
resource "aws_security_group" "ec2_web" {
  name        = "${var.aws_instance_name}-security"
  description = "Open port for different instances"
  vpc_id      = var.vpc_id

  ingress {
    description = "Thread"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Sender"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "API"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "DB"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Sortant illimite (MAJ/apt, pull images, etc.)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.aws_instance_name}-security" }
}

// Locals
locals {
  sg_id = aws_security_group.ec2_web.id
  key   = aws_key_pair.deployer.key_name
}

// Instance EC2 DB
resource "aws_instance" "db" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.aws_instance_type
  key_name               = local.key
  vpc_security_group_ids = [local.sg_id]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              yum update -y
              amazon-linux-extras install -y docker
              usermod -aG docker ec2-user

              POSTGRES_USER=admin
              POSTGRES_PASSWORD=password
              POSTGRES_DB=forum_db

              sudo systemctl enable docker
              sudo systemctl start docker
              docker rm -f db || true
              docker pull postgres:15 || true
              docker run -d --name db --restart always \
                -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
                -e POSTGRES_USER="$POSTGRES_USER" \
                -e POSTGRES_DB="$POSTGRES_DB" \
                -p 5432:5432 \
                -v /var/lib/postgresql/data:/var/lib/postgresql/data \
                postgres:15
              EOF

  tags = {
    Name = "${var.aws_instance_name}-db"
    Role = "db"
  }
}

// Instance EC2 API
resource "aws_instance" "api" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.aws_instance_type
  key_name               = local.key
  vpc_security_group_ids = [local.sg_id]

  depends_on = [aws_instance.db]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              yum update -y
              amazon-linux-extras install -y docker
              usermod -aG docker ec2-user

              IMAGE="ghcr.io/lucasmadranges/forum/api:latest"
              DB_URL="http://${aws_instance.db.public_ip}:5173"

              sudo systemctl enable docker
              sudo systemctl start docker
              docker rm -f api
              echo "${var.ghcr_token}" | docker login ghcr.io -u lucasmadranges --password-stdin
              docker pull "$IMAGE"
              docker run -d --name api --restart always \
                -p 80:80 \
                -e DB_URL="$DB_URL" \
                "$IMAGE"

              EOF

  tags = {
    Name = "${var.aws_instance_name}-api"
    Role = "api"
  }
}

// Instance EC2 THREAD
resource "aws_instance" "thread" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.aws_instance_type
  key_name               = local.key
  vpc_security_group_ids = [local.sg_id]

  // If doesn't exist
  // key_name               = aws_key_pair.deployer.key_name
  // vpc_security_group_ids = [aws_security_group.ec2_web.id]

  depends_on = [aws_instance.api]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              yum update -y
              amazon-linux-extras install -y docker
              usermod -aG docker ec2-user

              IMAGE="ghcr.io/lucasmadranges/forum/thread:latest"
              API_URL="http://${aws_instance.api.public_ip}:3000"

              sudo systemctl enable docker
              sudo systemctl start docker
              docker rm -f thread
              echo "${var.ghcr_token}" | docker login ghcr.io -u lucasmadranges --password-stdin
              docker pull "$IMAGE"
              docker run -d --name thread --restart always \
                -p 80:80 \
                -e VITE_API_URL="$API_URL" \
                "$IMAGE"

              EOF

  tags = {
    Name = "${var.aws_instance_name}-thread"
    Role = "thread"
  }
}

// Instance EC2 SENDER
resource "aws_instance" "sender" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.aws_instance_type
  key_name               = local.key
  vpc_security_group_ids = [local.sg_id]

  // If doesn't exist
  // key_name               = aws_key_pair.deployer.key_name
  // vpc_security_group_ids = [aws_security_group.ec2_web.id]

  depends_on = [aws_instance.api]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              yum update -y
              amazon-linux-extras install -y docker
              usermod -aG docker ec2-user

              IMAGE="ghcr.io/lucasmadranges/forum/sender:latest"
              API_URL="http://${aws_instance.api.public_ip}:3000"

              sudo systemctl enable docker
              sudo systemctl start docker
              docker rm -f sender
              echo "${var.ghcr_token}" | docker login ghcr.io -u lucasmadranges --password-stdin
              docker pull "$IMAGE"
              docker run -d --name sender --restart always \
                -p 80:80 \
                -e VITE_API_URL="$API_URL" \
                "$IMAGE"

              EOF

  tags = {
    Name = "${var.aws_instance_name}-sender"
    Role = "sender"
  }
}
