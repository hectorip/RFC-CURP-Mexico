import StringUtils from './StringUtils'

export enum DocumentType {
  RFC = 'rfc',
  CURP = 'curp'
}

type Gender = 'M' | 'F'

export default class DocumentGenerator {

  static getCURP = (name: string, surnameFather: string, surnameMother: string, bornDay: string, bornMonth: string, bornYear: string, bornState: string, gender: Gender) => {

    name = StringUtils.clearString(name)
    name = DocumentGenerator.removeCommonNames(name)
    surnameFather = StringUtils.clearString(surnameFather)
    surnameFather = DocumentGenerator.removePrefixes(surnameFather)
    surnameMother = StringUtils.clearString(surnameMother)
    surnameMother = DocumentGenerator.removePrefixes(surnameMother)
    bornDay = StringUtils.clearString(bornDay)
    bornMonth = StringUtils.clearString(bornMonth)
    bornYear = StringUtils.clearString(bornYear)

    let curp = DocumentGenerator.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, DocumentType.CURP)
    curp = DocumentGenerator.removeBadWords(curp, DocumentType.CURP)
    curp += DocumentGenerator.getGenderLetter(gender)
    curp += DocumentGenerator.getBornStateCode(bornState)
    curp += StringUtils.getFirstInternalConsonant(surnameFather)
    curp += StringUtils.getFirstInternalConsonant(surnameMother)
    curp += StringUtils.getFirstInternalConsonant(name)

    curp += DocumentGenerator.getSpecialChar(bornYear)
    curp += DocumentGenerator.getRandomInt(0, 9)
    return curp
  }

  static getRFC = (name: string, surnameFather: string, surnameMother: string, bornDay: string, bornMonth: string, bornYear: string) => {

    name = StringUtils.clearString(name)
    name = DocumentGenerator.removeCommonNames(name)
    surnameFather = StringUtils.clearString(surnameFather)
    surnameMother = StringUtils.clearString(surnameMother)
    bornDay = StringUtils.clearString(bornDay)
    bornMonth = StringUtils.clearString(bornMonth)
    bornYear = StringUtils.clearString(bornYear)

    return DocumentGenerator.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, DocumentType.RFC)
  }

  static getCommonPart (name: string, surnameFather: string, surnameMother: string, bornDay, bornMonth, bornYear, type: DocumentType) {
    let commonPart = surnameFather[0]
    commonPart += StringUtils.getFirstInternalVowel(surnameFather)
    commonPart += surnameMother[0] || 'X'
    commonPart += name[0]
    commonPart = DocumentGenerator.removeBadWords(commonPart, type)
    commonPart += bornYear.substring(2)
    commonPart += bornMonth
    commonPart += bornDay
    return commonPart
  }

  static getBornStateCode (stateName: string) {
    const parsedStateName = StringUtils.removeAccents(stateName).toUpperCase()
    return DocumentGenerator.states[parsedStateName]
  }

  static getGenderLetter (gender: Gender) {
    switch (gender) {
      case 'M':
        return 'H'
      case 'F':
        return 'M'
    }
  }

  static getSpecialChar (bornYear: string) {
    if (bornYear[0] === '1') {
      return '0'
    } else {
      return 'A'
    }
  }

  static removeCommonNames = (currentName: string): string => (
    DocumentGenerator
      .notAcceptedNames
      .reduce((name, notAccepted) => name.replace(new RegExp('^' + notAccepted), '')
        , currentName)
  )

  static removePrefixes = (currentName: string): string => (
    DocumentGenerator
      .prefixes
      .reduce((name, notAccepted) => name.replace(new RegExp('^' + notAccepted), '')
        , currentName)
  )

  static removeBadWords (word: string, type: DocumentType) {
    let badWordsList

    if (type === DocumentType.CURP) {
      badWordsList = DocumentGenerator.badWordsCURP
    } else {
      badWordsList = DocumentGenerator.badWordsRFC
    }

    if (badWordsList[word]) {
      return badWordsList[word]
    }

    return word
  }

  static states = {
    'AGUASCALIENTES': 'AS',
    'BAJA CALIFORNIA': 'BC',
    'BAJA CALIFORNIA SUR': 'BS',
    'CAMPECHE': 'CC',
    'COAHUILA': 'CL',
    'COLIMA': 'CM',
    'CHIAPAS': 'CS',
    'CHIHUAHUA': 'CH',
    'DISTRITO FEDERAL': 'DF',
    'DURANGO': 'DG',
    'GUANAJUATO': 'GT',
    'GUERRERO': 'GR',
    'HIDALGO': 'HG',
    'JALISCO': 'JC',
    'MEXICO': 'MC',
    'MICHOACAN': 'MN',
    'MORELOS': 'MS',
    'NAYARIT': 'NT',
    'NUEVO LEON': 'NL',
    'OAXACA': 'OC',
    'PUEBLA': 'PL',
    'QUERETARO': 'QT',
    'QUINTANA ROO': 'QR',
    'SAN LUIS POTOSÍ': 'SP',
    'SINALOA': 'SL',
    'SONORA': 'SR',
    'TABASCO': 'TC',
    'TAMAULIPAS': 'TS',
    'TLAXCALA': 'TL',
    'VERACRUZ': 'VZ',
    'YUCATAN': 'YN',
    'ZACATECAS': 'ZS'
  }

  static notAcceptedNames = [
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
  ]

  static prefixes = [
    'DE ',
    'DEL '
  ]

  static badWordsCURP = {
    'BACA': 'BXCA',
    'LOCO': 'LXCO',
    'BAKA': 'BXKA',
    'BUEI': 'BXEI',
    'BUEY': 'BXEY',
    'CACA': 'CXCA',
    'CACO': 'CXCO',
    'CAGA': 'CXGA',
    'CAGO': 'CXGO',
    'CAKA': 'CXKA',
    'CAKO': 'CXKO',
    'COGE': 'CXGE',
    'COGI': 'CXGI',
    'COJA': 'CXJA',
    'COJE': 'CXJE',
    'COJI': 'CXJI',
    'COJO': 'CXJO',
    'COLA': 'CXLA',
    'CULO': 'CXLO',
    'FALO': 'FXLO',
    'FETO': 'FXTO',
    'GETA': 'GXTA',
    'GUEI': 'GXEI',
    'GUEY': 'GXEY',
    'JETA': 'JXTA',
    'JOTO': 'JXTO',
    'KACA': 'KXCA',
    'KACO': 'KXCO',
    'KAGA': 'KXGA',
    'KAGO': 'KXGO',
    'KAKA': 'KXKA',
    'KAKO': 'KXKO',
    'KOGE': 'KXGE',
    'KOGI': 'KXGI',
    'KOJA': 'KXJA',
    'KOJE': 'KXJE',
    'KOJI': 'KXJI',
    'KOJO': 'KXJO',
    'KOLA': 'KXLA',
    'KULO': 'KXLO',
    'LILO': 'LXLO',
    'LOKA': 'LXKA',
    'LOKO': 'LXKO',
    'MAME': 'MXME',
    'MAMO': 'MXMO',
    'MEAR': 'MXAR',
    'MEAS': 'MXAS',
    'MEON': 'MXON',
    'MIAR': 'MXAR',
    'MION': 'MXON',
    'MOCO': 'MXCO',
    'MOKO': 'MXKO',
    'MULA': 'MXLA',
    'MULO': 'MXLO',
    'NACA': 'NXCA',
    'NACO': 'NXCO',
    'PEDA': 'PXDA',
    'PEDO': 'PXDO',
    'PENE': 'PXNE',
    'PIPI': 'PXPI',
    'PITO': 'PXTO',
    'POPO': 'PXPO',
    'PUTA': 'PXTA',
    'PUTO': 'PXTO',
    'QULO': 'QXLO',
    'RATA': 'RXTA',
    'ROBA': 'RXBA',
    'ROBE': 'RXBE',
    'ROBO': 'RXBO',
    'RUIN': 'RXIN',
    'SENO': 'SXNO',
    'TETA': 'TXTA',
    'VACA': 'VXCA',
    'VAGA': 'VXGA',
    'VAGO': 'VXGO',
    'VAKA': 'VXKA',
    'VUEI': 'VXEI',
    'VUEY': 'VXEY',
    'WUEI': 'WXEI',
    'WUEY': 'WXEY'
  }

  static getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static badWordsRFC = {
    'BUEI': 'BUEX',
    'BUEY': 'BUEX',
    'CACA': 'CACX',
    'CACO': 'CACX',
    'CAGA': 'CAGX',
    'CAGO': 'CAGX',
    'CAKA': 'CAKX',
    'COGE': 'COGX',
    'COJA': 'COJX',
    'COJE': 'COJX',
    'COJI': 'COJX',
    'COJO': 'COJX',
    'CULO': 'CULX',
    'FETO': 'FETX',
    'GUEY': 'GUEX',
    'JOTO': 'JOTX',
    'KACA': 'KACX',
    'KACO': 'KACX',
    'KAGA': 'KAGX',
    'KAGO': 'KAGX',
    'KOGE': 'KOGX',
    'KOJO': 'KOJX',
    'KAKA': 'KAKX',
    'KULO': 'KULX',
    'MAME': 'MAMX',
    'MAMO': 'MAMX',
    'MEAR': 'MEAX',
    'MEON': 'MEOX',
    'MION': 'MIOX',
    'MOCO': 'MOCX',
    'MULA': 'MULX',
    'PEDA': 'PEDX',
    'PEDO': 'PEDX',
    'PENE': 'PENX',
    'PUTA': 'PUTX',
    'PUTO': 'PUTX',
    'QULO': 'QULX',
    'RATA': 'RATX',
    'RUIN': 'RUIX'
  }

  static characterValues = {
    '0': '00',
    '1': '01',
    '2': '02',
    '3': '03',
    '4': '04',
    '5': '05',
    '6': '06',
    '7': '07',
    '8': '08',
    '9': '09',
    'A': '10',
    'B': '11',
    'C': '12',
    'D': '13',
    'F': '15',
    'E': '14',
    'G': '16',
    'H': '17',
    'I': '18',
    'J': '19',
    'K': '20',
    'L': '21',
    'M': '22',
    'N': '23',
    '&': '24',
    'O': '25',
    'P': '26',
    'Q': '27',
    'R': '28',
    'S': '29',
    'T': '30',
    'U': '31',
    'V': '32',
    'W': '33',
    'X': '34',
    'Y': '35',
    'Z': '36',
    ' ': '37',
    'Ñ': '38'
  }

}
