const welcomeMail = (username) => {
    return `
    <html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AgroHealth</title>
    <style>
        .container {
            background: linear-gradient(to right, #4caf50, #81c784);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(245, 244, 244, 0.1);
            max-width: 90vw;
            width: 100%;
            text-align: center;
            margin: 0px;
        }
    </style>
</head>

<body style="font-family: 'Arial', sans-serif; color: white; margin: 0; padding: 0; font-size: 16px;">
    <div class="container">
        <div style="font-size: 1.5rem; line-height: 2rem; margin-bottom: 10px;">Dear ${username},</div>

        <div style="text-align: justify; margin-bottom: 20px;">Welcome to AgroHealth! We’re excited to have you join our community of farmers dedicated to improving agricultural practices with cutting-edge technology. Our platform empowers farmers like you to protect your harvests and increase productivity with precision.</div>

        <div style="margin-bottom: 10px;">Empowering Farmers with Precision: AgroHealth uses advanced technologies like image recognition and AI-driven models to detect diseases in crops and livestock early, enabling you to act quickly and prevent losses.</div>

        <div style="margin-bottom: 10px;">Early Disease Detection: With our image recognition tools, you can identify diseases in your crops and cattle early. Early detection helps prevent the spread of diseases, saving your farm from widespread damage.</div>

        <div style="margin-bottom: 10px;">Precision Agriculture: AgroHealth promotes precision farming by providing real-time data on disease outbreaks. This helps you reduce pesticide use and minimize environmental impact, all while saving resources.</div>

        <div style="margin-bottom: 10px;">Knowledge Dissemination: Integrated with AI models like GPT and Claude, AgroHealth quickly delivers knowledge about detected diseases and offers actionable advice to help you manage and treat the problem effectively.</div>

        <div style="margin-bottom: 10px;">Enhanced Decision Making: By receiving timely and accurate information, you are empowered to make informed decisions that can protect your crops and livestock, ultimately boosting your productivity and profitability.</div>

        <div style="text-align: justify; margin-bottom: 20px;">At AgroHealth, we are committed to supporting you with the tools and knowledge to make farming more efficient, sustainable, and profitable. If you have any questions or need support, our team is here to help!</div>

        <div style="text-align: justify; margin-bottom: 20px;">Once again, welcome to AgroHealth! Together, we will build a healthier and more productive future for agriculture.</div>

        <div style="width: 100%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
            <a href="https://www.agrohealth.com" style="display: inline-block; padding: 10px 20px; background-color: #81c784; color: #000; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease;" target="_blank" rel="noopener noreferrer">Visit AgroHealth</a>
        </div>

        <div style="font-size: 1.5rem;">Best regards,</div>
        <div>AgroHealth Team</div>
    </div>
</body>

</html>
`;
}

module.exports = welcomeMail;