import DocumentGenerator from '../lib/DocumentGenerator'

const name = 'Ronaldo'
const surnameFather = 'Sebastião'
const surnameMother = 'Lepes'
const [birthDay, birthMonth, birthYear] = ('02-02-1968').split('-')
const birthState = 'Puebla'
const gender = 'F'

test('RFC generator', () => {
  const rfc = DocumentGenerator.getRFC(name, surnameFather, surnameMother, birthDay, birthMonth, birthYear)
  console.log({ rfc })

  expect(rfc).toBe('SELR680202')
})

test('CURP generator', () => {
  const curp = DocumentGenerator.getCURP(name, surnameFather, surnameMother, birthDay, birthMonth, birthYear, birthState, gender)

  console.log({ curp })

  expect(curp).toBe('SELR680202MPLBPN04')
})
