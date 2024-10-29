export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
  endPoint: {
    forums: {
      allHttpRequest: "api/forums",
    },
    subject: {
      allHttpRequest: "api/sujets",
      getSubjectsByForm: "api/sujets/forum",
    },
    message: {
      allHttpRequest: "api/message",
      getMessagesBySubject: "api/message/subject",
    },
    login: "/auth/login"
  }
}
