import { describe, test, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
const request = require("supertest");
import mongoose from "mongoose";
import app from "../../app";

describe("User Routes Integration Tests", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // Desconectar y cerrar MongoDB después de las pruebas
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Limpiar las colecciones antes de cada prueba
    await mongoose.connection.dropDatabase();
  });

  // Pruebas para el endpoint de registro
  describe("POST /users/register", () => {
    test("Debería registrar un usuario y almacenarlo en la base de datos", async () => {
      const res = await request(app).post("/users/register").send({
        name: "Ana",
        surname: "García",
        email: "ana@example.com",
        role: "recruiter",
        password: "contraseña123",
      });
      expect(res.statusCode).toBe(201);

      // Verificar que el usuario se ha creado en la base de datos
      const User = mongoose.model("User");
      const user = await User.findOne({ email: "ana@example.com" });
      expect(user).not.toBeNull();
      expect(user.name).toBe("Ana");
    });
    test("Debería retornar un 403 con parametros incorrectos", async () => {
      const res = await request(app).post("/users/register").send({
        name: "Ana",
        surname: "García",
        email: "ana@example.com",
        role: "recruiter",
      });
      expect(res.statusCode).toBe(400);

      // Verifica que no existe usuario en la base de datos
      const User = mongoose.model("User");
      const user = await User.findOne({ email: "ana@example.com" });
      expect(user).toBeNull();
    });
  });
  describe('POST /users/login', () => {
        test('Debería iniciar sesion', async () => {
             await request(app)
                .post('/users/register')
                .send({
                    name: 'Ana',
                    surname: 'García',
                    email: 'ana@example.com',
                    role: 'recruiter',
                    password: 'contraseña123',
                });
               
                const res = await request(app)
                .post('/users/login')
                .send({
                    email: 'ana@example.com',
                    password: 'contraseña123',
                });
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('token')
       
            })
        })
});

// Pruebas para el endpoint de inicio de sesión

// Luego, iniciar sesión

// Verificar que la cookie con el token se ha establecido

// Registrar un usuario

// Intentar iniciar sesión con una contraseña incorrecta

// Pruebas para el endpoint de obtención del perfil

// Registrar e iniciar sesión para obtener el token

// Pruebas para el endpoint de subida de imagen de perfil

// Verificar que la imagen se ha actualizado en la base de datos

// Registrar e iniciar sesión para obtener la cookie

// Falta imageBase64

// Pruebas para el endpoint de cierre de sesión
