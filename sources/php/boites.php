<!-- ================== BOITES GENERE CODE (Sauvegarde )==================== -->

<div id="boiteGenereCode" title="Code de sauvegarde">
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






<!-- ================== BOITES EDITE INFOS IBD ==================== -->
<div id="boiteEditeBlocIBD" title="Editer le bloc IBD">
	<table>
			<tr>
					<td><lable for="BOITE_EDITE_IBD_input_nomInstance">Nom de l'instance :</label></td>
					<td><input type="text" id="BOITE_EDITE_IBD_input_nomInstance" name="BOITE_EDITE_IBD_input_nomInstance"></td>
			</tr>
			<tr>
					<td><lable for="BOITE_EDITE_IBD_input_classe">Nom de la classe :</label></td>
					<td><input type="text" id="BOITE_EDITE_IBD_input_classe" name="BOITE_EDITE_IBD_input_classe"></td>
			</tr>
			<tr>
					<td><lable for="BOITE_EDITE_IBD_input_X">Position X :</label></td>
					<td><input type="number" id="BOITE_EDITE_IBD_input_X" name="BOITE_EDITE_IBD_input_X"></td>
			</tr>
			<tr>
					<td><lable for="BOITE_EDITE_IBD_input_Y">Position Y :</label></td>
					<td><input type="number" id="BOITE_EDITE_IBD_input_Y" name="BOITE_EDITE_IBD_input_Y"></td>
			</tr>
			<tr>
					<td><lable for="BOITE_EDITE_IBD_input_LARGEUR">Largeur :</label></td>
					<td><input type="number" id="BOITE_EDITE_IBD_input_LARGEUR" name="BOITE_EDITE_IBD_input_LARGEUR"></td>
			</tr>
			<tr>
					<td><lable for="BOITE_EDITE_IBD_input_HAUTEUR">Hauteur :</label></td>
					<td><input type="number" id="BOITE_EDITE_IBD_input_HAUTEUR" name="BOITE_EDITE_IBD_input_HAUTEUR"></td>
			</tr>
	</table>
</div>


<script>
	$("#boiteEditeBlocIBD").dialog({
		autoOpen: false,
		width: 800,
		height: 400,
		modal: true,
		buttons: {
			"Modifier": function() {updateBlocIBDFromDialog();$( this ).dialog( "close" );},
			"Fermer": function() {$( this ).dialog( "close" );}
			},
		show: {
			effect: "blind",
			duration: 100
		      },
		hide: {
			effect: "blind",
			duration: 100
		      },
	});
</script>