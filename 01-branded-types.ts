import { Brand } from "./helpers/Brand.ts";

type Password = Brand<string, "Password">
type Email = Brand<string, "Email">

const password = "123123" as Password
const email = "test@me.com" as Email

let passwordSlot: Password
passwordSlot = "123" as Password

console.log(email)
console.log(password)
console.log(passwordSlot)