import DocumentGenerator from '../lib/DocumentGenerator'

const name = 'Maria'
const surnameFather = 'Ronalda'
const surnameMother = 'Frida'
const [birthDay, birthMonth, birthYear] = ('02-02-1992').split('-')
const birthState = 'Baja California'
const gender = 'F'

test('RFC generator', () => {
  const rfc = DocumentGenerator.getRFC(name, surnameFather, surnameMother, birthDay, birthMonth, birthYear)
  console.log({ rfc })

  expect(rfc).toBe('ROFM920202')
})

test('CURP generator', () => {
  const curp = DocumentGenerator.getCURP(name, surnameFather, surnameMother, birthDay, birthMonth, birthYear, birthState, gender)

  console.log({ curp })

  expect(curp.slice(0, -1)).toBe('ROFM920202MBCNRR0')
})
