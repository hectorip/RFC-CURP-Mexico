
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
		cleanWord = cleanWord.replace(/\s/g,' ');
		cleanWord = this.removeAccents(cleanWord.toUpperCase());
		return cleanWord;
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

		for(accented in accents) {
			word = word.replace(new RegExp(accented),accents[accented]);
		}
		return word;
	}

}

var mxk = {

	getCURP: function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {

							name 			= StringUtilities.clearString(name);
							name 			= this.removeCommonNames(name);
							surnameFather 	= StringUtilities.clearString(surnameFather);
							surnameMother 	= StringUtilities.clearString(surnameMother);
							bornDay 		= StringUtilities.clearString(bornDay);
							bornMonth 		= StringUtilities.clearString(bornMonth);
							bornYear 		= StringUtilities.clearString(bornYear);

							curp = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear);
							
							//TODO Remove bad words

							curp += this.getGenderLetter(gender);
							curp += this.getBornStateCode(bornState);
							curp += StringUtilities.getFirstInternConsonant(surnameFather);
							curp += StringUtilities.getFirstInternConsonant(surnameMother);
							curp += StringUtilities.getFirstInternConsonant(name);

							curp += this.getSpecialChar(bornYear);


							return curp;

					},
	getRFC: function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {

		name 			= StringUtilities.clearString(name);
		surnameFather 	= StringUtilities.clearString(surnameFather);
		surnameMother 	= StringUtilities.clearString(surnameMother);
		bornDay 		= StringUtilities.clearString(bornDay);
		bornMonth 		= StringUtilities.clearString(bornMonth);
		bornYear 		= StringUtilities.clearString(bornYear);

		rfc = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear);
		 //impolement key method
		return rfc;

	},

	getCommonPart: 	function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
		
							commonPart = surnameFather[0];
							commonPart += StringUtilities.getFirstInternVowel(surnameFather);
							commonPart += surnameMother[0];
							commonPart += name[0];

							
							commonPart += bornYear.substring(2);
							commonPart += bornMonth;
							commonPart += bornDay;

							//todo, remove bad words
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
								name = name.replace(new RegExp('^' + notAccepted),'');
							}	
							);
						
						return name;
					},

	removeBadWordsRFC: function(word){
		if(word in this.badWordsRFC) {
			word[3] = 'X'
		}
		return word;
	},

	states: new Array(
				{name: "AGUASCALIENTES"			, code: "AS"}, 	//1
				{name: "BAJA CALIFORNIA"		, code: "BC"},
				{name: "BAJA CALIFORNIA SUR"	, code: "BS"},
				{name: "CAMPECHE"				, code: "CC"},
				{name: "COAHUILA"				, code: "CL"},
				{name: "COLIMA"					, code: "CM"},
				{name: "CHIAPAS"				, code: "CS"},
				{name: "CHIHUAHUA"				, code: "CH"},
				{name: "DISTRITO FEDERAL"		, code: "DF"},
				{name: "DURANGO"				, code: "DG"},
				{name: "GUANAJUATO"				, code: "GT"},
				{name: "GUERRERO"				, code: "GR"},
				{name: "HIDALGO"				, code: "HG"},
				{name: "JALISCO"				, code: "JC"},
				{name: "MÉXICO"					, code: "MC"},
				{name: "MICHOACÁN"				, code: "MN"},
				{name: "MORELOS"				, code: "MS"},
				{name: "NAYARIT"				, code: "NT"},
				{name: "NUEVO LEÓN"				, code: "NL"},
				{name: "OAXACA"					, code: "OC"},
				{name: "PUEBLA"					, code: "PL"},
				{name: "QUERÉTARO"				, code: "QT"},
				{name: "QUINTANA ROO"			, code: "QR"},
				{name: "SAN LUIS POTOSÍ"		, code: "SP"},
				{name: "SINALOA"				, code: "SL"},
				{name: "SONORA"					, code: "SR"},
				{name: "TABASCO"				, code: "TC"},
				{name: "TAMAULIPAS"				, code: "TS"},
				{name: "TLAXCALA"				, code: "TL"},
				{name: "VERACRUZ"				, code: "VZ"},
				{name: "YUCATÁN"				, code: "YN"},
				{name: "ZACATECAS"				, code: "ZS"} 	//32
				),
	notAcceptedNames: new Array(
		'MARIA DEL ',
		'MARIA DE LOS ',
		'MARIA ',
		'JOSE DE ',
		'JOSE ',
		'MA. ',
		'MA ',
		'M. ',
		'J. ',
		'J '
		),
	badWords: {
		"BACA": "BXCA",
		"LOCO": "LXCO",
		"BAKA": "BXKA",
		"BUEI": "BXEI",
		"BUEY": "BXEY",
		"CACA": "CXCA",
		"CACO": "CXCO",
		"CAGA": "CXGA",
		"CAGO": "CXGO",
		"CAKA": "CXKA",
		"CAKO": "CXKO",
		"COGE": "CXGE",
		"COGI": "CXGI",
		"COJA": "CXJA",
		"COJE": "CXJE",
		"COJI": "CXJI",
		"COJO": "CXJO",
		"COLA": "CXLA",
		"CULO": "CXLO",
		"FALO": "FXLO",
		"FETO": "FXTO",
		"GETA": "GXTA",
		"GUEI": "GXEI",
		"GUEY": "GXEY",
		"JETA": "JXTA",
		"JOTO": "JXTO",
		"KACA": "KXCA",
		"KACO": "KXCO",
		"KAGA": "KXGA",
		"KAGO": "KXGO",
		"KAKA": "KXKA",
		"KAKO": "KXKO",
		"KOGE": "KXGE",
		"KOGI": "KXGI",
		"KOJA": "KXJA",
		"KOJE": "KXJE",
		"KOJI": "KXJI",
		"KOJO": "KXJO",
		"KOLA": "KXLA",
		"KULO": "KXLO",
		"LILO": "LXLO",
		"LOKA": "LXKA",
		"LOKO": "LXKO",
		"MAME": "MXME",
		"MAMO": "MXMO",
		"MEAR": "MXAR",
		"MEAS": "MXAS",
		"MEON": "MXON",
		"MIAR": "MXAR",
		"MION": "MXON",
		"MOCO": "MXCO",
		"MOKO": "MXKO",
		"MULA": "MXLA",
		"MULO": "MXLO",
		"NACA": "NXCA",
		"NACO": "NXCO",
		"PEDA": "PXDA",
		"PEDO": "PXDO",
		"PENE": "PXNE",
		"PIPI": "PXPI",
		"PITO": "PXTO",
		"POPO": "PXPO",
		"PUTA": "PXTA",
		"PUTO": "PXTO",
		"QULO": "QXLO",
		"RATA": "RXTA",
		"ROBA": "RXBA",
		"ROBE": "RXBE",
		"ROBO": "RXBO",
		"RUIN": "RXIN",
		"SENO": "SXNO",
		"TETA": "TXTA",
		"VACA": "VXCA",
		"VAGA": "VXGA",
		"VAGO": "VXGO",
		"VAKA": "VXKA",
		"VUEI": "VXEI",
		"VUEY": "VXEY",
		"WUEI": "WXEI",
		"WUEY": "WXEY"
	}

	badWordsRFC : [
					"BUEI"
					"BUEY"
					"CACA"
					"CACO"
					"CAGA"
					"CAGO"
					"CAKA"
					"COGE"
					"COJA"
					"COJE"
					"COJI"
					"COJO"
					"CULO"
					"FETO"
					"GUEY"
					"JOTO"
					"KACA"
					"KACO"
					"KAGA"
					"KAGO"
					"KOGE"
					"KOJO"
					"KAKA"
					"KULO"
					"MAME"
					"MAMO"
					"MEAR"
					"MEON"
					"MION"
					"MOCO"
					"MULA"
					"PEDA"
					"PEDO"
					"PENE"
					"PUTA"
					"PUTO"
					"QULO"
					"RATA"
					"RUIN"
				],
	characterValues
				"0" :  '00'
				"1" :  '01' 
				"2" :  '02'
				"3" :  '03'
				"4" :  '04'
				"5" :  '05'
				"6" :  '06'
				"7" :  '07'
				"8" :  '08'
				"9" :  '09'
				"A" :  '10'
				"B" :  '11'
				"C" :  '12'
				"D" :  '13'
				"F" :  '15'
				"E" :  '14'
				"G" :  '16'
				"H" :  '17'
				"I" :  '18'
				"J" :  '19'
				"K" :  '20'
				"L" :  '21'
				"M" :  '22'
				"N" :  '23'
				"&" :  '24'
				"O" :  '25'
				"P" :  '26'
				"Q" :  '27'
				"R" :  '28'
				"S" :  '29' 
				"T" :  '30' 
				"U" :  '31' 
				"V" :  '32' 
				"W" :  '33' 
				"X" :  '34' 
				"Y" :  '35' 
				"Z" :  '36' 
				" " :  '37' 
				"Ñ" :  '38' 
				]
}