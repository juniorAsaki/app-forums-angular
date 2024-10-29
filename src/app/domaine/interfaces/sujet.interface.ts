export interface Sujet{
  slug: string,
  idSubject: number,
  title: string,
  description: string,
  forum: {
    title: string,
    description: string
  }
}
