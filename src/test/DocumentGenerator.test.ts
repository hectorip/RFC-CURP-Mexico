import DocumentGenerator from '../lib/DocumentGenerator'

class Person {
  name
  surnameFather
  surnameMother
  birthDay
  birthMonth
  birthYear
  birthState
  gender
  expectedRFC
  expectedCURP
  
  constructor(name, surnameFather, surnameMother, birthDate, birthState, gender, expectedRFC, expectedCURP) {
    const [birthDay, birthMonth, birthYear] = birthDate.split('/')
    this.name = name
    this.surnameFather = surnameFather
    this.surnameMother = surnameMother
    this.birthDay = birthDay
    this.birthMonth = birthMonth
    this.birthYear = birthYear 
    this.birthState = birthState
    this.gender = gender
    this.expectedRFC = expectedRFC
    this.expectedCURP = expectedCURP
  }
}

const rfcRegex = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/
const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/

const documentTest = (person: Person) => {
  const rfc = DocumentGenerator.getRFC(person.name, person.surnameFather, person.surnameMother, person.birthDay, person.birthMonth, person.birthYear)
  const curp = DocumentGenerator.getCURP(person.name, person.surnameFather, person.surnameMother, person.birthDay, person.birthMonth, person.birthYear, person.birthState, person.gender)
  
  test('RFC regex test', () => {
    expect(rfcRegex.test(rfc)).toBeTruthy()
  })

  test('RFC match', () => {
    expect(rfc).toBe(person.expectedRFC)
  })

  test('CURP regex test', () => {
    expect(curpRegex.test(curp)).toBeTruthy()
  })

  test('CURP match', () => {
    expect(curp).toBe(person.expectedCURP)
  })
}

const persons = [
  new Person('Ronaldo', 'Sebastião', 'Lepes', '02/02/1968', 'Puebla', 'F', 'SELR680202', 'SELR680202MPLBPN04'),
  new Person('Gustavo', 'Lima', 'Teste', '21/01/1973', 'Campeche', 'M', 'LITG730121', 'LITG730121HCCMSS04'),
  new Person('Carlos', 'Claudia', 'Lima', '31/08/1994', 'Aguascalientes', 'M', 'CALC940831', 'CALC940831HASLMR06'),
  new Person('Maria', 'Hernandez', 'Jose', '25/03/1998', 'Mexico', 'M', 'HEJM980325', 'HEJM980325HMCRSR02'),
  new Person('Jose', 'Silvera', 'Sado', '25/03/1998', 'Yucatan', 'F', 'SISJ980325', 'SISJ980325MYNLDS02')
]

persons.forEach(documentTest)


