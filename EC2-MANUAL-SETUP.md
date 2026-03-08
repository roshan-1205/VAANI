# 🚀 EC2 Manual Setup Guide

## Current Status:
✅ Security Group Created: `vaani-backend-sg`
✅ Ports 5000, 8000 opened
⏭️ Need to add ports: 22, 80, 443

---

## Step 1: Add Remaining Security Group Rules

**Run these commands in your terminal:**

```powershell
aws ec2 authorize-security-group-ingress --group-name vaani-backend-sg --ip-permissions IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges='[{CidrIp=0.0.0.0/0}]'

aws ec2 authorize-security-group-ingress --group-name vaani-backend-sg --ip-permissions IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges='[{CidrIp=0.0.0.0/0}]'

aws ec2 authorize-security-group-ingress --group-name vaani-backend-sg --ip-permissions IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges='[{CidrIp=0.0.0.0/0}]'
```

---

## Step 2: Create Key Pair

```powershell
aws ec2 create-key-pair --key-name vaani-backend-key --query 'KeyMaterial' --output text | Out-File -Encoding ASCII vaani-backend-key.pem
```

---

## Step 3: Launch EC2 Instance

```powershell
aws ec2 run-instances `
  --image-id ami-0e2c8caa4b6378d8c `
  --instance-type t2.medium `
  --key-name vaani-backend-key `
  --security-groups vaani-backend-sg `
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=vaani-backend}]'
```

---

## Step 4: Get Instance Details

Wait 2 minutes, then run:

```powershell
aws ec2 describe-instances --filters "Name=tag:Name,Values=vaani-backend" --query 'Reservations[0].Instances[0].[InstanceId,PublicIpAddress,State.Name]' --output table
```

---

## Step 5: Connect to EC2

```powershell
ssh -i vaani-backend-key.pem ubuntu@YOUR_PUBLIC_IP
```

---

**Copy these commands and run in PowerShell!** 🚀

