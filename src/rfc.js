
var StringUtilities = {
	getFirstInternVowel: function(word){
		vowels = word.substring(1).match(new RegExp('[AEIOU]'));
		return vowels[0] || 'X';
	},
	getFirstInternConsonant: function(word){
		vowels = word.substring(1).match(new RegExp('[BCDFGHJKLMNPQRSTUVWXYZ]'));
		return vowels[0] || 'X';
	},
	clearString: function(word) {
		cleanWord = word.trim();
		return cleanWord.toUpperCase();
	}
}

var mxk = {


	getCURP: 		function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {

							rfc = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear);
							return rfc;

					},

	getCommonPart: 	function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
		
							name 	= StringUtilities.clearString(name);
							surnameFather = StringUtilities.clearString(surnameFather);
							surnameMother = StringUtilities.clearString(surnameMother);
							bornDay =		StringUtilities.clearString(bornDay);
							bornMonth =		StringUtilities.clearString(bornMonth);
							bornYear =		StringUtilities.clearString(bornYear);

							commonPart = surnameFather[0];
							commonPart += StringUtilities.getFirstInternVowel(surnameFather);
							commonPart += surnameMother[0];
							commonPart += name[0];

							commonPart += bornYear.substring(2);
							commonPart += bornMonth;
							commonPart += bornDay;
							 return commonPart;
					}

}