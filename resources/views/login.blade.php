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
        <img src="image/icon/user-profile.jpg" alt="profile silhouette" class="profilepic">
        <h1>Welcome</h1>
        <form method="post">
            @csrf
            <input type="text" name="username" id="username" required placeholder="Username">
            <input type="password" name="password" id="password" required placeholder="Password">
            <br>
            <br>
            <input type="submit" value="Login">
        </form>
    </div>
</body>
</html>