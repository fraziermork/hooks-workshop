import React, { Fragment, useState, useMemo, useContext, createContext } from "react"

import { daysInMonth } from "app/utils"

const DateContext = createContext({
  date: null,
  onChange: () => {},
})

export default function DateFields({ children, value: initialValue }) {
  const [date, setDate] = useState(initialValue);
  const value = useMemo(() => ({
    date,
    onChange(date) {
      console.log(`new date:`, date);
      setDate(date);
    },
  }), [date, setDate]);

  return (
    <DateContext.Provider value={value}>
      {children}
    </DateContext.Provider>
  )
}

function DayField() {
  const { date, onChange } = useContext(DateContext);
  const month = date.getMonth()
  const year = date.getFullYear()
  const days = Array.from({ length: daysInMonth(month, year) })
  const value = date.getDate()
  const handleChange = event => {
    const newDate = new Date(date.getTime())
    newDate.setDate(parseInt(event.target.value))
    onChange(newDate)
  }

  return (
    <select value={value} onChange={handleChange}>
      {days.map((_, index) => (
        <option key={index} value={index + 1}>
          {index < 9 ? "0" : ""}
          {index + 1}
        </option>
      ))}
    </select>
  )
}

function MonthField() {
  const { date, onChange } = useContext(DateContext);
  const month = date.getMonth()
  const handleChange = event => {
    const newDate = new Date(date.getTime())
    newDate.setMonth(parseInt(event.target.value))
    onChange(newDate)
  }

  return (
    <select value={month} onChange={handleChange}>
      <option value="0">01</option>
      <option value="1">02</option>
      <option value="2">03</option>
      <option value="3">04</option>
      <option value="4">05</option>
      <option value="5">06</option>
      <option value="6">07</option>
      <option value="7">08</option>
      <option value="8">09</option>
      <option value="9">10</option>
      <option value="10">11</option>
      <option value="11">12</option>
    </select>
  )
}

function YearField(props) {
  const { date, onChange } = useContext(DateContext);
  const { start, end } = props
  const difference = end - start + 1
  const years = Array.from({ length: difference }).map(
    (_, index) => index + start
  )
  const handleChange = event => {
    const newDate = new Date(date.getTime())
    newDate.setYear(parseInt(event.target.value), 1)
    onChange(newDate)
  }

  return (
    <select value={date.getFullYear()} onChange={handleChange}>
      {years.map(year => (
        <option key={year}>{year}</option>
      ))}
    </select>
  )
}

export {
  DayField,
  MonthField,
  YearField,
}


// function DateFields2({
//   children,
//   defaultValue,
//   start,
//   end,
//   value: controlledValue,
//   onChange
// }) {
//   const date = controlledValue || defaultValue
//   return (
//     <Fragment>
//       <MonthField date={date} onChange={onChange} />/
//       <DayField date={date} onChange={onChange} />/
//       <YearField date={date} onChange={onChange} start={start} end={end} />
//     </Fragment>
//   )
// }

// export function DayField2(props) {
//   const { date, onChange } = props
//   const month = date.getMonth()
//   const year = date.getFullYear()
//   const days = Array.from({ length: daysInMonth(month, year) })
//   const value = date.getDate()
//   const handleChange = event => {
//     const newDate = new Date(date.getTime())
//     newDate.setDate(parseInt(event.target.value))
//     onChange(newDate)
//   }

//   return (
//     <select value={value} onChange={handleChange}>
//       {days.map((_, index) => (
//         <option key={index} value={index + 1}>
//           {index < 9 ? "0" : ""}
//           {index + 1}
//         </option>
//       ))}
//     </select>
//   )
// }

// export function MonthField2(props) {
//   const { date, onChange } = props
//   const month = date.getMonth()
//   const handleChange = event => {
//     const newDate = new Date(date.getTime())
//     newDate.setMonth(parseInt(event.target.value))
//     onChange(newDate)
//   }

//   return (
//     <select value={month} onChange={handleChange}>
//       <option value="0">01</option>
//       <option value="1">02</option>
//       <option value="2">03</option>
//       <option value="3">04</option>
//       <option value="4">05</option>
//       <option value="5">06</option>
//       <option value="6">07</option>
//       <option value="7">08</option>
//       <option value="8">09</option>
//       <option value="9">10</option>
//       <option value="10">11</option>
//       <option value="11">12</option>
//     </select>
//   )
// }

// export function YearField2(props) {
//   const { date, onChange, start, end } = props
//   const difference = end - start + 1
//   const years = Array.from({ length: difference }).map(
//     (_, index) => index + start
//   )
//   const handleChange = event => {
//     const newDate = new Date(date.getTime())
//     newDate.setYear(parseInt(event.target.value), 1)
//     onChange(newDate)
//   }

//   return (
//     <select value={date.getFullYear()} onChange={handleChange}>
//       {years.map(year => (
//         <option key={year}>{year}</option>
//       ))}
//     </select>
//   )
// }
