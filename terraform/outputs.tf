output "security_group_id" {
  value = aws_security_group.ec2_web.id
}

output "api_public_ip" {
  value = aws_instance.api.public_ip
}

output "thread_public_ip" {
  value = aws_instance.thread.public_ip
}

output "sender_public_ip" {
  value = aws_instance.sender.public_ip
}

output "db_public_ip" {
  value = aws_instance.db.public_ip
}
