import React from 'react'

type ChangeEvents = HTMLInputElement | HTMLTextAreaElement

/**
 * The takeValueFromEvent utility is a higher-order function
 * designed to simplify the process of extracting values from event
 * Instead of writing separate event handler functions for each input,
 * this utility streamlines the process by automatically
 * passing the extracted value (event.target.value) to one or more callback functions.
 *
 * @param callbacks
 *
 * const TestComponent = () => {
 *   const [value, setValue] = useState('')
 *
 *   return <input onChange={takeValueFromEvent(setValue)} />
 * }
 */
export const takeValueFromEvent =
  <T extends (arg: string) => void>(...callbacks: T[]) =>
  (event: React.ChangeEvent<ChangeEvents>) => {
    callbacks.forEach((callback) => callback(event.target.value))
  }

export const takeValueFromCheckboxEvent =
  <T extends (arg: boolean) => void>(...callbacks: T[]) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    callbacks.forEach((callback) => callback(event.target.checked))
  }

export const stopPropagation =
  <T extends (event: TEvent) => void, TEvent extends React.SyntheticEvent>(...callbacks: T[]) =>
  (event: TEvent) => {
    event.stopPropagation()
    callbacks.forEach((callback) => callback(event))
  }
