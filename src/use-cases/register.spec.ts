import { describe, expect, it } from "vitest"
import { RegisterUseCase } from "./register.js"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"

describe("Register use case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
