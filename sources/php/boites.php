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
		width: 400,
		height: 400,
		modal: true,
		buttons: {
			"Valider": function() {updateBlocIBDFromDialog();$( this ).dialog( "close" );},
			"Annuler": function() {$( this ).dialog( "close" );}
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








<!-- ================== BOITES EDITE INFOS FLUX ==================== -->
<div id="boiteEditeFlux" title="Editer le flux">
	<table>
			<tr>
				<td><lable for="BOITE_EDITE_FLUX_input_nature">Nature du flux:</label></td>
				<td>
					<select name="BOITE_EDITE_FLUX_input_nature" id="BOITE_EDITE_FLUX_input_nature">
						<option value="aucun">Aucun</option>
						<option value="energie">Énergie</option>
						<option value="information">Information</option>
						<option value="matiere">Matière</option>
					</select>
				</td>
			</tr>
			<tr>
				<td><lable for="BOITE_EDITE_FLUX_input_nomInstance">Sens du flux:</label></td>
				<td>
					<select name="BOITE_EDITE_FLUX_input_sens" id="BOITE_EDITE_FLUX_input_sens">
						<option value="aucun">Aucun</option>
						<option value="un">Sens 1</option>
						<option value="deux">Sens 2</option>
						<option value="double">Double sens</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" id="BOITE_EDITE_FLUX_input_imposeCouleur" name="BOITE_EDITE_FLUX_input_imposeCouleur" />
					<label for="BOITE_EDITE_FLUX_input_imposeCouleur"/>Couleur imposée</label>
				</td>
				<td></td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" id="BOITE_EDITE_FLUX_input_imposeEpaisseur" name="BOITE_EDITE_FLUX_input_imposeEpaisseur" />
					<label for="BOITE_EDITE_FLUX_input_imposeEpaisseur"/>Epaisseur imposée</label>
				</td>
				<td></td>
			</tr>
	</table>
</div>


<script>
	$("#boiteEditeFlux").dialog({
		autoOpen: false,
		width: 800,
		height: 400,
		modal: true,
		buttons: {
			"Valider": function() {updateFluxFromDialog();$( this ).dialog( "close" );},
			"Annuler": function() {$( this ).dialog( "close" );}
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






<!-- ================== BOITES EDITE INFOS PORT ==================== -->
<div id="boiteEditePort" title="Editer le port">
	<table>
			<tr>
				<td><lable for="BOITE_EDITE_PORT_input_nom">Nom :</label></td>
				<td>
					<input type="text" name="BOITE_EDITE_PORT_input_nom" id="BOITE_EDITE_PORT_input_nom" placeholder="(Facultatif)"/>
				</td>
			</tr>
	</table>
</div>


<script>
	$("#boiteEditePort").dialog({
		autoOpen: false,
		width: 800,
		height: 400,
		modal: true,
		buttons: {
			"Valider": function() {updatePortFromDialog();$( this ).dialog( "close" );},
			"Annuler": function() {$( this ).dialog( "close" );}
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