resource "aws_s3_bucket" "tf_state" {
  bucket = var.aws_s3
}

// Security Group
resource "aws_security_group" "ec2_web" {
  name        = "${var.aws_instance_name}-security"
  description = "Acces HTTP/HTTPS/SSH"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH (a restreindre a votre IP)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // remplace par ["<ton_ip>/32"]
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

// Instance EC2 API
resource "aws_instance" "api" {
  ami                    = var.ami_id
  instance_type          = var.aws_instance_type
  key_name               = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.ec2_web.id]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              chmod a+r /etc/apt/keyrings/docker.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
              systemctl enable docker
              systemctl start docker

              docker run -d --name api --restart always -p 8080:8080 myregistry.example.com/forum/api:latest
              EOF

  tags = {
    Name = "${var.aws_instance_name}-api"
    Role = "api"
  }
}

// Instance EC2 THREAD
resource "aws_instance" "thread" {
  ami                    = var.ami_id
  instance_type          = var.aws_instance_type
  key_name               = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.ec2_web.id]

  user_data = <<-EOF
              #!/bin/bash
              set -eux

              # Install Docker
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              chmod a+r /etc/apt/keyrings/docker.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
              systemctl enable docker
              systemctl start docker

              # Pull & run le front Sender
              IMAGE="ghcr.io/lucasmadranges/forum/sender:latest"
              API_URL="http://lucasmdr-forum-api:5432"

              docker pull "$IMAGE" || true
              docker rm -f sender || true
              docker run -d --name sender --restart always \
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
  ami                    = var.ami_id
  instance_type          = var.aws_instance_type
  key_name               = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.ec2_web.id]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              chmod a+r /etc/apt/keyrings/docker.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
              systemctl enable docker
              systemctl start docker

              docker run -d --name sender --restart always -p 80:80 myregistry.example.com/forum/sender:latest
              EOF

  tags = {
    Name = "${var.aws_instance_name}-sender"
    Role = "sender"
  }
}

// Instance EC2 DB
resource "aws_instance" "db" {
  ami                    = var.ami_id
  instance_type          = var.aws_instance_type
  key_name               = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.ec2_web.id]

  user_data = <<-EOF
              #!/bin/bash
              set -eux
              apt-get update -y
              apt-get install -y ca-certificates curl gnupg
              install -m 0755 -d /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
              chmod a+r /etc/apt/keyrings/docker.gpg
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
              systemctl enable docker
              systemctl start docker

              docker run -d --name db --restart always -e POSTGRES_PASSWORD=changeme -p 5432:5432 postgres:15
              EOF

  tags = {
    Name = "${var.aws_instance_name}-db"
    Role = "db"
  }
}
