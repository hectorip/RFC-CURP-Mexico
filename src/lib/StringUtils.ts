export default class StringUtilities {
  static getFirstInternalVowel = (word: string) => {
    const vowels = word.substring(1).match(/[AEIOU]/)
    if (vowels) {
      return vowels[0] || 'X'
    } else {
      return 'X'
    }
  }

  static getFirstInternalConsonant = (word: string) => {
    const consonant = word.substring(1).match(/[BCDFGHJKLMNPQRSTVWXYZ]/)
  
    if (consonant) {
      return consonant[0] || 'X'
    } else {
      return 'X'
    }
  }

  static clearString = (word: string) => {

    const cleanWord = word.trim()
    return StringUtilities.removeAccents(cleanWord.replace(/\s/g, ' ').toUpperCase())
  }

  static removeAccents = (word: string) => {
    const accents: any = {
      'Á': 'A',
      'É': 'E',
      'Í': 'I',
      'Ó': 'O',
      'Ú': 'U'
    }

    for (let accented in accents) {
      word = word.replace(new RegExp(accented), accents[accented])
    }
    return word
  }

}
