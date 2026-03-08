#!/bin/bash

# VAANI EC2 Setup Script
echo "🚀 Creating EC2 Instance for VAANI Backend..."

# Create security group
echo "Creating security group..."
aws ec2 create-security-group \
    --group-name vaani-backend-sg \
    --description "Security group for VAANI backend" \
    --output json

# Add security group rules
echo "Adding security group rules..."

# SSH
aws ec2 authorize-security-group-ingress \
    --group-name vaani-backend-sg \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0

# HTTP
aws ec2 authorize-security-group-ingress \
    --group-name vaani-backend-sg \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0

# HTTPS
aws ec2 authorize-security-group-ingress \
    --group-name vaani-backend-sg \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0

# Node.js Backend
aws ec2 authorize-security-group-ingress \
    --group-name vaani-backend-sg \
    --protocol tcp \
    --port 5000 \
    --cidr 0.0.0.0/0

# FastAPI Backend
aws ec2 authorize-security-group-ingress \
    --group-name vaani-backend-sg \
    --protocol tcp \
    --port 8000 \
    --cidr 0.0.0.0/0

echo "✅ Security group created!"

# Create key pair
echo "Creating key pair..."
aws ec2 create-key-pair \
    --key-name vaani-backend-key \
    --query 'KeyMaterial' \
    --output text > vaani-backend-key.pem

chmod 400 vaani-backend-key.pem

echo "✅ Key pair created: vaani-backend-key.pem"

# Launch EC2 instance
echo "Launching EC2 instance..."
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id ami-0e2c8caa4b6378d8c \
    --instance-type t2.medium \
    --key-name vaani-backend-key \
    --security-groups vaani-backend-sg \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=vaani-backend}]' \
    --query 'Instances[0].InstanceId' \
    --output text)

echo "✅ Instance created: $INSTANCE_ID"
echo "Waiting for instance to start..."

aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text)

echo ""
echo "=========================================="
echo "✅ EC2 Instance Created Successfully!"
echo "=========================================="
echo "Instance ID: $INSTANCE_ID"
echo "Public IP: $PUBLIC_IP"
echo "Key File: vaani-backend-key.pem"
echo ""
echo "Connect using:"
echo "ssh -i vaani-backend-key.pem ubuntu@$PUBLIC_IP"
echo "=========================================="
