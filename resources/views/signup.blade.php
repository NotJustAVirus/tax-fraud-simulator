<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <a class="back-button" href="welcome">
        <img src="image/icon/back.png" alt="Back arrow icon">
    </a>
    <div class="centerbox">
        <img src="image/icon/user-profile.jpg" alt="profile silhouette" class="profilepic">
        <h1>Signup</h1>
        @php
        $failmessage = request()->session()->pull('fail');
        if ($failmessage) {
            echo '<p style="color: red;">' . $failmessage . '</p>';
        }
        @endphp
        <form method="post">
            @csrf
            <input type="text" name="username" id="username" required placeholder="Username">
            <input type="password" name="password" id="password" required placeholder="Password">
            <input type="password" name="password_confirmation" id="password_confirmation" required placeholder="Confirm Password">
            <input type="email" name="email" id="email" required placeholder="Email">
            <br>
            <br>
            <input type="submit" value="Sign up">
        </form>
    </div>
</body>
</html>