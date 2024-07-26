export function otpTemp (otp: any) { //fix any type here
    return ` 
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            padding: 20px 0;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            margin: 10px 0;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 8px;
            display: inline-block;
            letter-spacing: 4px;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
        }
        .footer p {
            font-size: 14px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>One-Time Password (OTP)</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your one-time password (OTP) for accessing your account is ${otp}:</p>
            <div class="otp"> ${otp}</div>
            <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Thank you for using our service!</p>
            <p>&copy; 2024 Your Company Name</p>
        </div>
    </div>
</body>
</html>
`

    
}