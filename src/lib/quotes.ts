
type Quote = {
	text: string
	author: string
	year?: number
}

const quotes: Quote[] = [
	{
		text: "I quote others only in order the better to express myself.",
		author: "Michel de Montaigne",
		year: 1856,
	},
	{
		text: "Don't discuss yourself, for you are bound to lose; if you belittle yourself, you are believed; if you praise yourself, you are disbelieved.",
		author: "Essais",
		year: 1595
	},
	{
		text: "Computer programs are good, they say, for particular purposes, but they aren't flexible. Neither is a violin, or a typewriter, until you learn how to use it.",
		author: "Marvin Minsky",
	}
]

export default quotes
