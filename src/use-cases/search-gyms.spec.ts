import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { SearchGymsUseCase } from "./search-gyms.js"

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe("Search gyms use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Olimpo CT",
      description: null,
      phone: null,
      latitude: -28.2698657,
      longitude: -49.1705459,
    })

    await gymsRepository.create({
      title: "Seven Fit",
      description: null,
      phone: null,
      latitude: -28.2698657,
      longitude: -49.1705459,
    })

    const { gyms } = await sut.execute({
      query: "Olimpo",
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Olimpo CT",
      }),
    ])
  })

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Olimpo CT ${i}`,
        description: null,
        phone: null,
        latitude: -28.2698657,
        longitude: -49.1705459,
      })
    }

    const { gyms } = await sut.execute({
      query: "Olimpo",
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Olimpo CT 21",
      }),
      expect.objectContaining({
        title: "Olimpo CT 22",
      }),
    ])
  })
})
