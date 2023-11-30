export const slugGenerate = (text: string) => {
return text.split(' ').join('-')
}