export const fields = [
  {
    name: 'firstName',
    label: 'Imie',
    pattern: /[a-ząćęłńóśźż]{2,}/i,
    error: 'Dane w polu imie są niepoprawne - Ciąg minimum 2 znaków',
    type: 'text'
  },
  {
    name: 'lastName',
    label: 'Nazwisko',
    pattern: /[a-ząćęłńóśźż]{2,}/i,
    error: 'Dane w polu nazwisko są niepoprawne - Ciąg minimum 2 znaków',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email',
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
    error: 'Dane w polu email są niepoprawne - Przykład.: example@domena.com',
    type: 'text'
  },
  {
    name: 'date',
    label: 'Data',
    pattern: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    error: 'Dane w polu data są niepoprawne - format.: DD.MM.YYYY',
    type: 'date'
  },
  {
    name: 'time',
    label: 'Czas',
    pattern: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,
    error: 'Dane w polu czas są niepoprawne - format.: GG:MM',
    type: 'time'
  }
]

export default fields
