
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
		year: 1595,
	},
	{
		text: "Performance equals efficiency [...] hardware costs, power consumption, CO2 emissions. Slow software is literally cooking our planet.",
		author: "Eskil Steenberg",
		year: 2025,
	}
]

export default quotes
