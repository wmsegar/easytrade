import { ProbabilityDistribution } from "./randomGenerator.types"
import { reduce } from 'lodash'

export class CustomDistributionRandomGenerator {
    public static getRandomValue<T>(valueDistribution: ProbabilityDistribution<T>[]): T {
        const normalizedDistribution = this.normalizeDistribution(valueDistribution)
        let randomVal = Math.random()
        for (const value of normalizedDistribution) {
            randomVal -= value.probability
            if(randomVal <= 0){
                return value.value
            }
        }
        throw new Error("Invalid state")
    }

    private static normalizeDistribution<T>(valueDistribution: ProbabilityDistribution<T>[]): ProbabilityDistribution<T>[] {
        const totalValue = reduce(valueDistribution, (sum: number, val: ProbabilityDistribution<T>) => sum + val.probability, 0)
        return valueDistribution
            .filter(val => val.probability > 0)
            .map(val => ({ probability: val.probability / totalValue, value: val.value }))
    }
}