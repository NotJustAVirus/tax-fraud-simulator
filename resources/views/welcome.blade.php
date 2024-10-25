<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <div class="centerbox">
        <div class="options">
            <div class="signin-option">
                <img src="image/icon/user-profile.jpg" alt="profile silhouette" class="profilepic">
                <a href="login">
                    <button class="signin-button">Sign in</button>
                </a>
            </div>
            <div class="signin-option">
                <img src="image/icon/user-profile.jpg" alt="profile silhouette" class="profilepic">
                <a href="signup">
                    <button class="signin-button">Sign up</button>
                </a>
            </div>
            <div class="signin-option">
                <img src="image/icon/user-profile.jpg" alt="profile silhouette" class="profilepic">
                <form action="signupGuest" method="post">
                    @csrf
                    <button type="submit" class="signin-button">Continue as Guest</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>