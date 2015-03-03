
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

                            name            = StringUtilities.clearString(name);
                            name            = this.removeCommonNames(name);
                            surnameFather   = StringUtilities.clearString(surnameFather);
                            surnameMother   = StringUtilities.clearString(surnameMother);
                            bornDay         = StringUtilities.clearString(bornDay);
                            bornMonth       = StringUtilities.clearString(bornMonth);
                            bornYear        = StringUtilities.clearString(bornYear);

                            curp = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear,0);
                            
                            //TODO Remove bad words

                            curp += this.getGenderLetter(gender);
                            if(bornState.length !== 2){
                                bornState = this.getBornStateCode(bornState);
                            } 
                            curp += born_state
                            curp += StringUtilities.getFirstInternConsonant(surnameFather);
                            curp += StringUtilities.getFirstInternConsonant(surnameMother);
                            curp += StringUtilities.getFirstInternConsonant(name);

                            curp += this.getSpecialChar(bornYear);
                            curp += "?" // The last character is a random cahracter


                            return curp;

                    },
    getRFC: function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {

        name            = StringUtilities.clearString(name);
        surnameFather   = StringUtilities.clearString(surnameFather);
        surnameMother   = StringUtilities.clearString(surnameMother);
        bornDay         = StringUtilities.clearString(bornDay);
        bornMonth       = StringUtilities.clearString(bornMonth);
        bornYear        = StringUtilities.clearString(bornYear);

        rfc = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, 1);
         //impolement key method
        return rfc;

    },

    getCommonPart:  function(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, type) {
        
                            commonPart = surnameFather[0];
                            commonPart += StringUtilities.getFirstInternVowel(surnameFather);
                            commonPart += surnameMother[0];
                            commonPart += name[0];
                            commonPart = this.removeBadWords(commonPart, type)
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

    removeBadWords: function(word, type){

        if (type == 0){
            badWordsList = this.badWordsCURP
        } else {
            badWordsList = this.badWordsRFC
        }

        if(badWordsList[word]){
            return badWordsList[word]
        }

        return word;
    },

    states: new Array(
                {name: "AGUASCALIENTES"         , code: "AS"},  //1
                {name: "BAJA CALIFORNIA"        , code: "BC"},
                {name: "BAJA CALIFORNIA SUR"    , code: "BS"},
                {name: "CAMPECHE"               , code: "CC"},
                {name: "COAHUILA"               , code: "CL"},
                {name: "COLIMA"                 , code: "CM"},
                {name: "CHIAPAS"                , code: "CS"},
                {name: "CHIHUAHUA"              , code: "CH"},
                {name: "DISTRITO FEDERAL"       , code: "DF"},
                {name: "DURANGO"                , code: "DG"},
                {name: "GUANAJUATO"             , code: "GT"},
                {name: "GUERRERO"               , code: "GR"},
                {name: "HIDALGO"                , code: "HG"},
                {name: "JALISCO"                , code: "JC"},
                {name: "MÉXICO"                 , code: "MC"},
                {name: "MICHOACÁN"              , code: "MN"},
                {name: "MORELOS"                , code: "MS"},
                {name: "NAYARIT"                , code: "NT"},
                {name: "NUEVO LEÓN"             , code: "NL"},
                {name: "OAXACA"                 , code: "OC"},
                {name: "PUEBLA"                 , code: "PL"},
                {name: "QUERÉTARO"              , code: "QT"},
                {name: "QUINTANA ROO"           , code: "QR"},
                {name: "SAN LUIS POTOSÍ"        , code: "SP"},
                {name: "SINALOA"                , code: "SL"},
                {name: "SONORA"                 , code: "SR"},
                {name: "TABASCO"                , code: "TC"},
                {name: "TAMAULIPAS"             , code: "TS"},
                {name: "TLAXCALA"               , code: "TL"},
                {name: "VERACRUZ"               , code: "VZ"},
                {name: "YUCATÁN"                , code: "YN"},
                {name: "ZACATECAS"              , code: "ZS"}   //32
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
    badWordsCURP: {
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
    },

    badWordsRFC : {
                    "BUEI": "BUEX",
                    "BUEY": "BUEX",
                    "CACA": "CACX",
                    "CACO": "CACX",
                    "CAGA": "CAGX",
                    "CAGO": "CAGX",
                    "CAKA": "CAKX",
                    "COGE": "COGX",
                    "COJA": "COJX",
                    "COJE": "COJX",
                    "COJI": "COJX",
                    "COJO": "COJX",
                    "CULO": "CULX",
                    "FETO": "FETX",
                    "GUEY": "GUEX",
                    "JOTO": "JOTX",
                    "KACA": "KACX",
                    "KACO": "KACX",
                    "KAGA": "KAGX",
                    "KAGO": "KAGX",
                    "KOGE": "KOGX",
                    "KOJO": "KOJX",
                    "KAKA": "KAKX",
                    "KULO": "KULX",
                    "MAME": "MAMX",
                    "MAMO": "MAMX",
                    "MEAR": "MEAX",
                    "MEON": "MEOX",
                    "MION": "MIOX",
                    "MOCO": "MOCX",
                    "MULA": "MULX",
                    "PEDA": "PEDX",
                    "PEDO": "PEDX",
                    "PENE": "PENX",
                    "PUTA": "PUTX",
                    "PUTO": "PUTX",
                    "QULO": "QULX",
                    "RATA": "RATX",
                    "RUIN": "RUIX",
                },
    characterValues: {
                "0" :  '00',
                "1" :  '01',
                "2" :  '02',
                "3" :  '03',
                "4" :  '04',
                "5" :  '05',
                "6" :  '06',
                "7" :  '07',
                "8" :  '08',
                "9" :  '09',
                "A" :  '10',
                "B" :  '11',
                "C" :  '12',
                "D" :  '13',
                "F" :  '15',
                "E" :  '14',
                "G" :  '16',
                "H" :  '17',
                "I" :  '18',
                "J" :  '19',
                "K" :  '20',
                "L" :  '21',
                "M" :  '22',
                "N" :  '23',
                "&" :  '24',
                "O" :  '25',
                "P" :  '26',
                "Q" :  '27',
                "R" :  '28',
                "S" :  '29',
                "T" :  '30',
                "U" :  '31',
                "V" :  '32',
                "W" :  '33',
                "X" :  '34',
                "Y" :  '35',
                "Z" :  '36',
                " " :  '37',
                "Ñ" :  '38' 
                },
    fillBornStateSelect: function(field_id){
        element = document.getElementById(field_id);
        console.log(element)
        this.states.forEach(function(state){
            option = new Option(state.name, state.code)
            element.appendChild(option)
        });
    }
}