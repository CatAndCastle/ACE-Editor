<?php
	if (isset($_SERVER['HTTPS']) &&
        ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) ||
        isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
        $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
      $protocol = 'https://';
    }
    else {
      $protocol = 'http://';
    }

    $http_host = str_replace("ace.", "", $_SERVER['HTTP_HOST']);
?>
<html>
<head>
	<title>Editor</title>
	<meta name="description" content="Automated Videos Dashboard">
	<meta charset="utf-8">
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<link rel="icon" href="img/favicon.ico" type="image/x-icon">

	<script type="text/javascript" src="lib/angular.1.5.8.min.js"></script>
	<script type="text/javascript" src="lib/angular-animate.min.js"></script>
	<script type="text/javascript" src="lib/angular-modal-service.min.js"></script>
	<script type="text/javascript" src="lib/angular-route.1.5.10.min.js"></script>
	<script type="text/javascript" src="lib/jquery-1.12.0.min.js"></script>

	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="services/dataManager.js"></script>
	<script type="text/javascript" src="services/appManager.js"></script>
	<script type="text/javascript" src="components/navigation/navigationController.js"></script>

	<script type="text/javascript" src="components/editor/write/writeController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/editor/write/write.css' >

	<script type="text/javascript" src="components/editor/edit/editController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/editor/edit/edit.css' >

	<script type="text/javascript" src="components/editor/play/playController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/editor/play/play.css' >

	<script type="text/javascript" src="components/editor/mediaSelect/mediaSelectController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/editor/mediaSelect/mediaSelect.css' >
	

	<script type="text/javascript" src="components/login/loginController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/login/login.css' >
	<script type="text/javascript" src="components/projects/projectsController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/projects/projects.css' >
	<script type="text/javascript" src="components/videos/videosController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/videos/videos.css' >

	<script type="text/javascript" src="components/loader/loadingController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/loader/loader.css' >

	<script type="text/javascript" src="components/popups/newVideo/newVideoController.js"></script>
	<link type='text/css' rel='stylesheet' href='components/popups/newVideo/newVideo.css' >
	
	<script type="text/javascript" src="js/components.js"></script>

	<!-- Directives -->
	<script type="text/javascript" src="directives/aceButton/aceButton.js"></script>
	<link type='text/css' rel='stylesheet' href='directives/aceButton/aceButton.css' >
	<script type="text/javascript" src="directives/iconButton/iconButton.js"></script>
	<script type="text/javascript" src="directives/player/player.js"></script>
	<link type='text/css' rel='stylesheet' href='directives/player/player.css' >
	<link type='text/css' rel='stylesheet' href='directives/player/playerControls.css' >


	<!-- Player JS -->
	<script type="text/javascript" src="js/editor/bodymovin.js"></script>	
	<script type="text/javascript" src="js/editor/ZSPlayer.js"></script>	

	<link href='css/main.css' rel='stylesheet' type='text/css'>
	<link href='components/navigation/navigationBar.css' rel='stylesheet' type='text/css'>

	<link href='font/Roboto/Roboto.css' rel='stylesheet' type='text/css'>
	<link href='font/AvenirNext/AvenirNext.css' rel='stylesheet' type='text/css'>
	

	<script>
		API_BASE = "http://ace.api.local/";
    </script>

</head>
<body> 

	<div ng-app="video-dashboard">
		<navigation-bar></navigation-bar>

		<dashboard>
			<ng-view autoscroll="true" class='full-screen'></ng-view>
		</dashboard>
	</div>



</body>
</html>