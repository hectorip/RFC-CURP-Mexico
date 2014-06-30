
var StringUtilities = {
	getFirstInternVowel: function(word){
		vowels = word.substring(1).match(new RegExp('[AEIOU]'));
		return vowels ? vowels[0] : 'X';
	},
	getFirstInternConsonant: function(word){
		vowels = word.substring(1).match(new RegExp('[BCDFGHJKLMNPQRSTUVWXYZ]'));
		return vowels ? vowels[0] : 'X';
	},
	clearString: function(word) {

		cleanWord = word.trim();
		cleanword.replace(/\s/g,' ');
		return cleanWord.toUpperCase();
	},
	removeAccents: function(word)
	{
		accents = {
			'Á': 'A',
			'É': 'E',
			'Í': 'I',
			'Ó': 'O',
			'Ú': 'U' 
		}

		for(idx in word) {
			if (word[idx] in accents) {
				word[idx] = accents[word[idx]];
			}
		}
	}

}

var mxk = {


	getCURP: 		function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {

							name 	= StringUtilities.clearString(name);
							surnameFather = StringUtilities.clearString(surnameFather);
							surnameMother = StringUtilities.clearString(surnameMother);
							bornDay =		StringUtilities.clearString(bornDay);
							bornMonth =		StringUtilities.clearString(bornMonth);
							bornYear =		StringUtilities.clearString(bornYear);

							curp = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear);
							curp += this.getGenderLetter(gender);
							curp += this.getBornStateCode(bornState);
							curp += StringUtilities.getFirstInternConsonant(surnameFather);
							curp += StringUtilities.getFirstInternConsonant(surnameMother);
							curp += StringUtilities.getFirstInternConsonant(name);

							curp += this.getSpecialChar(bornYear);


							return curp;

					},

	getCommonPart: 	function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
		
							commonPart = surnameFather[0];
							commonPart += StringUtilities.getFirstInternVowel(surnameFather);
							commonPart += surnameMother[0];
							commonPart += name[0];

							commonPart += bornYear.substring(2);
							commonPart += bornMonth;
							commonPart += bornDay;
							 return commonPart;
					},
	getBornStateCode: function(idState){		
						return this.states[idState].code;
					},
	getGenderLetter: function(idGender){
						return idGender == 1 ? 'H' : 'M';
					},
	getSpecialChar: function(bornYear){
						if(bornYear[0] == '1') {
							return '0';
						} else {
							return 'A';
						}
					},
	removeCommonNames: function(name) {
						this.notAcceptedNames.forEach(
							function(notAccepted){
								name = name.replace(new RegExp('^' + notAccepted,g),'');
							}	
							);
						
						return name;
					},
	states: new Array(
				{name: "AGUASCALIENTES" , code: "AS"}, //1
				{name: "BAJA CALIFORNIA" , code: "BC"},
				{name: "BAJA CALIFORNIA SUR" , code: "BS"},
				{name: "CAMPECHE" , code: "CC"},
				{name: "COAHUILA" , code: "CL"},
				{name: "COLIMA" , code: "CM"},
				{name: "CHIAPAS" , code: "CS"},
				{name: "CHIHUAHUA" , code: "CH"},
				{name: "DISTRITO FEDERAL" , code: "DF"},
				{name: "DURANGO" , code: "DG"},
				{name: "GUANAJUATO" , code: "GT"},
				{name: "GUERRERO" , code: "GR"},
				{name: "HIDALGO" , code: "HG"},
				{name: "JALISCO" , code: "JC"},
				{name: "MÉXICO" , code: "MC"},
				{name: "MICHOACÁN" , code: "MN"},
				{name: "MORELOS" , code: "MS"},
				{name: "NAYARIT" , code: "NT"},
				{name: "NUEVO LEÓN", code: "NL"},
				{name: "OAXACA" , code: "OC"},
				{name: "PUEBLA" , code: "PL"},
				{name: "QUERÉTARO" , code: "QT"},
				{name: "QUINTANA ROO" , code: "QR"},
				{name: "SAN LUIS POTOSÍ" , code: "SP"},
				{name: "SINALOA" , code: "SL"},
				{name: "SONORA" , code: "SR"},
				{name: "TABASCO" , code: "TC"},
				{name: "TAMAULIPAS" , code: "TS"},
				{name: "TLAXCALA" , code: "TL"},
				{name: "VERACRUZ" , code: "VZ"},
				{name: "YUCATÁN" , code: "YN"},
				{name: "ZACATECAS" , code: "ZS"} //32
				),
	notAcceptedNames: new Array(
		'MARIA ',
		'MARIA DE LOS '
		'JOSE ',
		'JOSÉ DE ',
		'MA. ',
		'MA ',
		'J ',
		'J. '
		)

}