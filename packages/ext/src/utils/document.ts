/**
 * scroll to by id
 * @param id
 */
export function scrollToId(id: string) {
	const element = document.getElementById(id)
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' })
	}
}