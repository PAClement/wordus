<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Motus</title>

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/main.css">

</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-12 d-flex flex-column align-items-center">
                <h1 class="mt-3 mb-5 text-info">WORDTUS</h1>

                <div class="mb-5">
                    <div class="d-flex">
                        <input id="word_propose" class="form-control rounded-0 rounded-start" type="text" placeholder="Mot à proposer" />
                        <button id="propose" type="button" class="btn btn-info text-white rounded-0 rounded-end">Proposer</button>
                    </div>
                </div>

                <div id="grid"></div>

                <div id="error" class="d-none alert bg-danger col-6 text-white text-center mt-3" role="alert">
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/motus.js"></script>
</body>

</html>