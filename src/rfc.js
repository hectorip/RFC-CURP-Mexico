
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
		return cleanWord.toUpperCase();
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

							curp += '00'

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
				)

}