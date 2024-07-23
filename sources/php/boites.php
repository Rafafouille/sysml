<!-- ================== BOITES ==================== -->

<div id="boiteGenereCode">
	<textarea id="boiteGenereCode_contenu" cols="70", rows="13" wrap="OFF"></textarea>
</div>


<script>
	$("#boiteGenereCode").dialog({
		autoOpen: false,
		width: 800,
		height: 400,
		modal: true,
		buttons: {
			"Fermer": function() {$( this ).dialog( "close" );}
			},
		show: {
			effect: "blind",
			duration: 200
		      },
		hide: {
			effect: "blind",
			duration: 100
		      },
	});
</script>
