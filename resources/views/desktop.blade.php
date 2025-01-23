<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <title>Desktop</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script defer src="js/script.js" type="module"></script>
</head>
<body class="dark">
    <section id="desktop">
        <h1>This is the desktop</h1>
    </section>
    <div class="startmenu closed">
        <div class="startmenunav">
            <form action="logout" method="post" class="navitem-form">
                @csrf
                <button class="navitem">
                    <img src="image/icon/mail.png" alt="start icon">
                    <p>Logout</p>
                </button>
            </form>
            <button class="navitem">
                <img src="image/icon/mail.png" alt="start icon">
                <p>hi</p>
            </button>
        </div>
        <div class="startmenucontent">
            <div class="grid">
            </div>
        </div>
    </div>
    <nav id="taskbar">
        <ul>
            <li class="right clock">
                <button id="progress">
                    <p id="day">Day 0</p>
                    <p>Next day -></p>
                </button>
                {{-- <p>11-09-2024</p> --}}
            </li>
            <li class="right icon" title="69%">
                <div>
                    <img src="image/icon/battery.png" alt="battery icon">
                </div>
            </li>
            <li class="right icon" title="Neighbour's wifi">
                <div>
                    <img src="image/icon/wifi-logo.svg" alt="wifi icon">
                </div>
            </li>
            <li class="right icon">
                <div>
                    <img src="image/icon/sound.png" alt="sound icon">
                </div>
            </li>
            <li class="right icon color-scheme">
                <button id="color-scheme">
                    <img src="image/icon/sun.png" alt="color scheme icon">
                </button>
            </li>
        </ul>
    </nav>
</body>
</html>