<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wordus</title>

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/main.css">

</head>

<body>

    <nav>
        <div class="container">
            <p class="text-center text-muted pt-3">&copy; <?php echo date('Y'); ?> Wordus, v.1</p>
        </div>
    </nav>

    <div class="container">

        <div class="row">
            <div class="col-12">
                <h1 class="mt-3 mb-5 text-info text-center">WORDUS</h1>
            </div>
        </div>

        <div class="row">
            <div class="col-12 d-flex justify-content-center">
                <div id="grid"></div>
            </div>
        </div>

        <div class="row ">
            <div class="d-flex justify-content-center">
                <div id="input_propose" class="col-6 mt-3 d-flex">
                    <input id="word_propose" class="py-2 form-control rounded-0 rounded-start" type="text" placeholder="Mot à proposer" />
                    <button id="propose" type="button" class="btn btn-info text-white rounded-0 rounded-end">Proposer</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 d-flex justify-content-center">
                <div id="error" class="d-none alert bg-danger col-6 text-white text-center mt-3" role="alert"></div>
                <div id="success" class="d-none alert bg-success col-6 text-white text-center mt-3" role="alert">
                    BRAVOO VOUS AVEZ GAGNÉ !!<br>
                    <button type="button" onclick='window.location.reload(false)' class="btn btn-warning mt-1">Rejouer ?</button>
                </div>
                <div id="loose" class="d-none alert bg-danger col-6 text-white text-center mt-3" role="alert">
                    DOMMAGE VOUS AVEZ PERDU !! le mot était : <span id="loose_word"></span><br>
                    <button type="button" onclick='window.location.reload(false)' class="btn btn-warning mt-1">Rejouer ?</button>
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/words.js"></script>
    <script src="assets/js/motus.js"></script>
</body>

</html>