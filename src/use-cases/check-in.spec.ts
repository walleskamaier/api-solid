import { beforeEach, afterEach, describe, expect, it, vi } from "vitest"
import { CheckInUseCase } from "./check-in.js"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.js"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { Decimal } from "@prisma/client/runtime/library"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Check-in use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: "gym-01",
      title: "Gym 01",
      description: "Gym 01 description",
      phone: "123456789",
      latitude: new Decimal(-28.278371),
      longitude: new Decimal(-49.1746635),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.278371,
      userLongitude: -49.1746635,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice on the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.278371,
      userLongitude: -49.1746635,
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -28.278371,
        userLongitude: -49.1746635,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.278371,
      userLongitude: -49.1746635,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.278371,
      userLongitude: -49.1746635,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Olimpo CT",
      description: "Olimpo CT description",
      phone: "489999999",
      latitude: new Decimal(-28.2698657),
      longitude: new Decimal(-49.1705459),
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -28.278371,
        userLongitude: -49.1746635,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
