import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms.js"

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch nearby gyms use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -28.2698657,
      longitude: -49.1705459,
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -10.2761188,
      longitude: -38.3088031,
    })

    const { gyms } = await sut.execute({
      userLatitude: -28.278371,
      userLongitude: -49.1746635,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ])
  })
})
