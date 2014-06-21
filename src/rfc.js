
var StringUtilities = {
	getFirstVowel: function(word){
		vowels = word.match(new RegExp('[AEIOU]'));
		return vowels[0] || 'X';
	}
	clearString: function(word) {
		cleanWord = word.trim();
		return cleanWord.toUpperCase();
	}
}

var mxk = {


	getCURP: 		function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {

							rfc = this->getCommonPart(name, surnameFather, surnameFather, bornDay, bornMonth, bornYear);

					}

	getCommonPart: 	function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
		
							name 	= StringUtilities->clearString(name);
							surnameFather = StringUtilities->clearString(surnameFather);
							surnameMother = StringUtilities->clearString(surnameMother);
							bornDay =		StringUtilities->clearString(bornDay);
							bornMonth =		StringUtilities->clearString(bornMonth);
							bornYear =		StringUtilities->clearString(bornYear);

							commonPart = surnameFather[0];
							commonPart += StringUtilities->getFirstVowel(surnameFather);
							commonPart += surnameMother[0];
							commonPart += name[0];

							commonPart += bornYear.substring(3,4);
							commonPart += bornMonth;
							commonPart += bornDay;
						
					}

}