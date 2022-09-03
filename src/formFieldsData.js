export const fields = [
  {
    name: 'firstName',
    label: 'Imie',
    pattern: /[a-ząćęłńóśźż]{2,}/i
  },
  {
    name: 'lastName',
    label: 'Nazwisko',
    pattern: /[a-ząćęłńóśźż]{2,}/i
  },
  {
    name: 'email',
    label: 'Email',
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
  },
  {
    name: 'date',
    label: 'Data',
    pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
  },
  {
    name: 'time',
    label: 'Czas',
    pattern: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/
  }
]

export default fields
