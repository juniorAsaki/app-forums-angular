export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
  endPoint: {
    forums: {
      getAll: "api/forums",
      getOne: "api/forums",
      create: "api/forums",
      update: "api/forums",
      delete: "api/forums"
    },
    subject: {
      create: "api/sujets",
      getSubjectByForm: "api/sujets/forum",
      getOne: "api/sujets"
    },
    message: {
      create: "api/message",
      getSubjectBySubject: "api/message/subject",
    }
  }
}
