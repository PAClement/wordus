<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motus</title>

    <style>
        body {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            background-color: #333;
        }

        td {
            border: 1px solid;
            height: 50px;
            width: 50px;

            text-align: center;
            font-size: 25px;
            text-transform: uppercase;

            background-color: #0177E1;
            color: white;
        }

        .input_propose {
            margin-bottom: 3%;
        }

        .error_word {
            display: block;
            font-size: 20px;
            color: red;
        }

        .error_display {
            display: none;
        }
    </style>
</head>

<body>

    <h1>WORDTUS</h1>

    <div class="input_propose">
        <p id="error" class="error_display error_word">MOT INCORRECT</p>
        <input id="word_propose" type="text" placeholder="Mot à proposer" />
        <button id="propose" type="submit">Proposer</button>
    </div>

    <div id="grid"></div>

    <script src="assets/js/motus.js"></script>
</body>

</html>