const supertest = require("supertest");
const app = require("../../app");
const server = require("../../server");

//crear una instancia de supertest usando app
const api = supertest(app);

//que codigo de estado esperamos
//que formato de respuesta esperamos
//cual es el contenido de la respuesta

describe("Pruebas para el registro de un usuario", () => {

  test("Deberia de responder un 201", async () => {
    const body = {
      firstname: "bruno",
      lastname: "leon",
      email: "brunoleoncalderon@gmail.com",
      password: "Bruno@18",
    };
    await api.post("/api/v1/users").send(body).expect(201);
  });

  test("Deberia responder un 400 si falta alguna propiedad en el body", async () => {
    const body = {
      firstname: "bruno",
      email: "brunoleoncalderon@gmail.com",
      password: "Bruno@18",
    };

    await api.post("/api/v1/users").send(body).expect(400);
  });

  test("Deberia recibir un objeto con los errores si la informacion es invalida", async () => {
    const data = {
      firstname: "bruno",
      lastname: "leon",
      email: "brunoleon",
      password: "Bruno@18",
    };

    const { body } = await api.post("/api/v1/users").send(data)
    expect(body).toBeInstanceOf(Object);
  });

  test("Deberia recibir un objeto con la propiedad error = Invalid data si la información es invalida", async () => {
    const data = {
        firstname: "bruno",
        lastname: "",
        email: "brunoleoncalderon@gmail.com",
        password: "Bruno@18",
    };

    const { body } = await api.post("/api/v1/users").send(data);

    expect(body).toHaveProperty("error", "Invalid data");
  });
});


afterAll(() => server.close());
